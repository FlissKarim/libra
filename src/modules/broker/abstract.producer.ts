import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Broker, BrokerMessage } from './config';

export abstract class AbstractProducer {
    private exchange = Broker.DEFAULT_EXCHANGE;
    private queue = Broker.DEFAULT_QUEUE;

    constructor(
        protected readonly amqpConnection: AmqpConnection,
    ) {
        const { exchange, queue } = this.configure();
        this.exchange = exchange;
        this.queue = queue;
    }

    public publish(message: BrokerMessage): Promise<any> {
        return this.amqpConnection.publish(this.exchange, this.queue, message);
    }

    abstract configure(): { exchange: string, queue: string };
}