import { PageService } from './page.service';
import { PageController } from './page.controller';
import { CssService } from './css.service';
import { Module } from '@nestjs/common';
import { CssController } from './css.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageCss } from '../entities/pageCss.entity';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { Page } from '../entities/page.entity';
import { Layout } from '../entities/layout.entity';
import { LayoutController } from './layout.controller';
import { LayoutService } from './layout.service';

@Module({
  imports: [TypeOrmModule.forFeature([PageCss]),
            TypeOrmModule.forFeature([Page]),
            TypeOrmModule.forFeature([Layout]),
            AuthModule],
  controllers: [CssController, PageController, LayoutController],
  providers: [CssService, PageService, LayoutService],
})
export class CmsModule {}
