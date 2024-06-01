import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: `NestOn!0n`,
      database: 'NestOnion',
      options: {
        encrypt: false, // MSSQL-specific option
      },
      synchronize: true, //use this with development environment
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
    }),
  ],
})
export class SqlServerModule {}
