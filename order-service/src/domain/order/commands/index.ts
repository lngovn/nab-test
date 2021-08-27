import { CreateOrderCommandHandler } from './handlers/create-order.handler';
import { PaymentCommandHandler } from './handlers/payment.handler';
import { PrepareOrderCommandHandler } from './handlers/prepare-order.handler';
import { RefundOrderCommandHandler } from './handlers/refund-order.handler';

export const CommandHandlers = [
  CreateOrderCommandHandler,
  PaymentCommandHandler,
  PrepareOrderCommandHandler,
  RefundOrderCommandHandler,
];
