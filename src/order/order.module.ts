import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order, OrderSchema } from './schemas/order.schema';
import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';
import { Book, BookSchema } from 'src/book/schemas/book.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Book.name, schema: BookSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [OrderService, OrderResolver, BookService, UserService],
})
export class OrderModule {}
