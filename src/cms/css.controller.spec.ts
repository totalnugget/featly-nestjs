import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './../app.service';
import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { CssController } from './css.controller';
import { CssService } from './css.service';
import { PageCss } from './../entities/pageCss.entity';
import { User } from './../entities/user.entity';

describe('AppController', () => {
  let appController: CssController;

  // @ts-ignore
  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
    // ...
  }));

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [CssController],
      providers: [CssService, { provide: getRepositoryToken(PageCss), useFactory: repositoryMockFactory }],
    }).overrideProvider(getRepositoryToken(User)).useFactory({factory: repositoryMockFactory})
    .compile();

    appController = app.get<CssController>(CssController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });

    
  
  });
});
