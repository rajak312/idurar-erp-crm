import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ required: true })
  number: string;

  @Prop({ type: Date, required: true })
  issueDate: Date;

  @Prop({ type: Date })
  dueDate?: Date;

  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ enum: ['Pending', 'Paid', 'Overdue'], default: 'Pending' })
  status: string;

  @Prop()
  notes?: string;

  @Prop({ type: Types.ObjectId, ref: 'Query' })
  relatedQuery?: Types.ObjectId;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
