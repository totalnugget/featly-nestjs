import { PageCss } from './entities/pageCss.entity';
import { Layout } from './entities/layout.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CmsModule } from './cms/cms.module';
import { Page } from './entities/page.entity';
import { SiteModule } from './site/site.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        insecureAuth: true,
      },
      options:{encrypt: true},
    }),
    AuthModule,
    UsersModule,
    CmsModule,
    SiteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
