import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserAccessGuard } from './modules/auth/user-auth-guard';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ResourceModule } from './modules/resource/resource.module';
import { CommonModule } from './modules/common/common.module';
import { CommandModule } from 'command/command.module';
import { BrockerModule } from './modules/broker/broker.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Broker } from './modules/broker/config';
import { ResourceRepository } from './modules/resource/resource.repository';
import { Resource } from './modules/resource/entity/resource';
import { ImportService } from './modules/common/import.service';
export const DEFAULT_TYPEORM_CONFIG: object = config.get('typeorm');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DEFAULT_TYPEORM_CONFIG,
      entities: [__dirname + '/entity/*{.ts,.js}'],
      migrations: [__dirname + '/migration/*{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    AuthModule,
    UserModule,
    ResourceModule,
    CommonModule,
    CommandModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, Broker.CONFIG),
    BrockerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserAccessGuard,
    },
    ImportService,
  ],
})
export class AppModule {
  constructor(private repo: ResourceRepository,
    private importService: ImportService<Resource>) {
    this.importService.import(
      [
        "email",
        "firstName",
        "lastName",
        "birthday",
      ],
      'imports/resources.csv',
      repo,
      {
        indexes: { header: 1, body: 2 }
      }
    );
  }
}
