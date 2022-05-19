import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartResolver } from './cart.resolver';
import { Cart, CartSchema } from './schemas/cart.schema';
import { CartService } from './cart.service';
import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Book, BookSchema } from 'src/book/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  providers: [CartResolver, CartService, BookService, UserService],
})
export class CartModule {}
