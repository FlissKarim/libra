import { AmqpConnection, MessageHandlerOptions, Nack } from '@golevelup/nestjs-rabbitmq';
import { BrokerMessage } from './config';

export abstract class AbstractConsumer<Message extends BrokerMessage> {
    constructor(
        public readonly amqpConnection: AmqpConnection,
    ) {
        const { options, name } = this.configure();
        this.amqpConnection.createSubscriber(
            this.handle,
            options,
            name
        );
    }

    readonly handle = async (message: Message): Promise<Nack> => {
        try {
            await this.consume(message);
        } catch (error) {
            await this.onFail(message, error);
            if (message.retryOnFail) {
                delete message.retryOnFail;
                return new Nack(true);
            }
        }
        await this.onSuccess(message);
        return new Nack();
    }

    public onFail(message: Message, error: Error) { }
    public onSuccess(message: Message) { }

    abstract consume(message: Message);
    abstract configure(): { options: MessageHandlerOptions, name: string };
}