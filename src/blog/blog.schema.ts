import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostDto } from './blog.model';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog implements PostDto {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  name: string;

  @Prop()
  createdDt?: Date;

  @Prop()
  upatedDt?: Date;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);
