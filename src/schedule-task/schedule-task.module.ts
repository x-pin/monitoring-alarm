import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AlarmMessageModule } from 'src/alarm-message/alarm-message.module';
import { ScheduleTaskService } from './schedule-task.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AlarmMessageModule,
  ],
  providers: [ScheduleTaskService],
  controllers: [],
})
export class ScheduleTaskModule {}
