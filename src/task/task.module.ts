/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
