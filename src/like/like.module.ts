import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeResolver } from './like.resolver';
import { LikeService } from './like.service';
import { Like, LikeSchema } from './schemas/like.schema';
import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Book, BookSchema } from 'src/book/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  providers: [LikeResolver, LikeService, BookService, UserService],
})
export class LikeModule {}
