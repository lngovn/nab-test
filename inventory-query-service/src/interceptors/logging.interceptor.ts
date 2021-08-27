import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserActivityLogService } from 'src/domain/user-activity-log/user-activity-log.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logService: UserActivityLogService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logService.log({
      activity: context.getArgs()?.[1],
      path: context.getArgs()?.[1],
      args: context.getArgs()?.[0],
    });
    return next.handle();
  }
}
