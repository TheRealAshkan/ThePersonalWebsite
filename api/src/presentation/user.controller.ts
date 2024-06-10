import { UserService } from 'src/application/user.service';
import { FilterUserDto } from 'src/domain/dtos/user/filter-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dtos/user/create-user.dto';
import { UpdateUserDto } from 'src/domain/dtos/user/update-user.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { GateGuard } from 'src/core/decorators/roles.decorator';
import Role from 'src/core/enums/Role';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  
  @Get()
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiQuery({
    name: 'page'
  })
  @ApiQuery({
    name: 'limit'
  })
  findAll(@Query() filter: FilterUserDto) {
    console.log(filter)
    return this.userService.findAll(filter);
  }

  @Get(':id')
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'The id of the user',
  })
  @ApiResponse({ status: 200, description: 'Success' })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiParam({
    name: 'id',
    description: 'The id of the user',
  })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Deleted' })
  @ApiParam({
    name: 'id',
    description: 'The id of the user',
  })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.remove(+id);
  }
}
