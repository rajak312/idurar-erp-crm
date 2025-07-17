import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class NoteDto {
  @ApiProperty({ example: 'User added a comment about the issue.' })
  content: string;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;
}

export class QueryDto {
  @ApiProperty({ example: 'Issue with login functionality' })
  description: string;

  @ApiProperty({ enum: ['Open', 'InProgress', 'Closed'], default: 'Open' })
  status: string;

  @ApiPropertyOptional({ example: 'Fixed by updating the password service' })
  resolution?: string;

  @ApiProperty({ type: [NoteDto] })
  notes: NoteDto[];

  @ApiProperty({ type: String })
  createdBy: Types.ObjectId;

  @ApiProperty({ enum: ['Admin', 'Client'] })
  createdByModel: string;

  @ApiProperty({ example: 'Login Issue' })
  name: string;
}
