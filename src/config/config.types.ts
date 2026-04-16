import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AuthConfig } from './auth.config';
import { AppConfig } from './app.config';

export interface ConfigType {
    database: TypeOrmModuleOptions;
    auth: AuthConfig;

    api: AppConfig;
}

export const appConfigSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    DB_HOST: Joi.string().default('localhost'),
    DB_PORT: Joi.number().default(5432),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
    DB_SYNC: Joi.boolean()
        .when('NODE_ENV', {
            is: 'development',
            then: Joi.boolean().default(true),
            otherwise: Joi.boolean().default(false)
        }),

    JWT_SECRET: Joi.string().required().min(32),
    JWT_EXPIRES_IN: Joi.string().required().default('15m'),
    JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
    COOKIE_NAME: Joi.string().default('app'),
    JWT_COOKIE_EXPIRES_IN: Joi.number().default(7),
    INCLUDE_TOKEN_IN_RESPONSE: Joi.boolean()
        .default(false)
        .when('NODE_ENV', {
            is: 'production',
            then: Joi.boolean().valid(false),
        }),

});