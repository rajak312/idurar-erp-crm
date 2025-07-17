import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query } from './query.schema';

@Injectable()
export class QueryService {
  constructor(
    @InjectModel(Query.name) private readonly invoiceModel: Model<Query>,
  ) {}
  async getAll() {
    const invoice = await this.invoiceModel.find();
    return invoice;
  }
}
