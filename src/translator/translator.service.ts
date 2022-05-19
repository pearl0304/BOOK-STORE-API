import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Tranlator,
  TranslatorDocument,
  CreateTranlatorInput,
} from './schemas/translator.schema';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class TranslatorService {
  constructor(
    @InjectModel(Tranlator.name)
    private translatorModel: Model<TranslatorDocument>,
  ) {}

  async findAllTranslators(): Promise<Tranlator[]> {
    try {
      return await this.translatorModel
        .find()
        .sort({ created_date: -1 })
        .exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async findTranslatorById(translatorId: string): Promise<Tranlator> {
    try {
      return await this.translatorModel.findById(translatorId).exec();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  async createTranslator(translator: CreateTranlatorInput) {
    try {
      return await this.translatorModel.create(translator);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
