import { Injectable } from '@nestjs/common';
import { Broker, BrokerMessage } from './config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { AbstractProducer } from './abstract.producer';
import { ImportConsumer } from './import.consumer';
import { BaseEntity } from 'typeorm';
import { BaseRepository } from '../common/base.repository';

@Injectable()
export class ImportProducer<T extends BaseEntity, Message extends BrokerMessage> extends AbstractProducer<Message> {
    constructor(
        protected readonly amqpConnection: AmqpConnection,
        private readonly importConsumer: ImportConsumer<T>,
    ) {
        super(amqpConnection);
    }

    public setEntityRepository(repository: BaseRepository<T>) {
        this.importConsumer.setEntityRepository(repository);
    }

    configure(): { exchange: string, queue: string } {
        return {
            exchange: Broker.DEFAULT_EXCHANGE,
            queue: Broker.DEFAULT_QUEUE,
        }
    }
}