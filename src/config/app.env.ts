export interface AppEnv {
    // connectionstring for the redis cache
    CACHE_HOST: string;
    CACHE_PORT: number;
  
    // connectionstring for the (postgres) database
    DB_TYPE: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
  }