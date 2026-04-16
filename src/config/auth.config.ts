import { registerAs } from '@nestjs/config';

export interface AuthConfig {
    jwt: {
        secret: string;
        expiresIn: string;
        cookieExpiresIn: number;
    };
    cookieName: string;
    nodeEnv: string;
    includeTokenInResponse: boolean;
}

export const authConfig = registerAs(
    'auth',
    (): AuthConfig => ({
        jwt: {
            secret: process.env.JWT_SECRET || 'default-secret-change-me',
            expiresIn: process.env.JWT_EXPIRES_IN || '60m',
            cookieExpiresIn: parseInt(process.env.JWT_COOKIE_EXPIRES_IN || '7', 10),
        },
        cookieName: process.env.COOKIE_NAME || 'app',
        nodeEnv: process.env.NODE_ENV || 'development',
        includeTokenInResponse: process.env.INCLUDE_TOKEN_IN_RESPONSE === 'true',
    }),
);