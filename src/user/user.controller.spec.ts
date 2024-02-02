import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module'; // 앱 모듈 경로에 맞게 수정
import { UserModule } from './user.module';
import { User } from './user.entity';
import { UserService } from './user.service';
import exp from 'constants';
import { CreateUserDto } from './user.validationDto';

describe('UserController (e2e)', () => {
  let app: INestApplication; // Ensure app is defined in the correct scope
  let userService: UserService;
  let createUserDto: CreateUserDto;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AppModule], // Modify according to your app module
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // test case 1 (Post) /user/create 성공
  // test case 2 (Post) /user/create 유효성 검사 실패
  // test case 3 (Post) /user/create 이미 존재하는 이메일

  it(`(Post) /user/create success`, async () => {
    const saveResult = {
      username: 'andy',
      password: 'test1234',
      email: 'andy@podo.com',
      providerId: null,
      id: 7,
      createdDt: new Date('2024-02-02T05:13:59.000Z').toISOString(),
    };
    jest.spyOn(userService, 'createUser').mockResolvedValue(saveResult);

    createUserDto = {
      username: 'andy',
      password: 'test1234',
      email: 'andy@podo.com',
    };

    await request(app.getHttpServer())
      .post('/user/create')
      .send(createUserDto)
      .expect(201);
  });

  it(`(Post) 실패 /user/create 유효성 검사 실패`, async () => {
    createUserDto = {
      username: 'andy',
      password: 'test1234',
      email: 'andy-podo2',
    };

    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send(createUserDto)
      .expect(400);

    expect(response.body.message).toEqual(['email must be an email']);
  });

  it('(Post) 실패 /user/create 이미 존재하는 이메일', async () => {
    createUserDto = {
      username: 'andy',
      password: 'test1234',
      email: 'andy@podo.com',
    };

    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send(createUserDto)
      .expect(409);

    expect(response.body.message).toEqual('Email already exists');
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
