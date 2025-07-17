import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryService } from './query.service';
import { QueryDto } from './query.dto';

@Controller('/query')
@ApiTags('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Get('/')
  @ApiResponse({ status: 200, type: [QueryDto] })
  async getAll() {
    return this.queryService.getAll();
  }
}
