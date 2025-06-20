import { Module } from '@nestjs/common';
import { ApmService } from '../services/apm.service';

@Module({
  providers: [ApmService],
})
export class ApmModule {}

