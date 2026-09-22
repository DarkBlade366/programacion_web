import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST') ?? 'localhost',
        port: parseInt(configService.get('DATABASE_PORT') ?? '5432', 10),
        username: configService.get('DATABASE_USER') ?? 'postgres',
        password: configService.get('DATABASE_PASSWORD') ?? 'postgres',
        database: configService.get('DATABASE_NAME') ?? 'programacion_web',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
