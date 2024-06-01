import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { UserController } from './presentation/user.controller';
import { AuthService } from './application/auth.service';
import { UserService } from './application/user.service';
import { SqlServerModule } from './infrastructure/sqlserver.module';
import { User } from './domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './presentation/upload.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './core/strategies/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { PortfolioController } from './presentation/portfolio.controller';
import { PortfolioService } from './application/portfolio.service';
import { Portfolio } from './domain/entities/portfolio.entity';
import { Contact } from './domain/entities/contact.entity';
import { ContactService } from './application/contact.service';
import { ContactController } from './presentation/contact.controller';
import { Setting } from './domain/entities/setting.entity';
import { SettingService } from './application/setting.service';
import { SettingController } from './presentation/setting.controller';

@Module({
  imports: [
    SqlServerModule,
    TypeOrmModule.forFeature([User, Setting, Portfolio, Contact]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [
    AuthController,
    UserController,
    UploadController,
    PortfolioController,
    ContactController,
    SettingController
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    SettingService,
    PortfolioService,
    ContactService,
  ],
})
export class AppModule {}
