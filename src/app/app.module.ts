import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorModule } from 'src/author/author.module';
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';
import { OrderModule } from 'src/order/order.module';
import { LikeModule } from 'src/like/like.module';
import { TranslatorModule } from 'src/translator/translator.module';
import { CartModule } from 'src/cart/cart.module';
import { BuyModule } from 'src/buy/buy.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    AuthorModule,
    BookModule,
    UserModule,
    OrderModule,
    LikeModule,
    TranslatorModule,
    CartModule,
    BuyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
