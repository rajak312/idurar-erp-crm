import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './invoice.schema';
import { Model } from 'mongoose';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
  ) {}
  async getAll() {
    const invoice = await this.invoiceModel.find();

    return invoice;
  }
}
