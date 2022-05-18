import { Module } from '@nestjs/common';
import { CartResolver } from './cart.resolver';

@Module({
  providers: [CartResolver]
})
export class CartModule {}
