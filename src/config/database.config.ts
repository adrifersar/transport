import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const typeOrmConfig = registerAs(
    'database',
    (): TypeOrmModuleOptions => {
        const isProduction = process.env.NODE_ENV === 'production';


        const config: TypeOrmModuleOptions = {
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'bd',

        };


        if (isProduction) {

            return {
                ...config,
                synchronize: false,

            };
        } else {
            return {
                ...config,
                synchronize: process.env.DB_SYNC === 'true',
            };
        }
    },
);