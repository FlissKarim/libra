import { Injectable } from '@nestjs/common';
import { Broker, BrokerMessage } from './config';
import { AmqpConnection, MessageHandlerOptions } from '@golevelup/nestjs-rabbitmq';
import { AbstractConsumer } from './abstract.consumer';
import { ImportProducer } from './import.producer';

@Injectable()
export class ImportConsumer extends AbstractConsumer {

    constructor(public readonly amqpConnection: AmqpConnection,
        public readonly importProducer: ImportProducer,
    ) {
        super(amqpConnection, importProducer);
    }

    public consume(message: BrokerMessage) {
        console.log(message);
    }

    configure(): { options: MessageHandlerOptions, name: string } {
        return {
            options: {
                exchange: Broker.DEFAULT_EXCHANGE,
                queue: Broker.DEFAULT_QUEUE,
            },
            name: ImportConsumer.name
        }
    }
}