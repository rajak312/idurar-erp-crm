import { Controller, Get } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoiceDto } from './invoice.dto';

@Controller('/invoice')
@ApiTags('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('/')
  @ApiResponse({ status: 200, type: [InvoiceDto] })
  async getAll() {
    return this.invoiceService.getAll();
  }
}
