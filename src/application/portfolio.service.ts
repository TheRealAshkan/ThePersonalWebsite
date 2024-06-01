import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/core/utils/pagination';
import { CreatePortfolioDto } from 'src/domain/dtos/portfolio/create-portfolio.dto';
import { FilterPortfolioDto } from 'src/domain/dtos/portfolio/filter-portfolio.dto';
import { UpdatePortfolioDto } from 'src/domain/dtos/portfolio/update-portfolio.dto';
import { Portfolio } from 'src/domain/entities/portfolio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    const sendData = {
      ...createPortfolioDto,
    };

    const portfolio = await this.portfolioRepository.create(sendData);
    this.portfolioRepository.save(portfolio);
    return portfolio;
  }

  async findAll(filter: FilterPortfolioDto) {
    const query = this.portfolioRepository.createQueryBuilder().select('*');

    if (filter.title) {
      query.where('title Like :title', {
        title: `%${filter.title}%`,
      });
    }

    if (filter.status) {
      query.where('status Like :status', { status: filter.status });
    }

    pagination(query, { ...filter });

    const portfolios = await query.execute();

    return portfolios.length > 0 ? portfolios : false;
  }

  async findOne(portfolio_id: number) {
    const portfolio = await this.portfolioRepository.findOne({
      where: {
        portfolio_id,
      },
    });

    if (!portfolio) {
      throw new HttpException('Portfolio not found', 404);
    }

    return portfolio;
  }

  async update(portfolio_id: number, updatePortfolioDto: UpdatePortfolioDto) {
    const portfolio = await this.portfolioRepository.update(
      +portfolio_id,
      updatePortfolioDto,
    );

    if (portfolio.affected === 0) {
      throw new HttpException('Portfolio not found', 404);
    }

    return portfolio;
  }

  async remove(portfolio_id: number) {
    const portfolio = await this.portfolioRepository.delete(portfolio_id);

    if (portfolio.affected === 0) {
      throw new HttpException('Portfolio not found', 404);
    }

    return portfolio;
  }
}
