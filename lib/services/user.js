'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@zenkolespadon/iut-encrypt');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

    async create(user) {
        const { User } = this.server.models();

        // Chiffrer le mot de passe avant de le stocker
        user.password = Encrypt.sha1(user.password);
        user.role = 'user'; // Rôle par défaut

        return User.query().insertAndFetch(user);
    }

    async authenticate(email, password) {
        const { User } = this.server.models();

        const user = await User.query().findOne({ email });

        if (!user || !Encrypt.compareSha1(password, user.password)) {
            throw Boom.unauthorized('Email ou mot de passe incorrect');
        }

        // Générer un JWT avec le rôle
        const token = Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role // Ajout du rôle dans le token
            },
            {
                key: 'random_string',
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 hours
            }
        );

        return { token };
    }
};
