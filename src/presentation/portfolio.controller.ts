import { PortfolioService } from 'src/application/portfolio.service';
import { FilterPortfolioDto } from 'src/domain/dtos/portfolio/filter-portfolio.dto';
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
import { CreatePortfolioDto } from 'src/domain/dtos/portfolio/create-portfolio.dto';
import { UpdatePortfolioDto } from 'src/domain/dtos/portfolio/update-portfolio.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { GateGuard } from 'src/core/decorators/roles.decorator';
import Role from 'src/core/enums/Role';

@Controller('portfolio')
@ApiTags('portfolio')
@ApiBearerAuth()
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiQuery({
    name: 'title'
  })
  @ApiQuery({
    name: 'status'
  })
  findAll(@Query() filter: FilterPortfolioDto) {
    console.log(filter)
    return this.portfolioService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'The id of the portfolio',
  })
  @ApiResponse({ status: 200, description: 'Success' })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.portfolioService.findOne(+id);
  }

  @Put(':id')
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiParam({
    name: 'id',
    description: 'The id of the portfolio',
  })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return this.portfolioService.update(+id, updatePortfolioDto);
  }

  @Delete(':id')
  @GateGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Deleted' })
  @ApiParam({
    name: 'id',
    description: 'The id of the portfolio',
  })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.portfolioService.remove(+id);
  }
}
