'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/user',
        options: {
            tags: ['api'],
            auth: false, // Pas d'authentification pour créer un compte
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3),
                    lastName: Joi.string().required().min(3),
                    email: Joi.string().email().required(),
                    username: Joi.string().min(3).required(),
                    password: Joi.string().min(8).required()
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.create(request.payload);
        }
    },
    {
        method: 'DELETE',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin'] // Seuls les admin peuvent supprimer un utilisateur
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            await userService.deleteById(request.params.id);
            return '';
        }
    },
    {
        method: 'PATCH',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin'] // Seuls les admin peuvent modifier un utilisateur
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().required()
                }),
                payload: Joi.object({
                    firstName: Joi.string().min(3).optional(),
                    lastName: Joi.string().min(3).optional(),
                    email: Joi.string().email().optional(),
                    username: Joi.string().min(3).optional(),
                    password: Joi.string().min(8).optional(),
                    role: Joi.string().valid('user', 'admin').optional() // Permettre aux admin de changer le rôle
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.updateUser(request.params.id, request.payload);
        }
    },
    {
        method: 'POST',
        path: '/user/login',
        options: {
            tags: ['api'],
            auth: false, // Désactiver l'authentification pour login
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.authenticate(request.payload.email, request.payload.password);
        }
    }
];
