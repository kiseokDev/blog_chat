import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should call userRepository.save', async () => {
      const user = new User();
      const spy = jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const userResult = await service.createUser(user);
      expect(userResult).toBe(user);

      expect(spy).toHaveBeenCalled();
    });
  });

  //   describe('getUser', () => {
  //     it('should call userRepository.findOne', async () => {
  //       const user = new User();
  //       const spy = jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

  //       await service.getUser('test@example.com');

  //       expect(spy).toHaveBeenCalledWith({ email: 'test@example.com' });
  //     });
  //   });

  //   describe('updateUser', () => {
  //     it('should call userRepository.update', () => {
  //       const user = new User();
  //       const spy = jest.spyOn(userRepository, 'update').mockResolvedValue();

  //       service.updateUser('test@example.com', user);

  //       expect(spy).toHaveBeenCalledWith({ email: 'test@example.com' }, user);
  //     });
  //   });

  //   describe('deleteUser', () => {
  //     it('should call userRepository.delete', () => {
  //       const spy = jest.spyOn(userRepository, 'delete').mockResolvedValue();

  //       service.deleteUser('test@example.com');

  //       expect(spy).toHaveBeenCalledWith({ email: 'test@example.com' });
  //     });
  //   });
});
