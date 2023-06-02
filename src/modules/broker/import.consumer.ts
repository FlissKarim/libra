import { Injectable } from '@nestjs/common';
import { Broker, BrokerMessage } from './config';
import { AmqpConnection, MessageHandlerOptions } from '@golevelup/nestjs-rabbitmq';
import { AbstractConsumer } from './abstract.consumer';
import { BaseRepository } from '../common/base.repository';
import { BaseEntity } from 'typeorm';
import { LoggerService } from '../common/logger.service';

export interface ImportMessage extends BrokerMessage {
    headers: any[],
    columns: any[],
    target: string,
}

@Injectable()
export class ImportConsumer<T extends BaseEntity> extends AbstractConsumer<ImportMessage> {
    private repositories: Record<string, BaseRepository<T>> = {};
    constructor(
        public readonly amqpConnection: AmqpConnection,
        public readonly logger: LoggerService<string>,
    ) {
        super(logger, amqpConnection);
    }

    public async consume(message: ImportMessage) {
        if (!(message.target in this.repositories)) {
            throw new Error("The repository's entity is not set.");
        }
        const repository = this.repositories[message.target];
        try {
            let entity = repository.creator(message.columns, message.headers as any);
            await repository.create(entity);
        } catch (error) {
            console.error(error)
        }
    }

    public setEntityRepository(repository: BaseRepository<T>) {
        let target = repository.targetName();
        if (!(target in this.repositories)) {
            this.repositories[target] = repository;
        }
    }

    public configure(): { options: MessageHandlerOptions, name: string } {
        return {
            options: {
                exchange: Broker.DEFAULT_EXCHANGE,
                queue: Broker.DEFAULT_QUEUE,
            },
            name: ImportConsumer.name
        }
    }
}