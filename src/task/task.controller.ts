/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStatus } from './task-status.enum';
import { createTaskdto } from './dto/createTask.dto';
import { getTaskFilter } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  getTasks(
    @Query() filterdto: getTaskFilter,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterdto, user);
  }
  @Get(':id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }
  @Post()
  createTask(
    @Body() createTaskdto: createTaskdto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskdto, user);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string,@GetUser() user:User) {
    return this.taskService.deleteTask(id,user);
  }
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: any,
    @GetUser() user:User
  ): Promise<Task> {
    const { status } = updateTaskDto;
    return this.taskService.updateTaskStatus(id, status,user);
  }
}
