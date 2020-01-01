import * as dotenv from 'dotenv';
import { AppEnv } from './app.env';
import * as path from 'path';
import { Module, DynamicModule } from '@nestjs/common';


dotenv.config();
export class ConfigService {
  private vars: AppEnv;

  constructor() {
    this.vars = process.env as unknown as AppEnv;
  }

  getTypeOrmModuleOptions(): any {
    const typeOrmTypeModuleOptions: any = {
      type: this.vars.DB_TYPE as any,
      host: this.vars.DB_HOST,
      port: this.vars.DB_PORT ,
      username: this.vars.DB_USER,
      password: this.vars.DB_PASSWORD,
      database: this.vars.DB_NAME,
      // migrations: [path.resolve(__dirname, '../migrations', '**/!(*.d).{ts,js}')],
      synchronize: false,
      // cache: {
      //   type: 'redis',
      //   options: {
      //     host: this.vars.CACHE_HOST,
      //   },
      // },
    };
    return typeOrmTypeModuleOptions;
  }
}
