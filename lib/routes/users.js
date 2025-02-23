'use strict';

const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/users',
    options: {
        tags: ['api'], // Swagger : ajoute cette route à la documentation
        description: 'Récupère tous les utilisateurs',
        notes: 'Cette route retourne une liste de tous les utilisateurs de la base de données.',
        auth: {
            scope: ['user', 'admin'] // Seuls les users et admins peuvent accéder à cette route
        },
        response: {
            schema: Joi.array().items(
                Joi.object({
                    id: Joi.number().integer().required().description('ID unique de l\'utilisateur'),
                    firstName: Joi.string().required().description('Prénom de l\'utilisateur'),
                    lastName: Joi.string().required().description('Nom de l\'utilisateur'),
                    email: Joi.string().email().required().description('Email de l\'utilisateur'),
                    username: Joi.string().required().description('Nom d\'utilisateur'),
                    role: Joi.string().valid('user', 'admin').required().description('Rôle de l\'utilisateur'),
                    createdAt: Joi.date().iso().description('Date de création de l\'utilisateur'),
                    updatedAt: Joi.date().iso().description('Date de mise à jour de l\'utilisateur')
                })
            )
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.list();
    }
};
