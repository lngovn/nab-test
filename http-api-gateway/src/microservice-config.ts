import { ClientOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: ClientOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: '1',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: '1',
      allowAutoTopicCreation: true,
    },
  },
};
