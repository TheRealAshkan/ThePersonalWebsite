import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { UserController } from './presentation/user.controller';
import { AuthService } from './application/auth.service';
import { UserService } from './application/user.service';
// import { SqlServerModule } from './infrastructure/sqlserver.module';
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
import { UserLogin } from './domain/entities/user_login.entity';
import { UserLoginService } from './application/user_login.service';
import { LandingController } from './presentation/landing.controller';
import { MysqlModule } from './infrastructure/mysql.module';
import { DashboardController } from './presentation/dashboard.controller';

@Module({
  imports: [
    // SqlServerModule,
    MysqlModule,
    TypeOrmModule.forFeature([User, Setting, Portfolio, Contact, UserLogin]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    MulterModule.register({
      dest: './upload', // مسیر ذخیره فایل‌های آپلود شده
    })
    
  ],
  controllers: [
    AuthController,
    UserController,
    UploadController,
    PortfolioController,
    ContactController,
    SettingController,
    LandingController,
    DashboardController
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    UserLoginService,
    SettingService,
    PortfolioService,
    ContactService,
  ],
})
export class AppModule {}
