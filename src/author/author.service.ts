import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from './schemas/author.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async findAllAuthors(): Promise<Author[]> {
    return this.authorModel.find().lean();
  }

  async findAuthorById(authorId): Promise<Author> {
    return this.authorModel.findById(authorId).lean();
  }

  async createAuthor(author) {
    return this.authorModel.create(author);
  }
}
