import { ClientOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: ClientOptions = {
  transport: Transport.REDIS,
  options: {
    url: 'redis://redis:6379',
  },
};
