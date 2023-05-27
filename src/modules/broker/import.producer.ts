import { Injectable } from '@nestjs/common';
import { Broker } from './config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { AbstractProducer } from './abstract.producer';

@Injectable()
export class ImportProducer extends AbstractProducer {
    constructor(
        protected readonly amqpConnection: AmqpConnection
    ) {
        super(amqpConnection);
    }

    configure(): { exchange: string, queue: string } {
        return {
            exchange: Broker.DEFAULT_EXCHANGE,
            queue: Broker.DEFAULT_QUEUE,
        }
    }
}