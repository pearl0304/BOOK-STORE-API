import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorModule } from 'src/author/author.module';
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
