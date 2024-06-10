import { SettingService } from 'src/application/setting.service';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { SetSettingDto } from 'src/domain/dtos/setting/set-setting.dto';
import { GateGuard } from 'src/core/decorators/roles.decorator';
import Role from 'src/core/enums/Role';


@Controller('setting')
@ApiTags('setting')
@ApiBearerAuth()
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post('editSetting')
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiBody({
    type: SetSettingDto,
    description: 'Json structure for user object',
  })
  editSetting(@Body() createSettingDto: Array<SetSettingDto> = []) {
    return this.settingService.editSetting(createSettingDto);
  }

  @Post('editSettingByKey')
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiBody({
    type: SetSettingDto,
    description: 'Json structure for user object',
  })
  setByKey(@Body() createSettingDto: SetSettingDto) {
    return this.settingService.setByKey(createSettingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Success' })
  findAll() {
    return this.settingService.findAll();
  }

  @Get(':key')
  @ApiParam({
    name: 'key',
    description: 'The key of the setting',
  })
  @ApiResponse({ status: 200, description: 'Success' })
  findOneByKey(@Param('key') key: string) {
    return this.settingService.findOneByKey(key);
  }
}
