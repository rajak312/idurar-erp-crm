import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Query, QuerySchema } from './query.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Query.name,
        schema: QuerySchema,
      },
    ]),
  ],
  exports: [MongooseModule],
  providers: [],
})
export class QueryModule {}
