import { ClientOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: ClientOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: '1',
      brokers: ['kafka:9092'],
    },
  },
};
