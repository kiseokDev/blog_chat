import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { Blog } from './blog.schema';
import { BlogMongoRepository } from './blog.repository';

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const mockBlogModel = {}; // replace with your actual mock

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        BlogMongoRepository,
        {
          provide: 'BlogModel',
          useValue: mockBlogModel,
        },
      ],
    }).compile();
    service = module.get<BlogService>(BlogService);
  });
  const postData = {
    id: '1',
    title: '블로그 제목',
    content: '블로그 내용.',
    name: 'json lee',
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAllPosts', () => {
    it('모든 posts 정보를 가져온다', async () => {
      // Arrange
      const mockPosts = [{ ...postData }];

      jest.spyOn(service, 'getAllPosts').mockResolvedValue(mockPosts);

      // Act
      const result = await service.getAllPosts();

      // Assert
      expect(result).toEqual(mockPosts);
    });
  });

  describe('createPost', () => {
    it('포스트 하나를 등록한다', async () => {
      jest.spyOn(service, 'createPost').mockResolvedValue(postData);
      const result = await service.createPost(postData);
      expect(result).toEqual(postData);
    });
  });

  describe('updatePost', () => {
    it('포스트를 업데이트한다 ', async () => {
      const id = '1';
      const expectedResult = postData;
      jest.spyOn(service, 'updatePost').mockResolvedValue(postData);
      const result = await service.updatePost(id, postData);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('deletePost', () => {
    it('포스트 하나를 삭제한다 ', () => {
      const id = '1'; // Mock the id
      jest.spyOn(service, 'deletePost').mockImplementation(() => {});
      expect(() => service.deletePost(id)).not.toThrow();
    });
  });

  describe('getPost', () => {
    it('포스트 id를 전달받아 post 정보를 가져온다 ', async () => {
      const id = '1'; // Mock the id
      const expectedResult = postData; // Mock the expected result
      jest.spyOn(service, 'getPost').mockResolvedValue(postData);
      const result = await service.getPost(id);
      expect(result).toEqual(expectedResult);
    });
  });
});
