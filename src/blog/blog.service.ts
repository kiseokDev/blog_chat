import { Injectable, Param } from '@nestjs/common';
import { Blog } from './blog.schema';
import { BlogMongoRepository, BlogRepository } from './blog.repository';
import { PostDto } from './blog.model';

interface BlogInterface {
  getAllPosts(): Promise<Blog[]>;
  createPost(post: PostDto): Promise<Blog>;
  updatePost(id: string, post: PostDto): Promise<Blog>;
  deletePost(id: string): void;
  getPost(id: string): Promise<Blog>;
}

@Injectable()
export class BlogService implements BlogInterface {
  constructor(private readonly blogRepository: BlogMongoRepository) {}
  deletePost(id: string): void {
    this.blogRepository.deletePost(id);
  }

  async getAllPosts() {
    return await this.blogRepository.getAllPosts();
  }

  async createPost(postDto: PostDto): Promise<Blog> {
    return await this.blogRepository.createPost(postDto);
  }

  async getPost(id): Promise<PostDto> {
    return await this.blogRepository.getPost(id);
  }

  async updatePost(id, postDto: PostDto): Promise<Blog> {
    return await this.blogRepository.updatePost(id, postDto);
  }
}

// constructor(private readonly blogRepository: BlogMongoRepository) {}
// deletePost(id: string): void {
//   this.blogRepository.deletePost(id);
// }

// async getAllPosts() {
//   return await this.blogRepository.getAllPosts();
// }

// async createPost(postDto: PostDto): Promise<Blog> {
//   const result = await this.blogRepository.createPost(postDto);
//   if (!result) {
// 	throw new Error('Failed to create post');
//   }
//   return result;
// }

// async getPost(id): Promise<PostDto> {
//   return await this.blogRepository.getPost(id);
// }

// updatePost(id, postDto: PostDto) {
//   return this.blogRepository.updatePost(id, postDto);
// }
