import { AmqpConnection, MessageHandlerOptions } from '@golevelup/nestjs-rabbitmq';
import { BrokerMessage } from './config';
import { AbstractProducer } from './abstract.producer';

export abstract class AbstractConsumer {
    constructor(
        public readonly amqpConnection: AmqpConnection,
        private readonly producer: AbstractProducer,
    ) {
        const { options, name } = this.configure();
        this.amqpConnection.createSubscriber(
            this.handle,
            options,
            name
        );
    }

    readonly handle = async (message: BrokerMessage): Promise<any> => {
        try {
            await this.consume(message);
        } catch (error) {
            return this.onFail(message, error);
        }
        return this.onSuccess(message);
    }

    public onFail(message: BrokerMessage, error: Error) {
        if (message.retryOnFail) {
            delete message.retryOnFail;
            this.producer.publish(message);
        }
    }

    public onSuccess(message: BrokerMessage) { }

    abstract consume(message: BrokerMessage);
    abstract configure(): { options: MessageHandlerOptions, name: string };
}