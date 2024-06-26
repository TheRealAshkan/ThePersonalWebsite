import { ContactService } from 'src/application/contact.service';
import { FilterContactDto } from 'src/domain/dtos/contact/filter-contact.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateContactDto } from 'src/domain/dtos/contact/create-contact.dto';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { GateGuard } from 'src/core/decorators/roles.decorator';
import Role from 'src/core/enums/Role';

@Controller('contact')
@ApiTags('contact')
@ApiBearerAuth()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Created' })
  create(
    @Body() createContactDto: CreateContactDto
  ) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll(@Query() filter: FilterContactDto) {
    return {
      users : await this.contactService.findAll(filter),
      total : await this.contactService.total(),
    };
  }

  @Get(':id')
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'The id of the contact',
  })
  @ApiResponse({ status: 200, description: 'Success' })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.contactService.findOne(+id);
  }

  @Delete(':id')
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Deleted' })
  @ApiParam({
    name: 'id',
    description: 'The id of the contact',
  })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.contactService.remove(+id);
  }
}
