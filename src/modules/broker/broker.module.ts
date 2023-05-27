import { Module } from '@nestjs/common';
import * as config from 'config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ImportConsumer } from './import.consumer';
import { Broker } from './config';
import { ImportProducer } from './import.producer';
export const DEFAULT_TYPEORM_CONFIG: object = config.get('typeorm');

// @Module({
//   imports: [
//     RabbitMQModule.forRoot(RabbitMQModule, Broker.CONFIG),
//   ],
//   providers: [
//     ImportProducer,
//     ImportConsumer,
//   ],
//   exports: [
//     ImportProducer,
//     ImportConsumer,
//   ]
// })
export class BrockerModule {
  constructor() { }
}
