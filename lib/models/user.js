'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {
        return 'user';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            email: Joi.string().email().required().description('Email of the user'),
            username: Joi.string().min(3).required().description('Username of the user'),
            password: Joi.string().min(8).required().description('User password (hashed)'),
            role: Joi.string().valid('user', 'admin').default('user').description('Role of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get jsonAttributes() {
        return ['role']; // Objection.js gère automatiquement JSON.parse
    }

    $beforeInsert() {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.role = this.role || 'user'; // Assure que le rôle est défini
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }
};
