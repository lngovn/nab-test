import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, mergeMap, Observable } from 'rxjs';
import { CreateOrderCommand } from '../commands/create-order.command';
import { PrepareOrderCommand } from '../commands/prepare-order.command';
import { RefundOrderCommand } from '../commands/refund-order.command';
import { CreateOrderFailedEvent } from '../events/create-order-failed.event';
import { CreateOrderTransactionEvent } from '../events/create-order-transaction.event';
import { ItemPreparedEvent } from '../events/item-prepared.event';

@Injectable()
export class CreateOrderTransactionSaga {
  @Saga()
  createOrderTransaction = ($event: Observable<any>): Observable<ICommand> => {
    return $event.pipe(
      ofType(CreateOrderTransactionEvent),
      map(({ createOrderDto, colId }) => {
        return new PrepareOrderCommand(createOrderDto, colId);
      }),
    );
  };

  @Saga()
  OrderItemsPrepared = ($event: Observable<any>): Observable<ICommand> => {
    return $event.pipe(
      ofType(ItemPreparedEvent),
      map(({ order, colId }) => {
        return new CreateOrderCommand(order, colId);
      }),
    );
  };

  @Saga()
  createOrderTransactionFailed = (
    $event: Observable<any>,
  ): Observable<ICommand> => {
    return $event.pipe(
      ofType(CreateOrderFailedEvent),
      map(({ bookedItems, colId }) => {
        const commands = bookedItems.map(
          (item) =>
            new RefundOrderCommand(
              {
                productId: item.productId,
                quantity: item.quantity,
              },
              colId,
            ),
        );
        return commands;
      }),
      mergeMap((c) => c),
    );
  };
}
