import { Module } from '@nestjs/common'
import { SeederService } from '@/seeder/seeder.service'
import { SeederController } from '@/seeder/seeder.controller'

@Module({
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
