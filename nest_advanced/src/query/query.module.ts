import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Query, QuerySchema } from './query.schema';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';

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
  providers: [QueryService],
  controllers: [QueryController],
})
export class QueryModule {}
