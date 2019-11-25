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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '4545',
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        insecureAuth: true,
      },
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
