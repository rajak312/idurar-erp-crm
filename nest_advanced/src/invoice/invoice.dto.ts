import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class InvoiceDto {
  @ApiProperty()
  number: string;

  @ApiProperty()
  issueDate: Date;

  @ApiPropertyOptional()
  dueDate?: Date;

  @ApiProperty()
  clientName: string;

  @ApiProperty()
  amount: number;

  @ApiProperty({ enum: ['Pending', 'Paid', 'Overdue'], default: 'Pending' })
  status: string;

  @ApiPropertyOptional()
  notes?: string;

  @ApiPropertyOptional({ type: String })
  relatedQuery?: Types.ObjectId;
}
