import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 6033,
      username: 'db_user',
      password: `db_user_pass`,
      database: 'app_db',
    //   options: {
    //     encrypt: false, // MSSQL-specific option
    //   },
      synchronize: true, //use this with development environment
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
    }),
  ],
})
export class MysqlModule {}
