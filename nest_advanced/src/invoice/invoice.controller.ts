import { Controller, Get } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('/invoices')
  async getAll() {
    return this.invoiceService.getAll();
  }
}
