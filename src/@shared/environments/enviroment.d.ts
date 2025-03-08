declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'qas';
    PORT: string;
    FRONTEND_URL?: string;
    TZ?: 'utc';
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    DEFAULT_USER: string;
    DEFAULT_PASSWORD: string;
    DEFAULT_EMAIL: string;
    FALLBACK_LANGUAGE: 'pt-BR';
  }
}
