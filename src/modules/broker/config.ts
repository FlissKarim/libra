import { ConnectionInitOptions, RabbitMQExchangeConfig } from "@golevelup/nestjs-rabbitmq";

export class Broker {
    static readonly URI = 'amqp://guest:guest@localhost:5672';
    static readonly CONNECTION_OPTIONS: ConnectionInitOptions = { wait: true, timeout: 10000 };
    static readonly DEFAULT_EXCHANGE = "exchange1";
    static readonly DEFAULT_QUEUE = "queue";
    static readonly EXCHANGES: RabbitMQExchangeConfig[] = [
        {
            name: Broker.DEFAULT_EXCHANGE,
            type: 'topic',
        },
    ];

    static readonly CONFIG: any = {
        useFactory: () => {
            return {
                exchanges: Broker.EXCHANGES,
                uri: Broker.URI,
                connectionInitOptions: Broker.CONNECTION_OPTIONS,
            }
        }
    }
}

export interface BrokerMessage {
    retryOnFail?: boolean;
    options?: any,
    [key: string]: any;
}

