import { ClientOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: ClientOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['kafka:9092'],
    },
    consumer: {
      groupId: '1',
      allowAutoTopicCreation: true,
    },
  },
};
