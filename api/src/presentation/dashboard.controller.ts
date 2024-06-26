import {
    Controller,
    Get,
    UseGuards
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from 'src/application/contact.service';
import { PortfolioService } from 'src/application/portfolio.service';
import { UserService } from 'src/application/user.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
  
  @Controller('dashboard')
  @ApiTags('dashboard')
  @ApiBearerAuth()

  export class DashboardController {
    constructor(
      private readonly portfolioService: PortfolioService,
      private readonly userService: UserService,
      private readonly contactService: ContactService
    ) {}
  
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Success' })
    async getAllData() {
      let data = {};
      const user_total = await this.userService.total();
      const contact_total = await this.contactService.total();
      const portfolio_total = await this.portfolioService.total();
  
     
      
      return {user_total,contact_total, portfolio_total};
    }
  }
  