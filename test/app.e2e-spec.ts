import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PageCss } from './../src/entities/pageCss.entity';
import { Page } from './../src/entities/page.entity';
import { Layout } from './../src/entities/layout.entity';
export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
 };

describe('AppController (e2e)', () => {

  let app;
  let server;
  let connection: Connection;
  
  let PageMock: MockType<Repository<Page>>;

  let PageService = { findAll: () => ['test'] };

  // @ts-ignore
  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
    find: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
    delete: jest.fn(entity => entity),
    // ...
  }));

  beforeEach(async (done) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(getRepositoryToken(Page)).useFactory({factory: repositoryMockFactory})
      .overrideProvider(getRepositoryToken(PageCss)).useFactory({factory: repositoryMockFactory})
      .overrideProvider(getRepositoryToken(Layout)).useFactory({factory: repositoryMockFactory})
      .overrideProvider(TypeOrmModule.forRoot()).useValue({})
      .compile();

    app = moduleFixture.createNestApplication();

    connection = app.get(Connection);

    PageMock = moduleFixture.get(getRepositoryToken(Page));
    
    
    await connection.runMigrations({ transaction: true });

    await app.listen(0, () => {
      server = app.getHttpServer();
      done();
    });
  }, 60 * 1000);
    

  afterAll(async (done) => {
    app.close().then(() => {
      done();
    }).catch(error => {
      console.log(error);
      throw error;
    });
  });


  it('/page:get', () => {

    const page = [{id: 5, name: 'test', }];
    PageMock.save.mockReturnValue(page);

    request(server)
      .get('/page/get')
      .expect(200)
      .expect(page);

      //expect(PageMock.find).toHaveBeenCalled();
  });

  it('/page:create', () => {

    const page = [{id: '1', name: 'test', htmlContent: '', url: '', layoutId: 1, cssIds: []}];
    PageMock.save.mockReturnValue(page);

    request(server)
      .post('/page/get').send(page)
      .expect(200)
      .expect(page);

      expect(PageMock.find).toHaveBeenCalled();
  });
});
