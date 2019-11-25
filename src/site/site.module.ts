import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { CmsModule } from './../cms/cms.module';


@Module({
  imports: [CmsModule],
  controllers: [SiteController],
  providers: [],
})
export class SiteModule {}
