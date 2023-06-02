import { Module } from '@nestjs/common';
import * as config from 'config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ImportConsumer } from './import.consumer';
import { Broker } from './config';
import { ImportProducer } from './import.producer';
import { LoggerService } from '../common/logger.service';
export const DEFAULT_TYPEORM_CONFIG: object = config.get('typeorm');

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, Broker.CONFIG),
  ],
  providers: [
    ImportProducer,
    ImportConsumer,
    LoggerService,
  ],
  exports: [
    ImportProducer,
    ImportConsumer,
  ]
})
export class BrockerModule {
  constructor() { }
}
