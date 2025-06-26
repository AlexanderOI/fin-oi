import { BadRequestException, Controller, Get } from '@nestjs/common'
import { SeederService } from '@/seeder/seeder.service'

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  async seed() {
    if (process.env.ENV === 'development') {
      await this.seederService.seed()
      return {
        message: 'Seeded successfully',
      }
    }

    throw new BadRequestException('Seeder is only available in development mode')
  }
}
