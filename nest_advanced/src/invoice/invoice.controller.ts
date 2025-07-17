import { Controller, Get } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('/invoices')
  async getAll() {
    return this.invoiceService.getAll();
  }
}
