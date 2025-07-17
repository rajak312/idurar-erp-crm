import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type Note = {
  content: string;
  createdAt: Date;
};

@Schema({ _id: true })
export class NoteSchemaClass {
  @Prop()
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

@Schema({ timestamps: true })
export class Query extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ enum: ['Open', 'InProgress', 'Closed'], default: 'Open' })
  status: string;

  @Prop()
  resolution?: string;

  @Prop({ type: [NoteSchemaClass] })
  notes: Note[];

  @Prop({ type: Types.ObjectId, required: true, refPath: 'createdByModel' })
  createdBy: Types.ObjectId;

  @Prop({ required: true, enum: ['Admin', 'Client'] })
  createdByModel: string;

  @Prop({ required: true })
  name: string;
}

export const QuerySchema = SchemaFactory.createForClass(Query);
