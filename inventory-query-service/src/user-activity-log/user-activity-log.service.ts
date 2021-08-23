import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserActivityLogDto } from './user-activity-log-created.dto';
import { UserActivityLog } from './user-activity-log.entity';

@Injectable()
export class UserActivityLogService {
  constructor(
    @InjectRepository(UserActivityLog)
    private userActivityLogRepository: Repository<UserActivityLog>,
  ) {}

  async log({
    activity,
    path,
    params,
    query,
    body,
    results,
  }: CreateUserActivityLogDto) {
    return this.userActivityLogRepository.save({
      activity,
      path,
      args: {
        params,
        query,
        body,
      },
      results,
    });
  }
}
