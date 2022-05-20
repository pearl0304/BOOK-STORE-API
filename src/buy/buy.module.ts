import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyResolver } from './buy.resolver';
import { BuyService } from './buy.service';
import { OrderService } from 'src/order/order.service';
import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';
import { Buy, BuySchema } from './schemas/buy.schema';
import { Book, BookSchema } from 'src/book/schemas/book.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Order, OrderSchema } from 'src/order/schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Buy.name, schema: BuySchema },
      { name: Order.name, schema: OrderSchema },
      { name: Book.name, schema: BookSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [BuyResolver, BuyService, OrderService, BookService, UserService],
})
export class BuyModule {}
