import {
  Controller,
  Get
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PortfolioService } from 'src/application/portfolio.service';
import { SettingService } from 'src/application/setting.service';

@Controller('landing')
@ApiTags('landing')
@ApiBearerAuth()
export class LandingController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly settingService: SettingService
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Success' })
  async getAllData() {
    let data = {};
    const setting = await this.settingService.findAll();

    setting.map((item , index) => {
      data[`${item.key}`] = item.value;
    })

    data['portfolio'] =  await this.portfolioService.findAll({page: 1, limit:200});
    
    return data;
  }
}
