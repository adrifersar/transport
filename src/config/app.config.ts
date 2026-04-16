import { registerAs } from '@nestjs/config';

export interface AppConfig {
  nodeEnv: string;
  appName: string;
  port: number;
  apiPrefix: string;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({

    appName: process.env.APP_NAME || 'app',
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '4000', 10),
    apiPrefix: process.env.API_PREFIX || 'api',
  }),
);

// export default registerAs('app', () => ({
//   nodeEnv: process.env.NODE_ENV,
//   name: process.env.APP_NAME,
//   //   workingDirectory: process.env.PWD || process.cwd(),
//   //   frontendDomain: process.env.FRONTEND_DOMAIN,
//   //   backendDomain: process.env.BACKEND_DOMAIN,
//   port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 4000,
//   apiPrefix: process.env.API_PREFIX || 'api',
//   //   fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
//   //   headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
// }));