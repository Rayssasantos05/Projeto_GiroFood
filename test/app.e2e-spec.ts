import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    app.useStaticAssets(join(process.cwd(), 'public'));
    await app.init();
  });

  it('/ (GET) serves the GiroFood interface', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(/GiroFood \| Gestão do restaurante/);
  });

  it('/app.js (GET) serves the interface script', () => {
    return request(app.getHttpServer())
      .get('/app.js')
      .expect(200)
      .expect('Content-Type', /javascript/)
      .expect(/GiroFood/);
  });

  afterEach(async () => {
    await app.close();
  });
});
