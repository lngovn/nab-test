import { ClientOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: ClientOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: '1001',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: '2',
      allowAutoTopicCreation: true,
    },
  },
};
