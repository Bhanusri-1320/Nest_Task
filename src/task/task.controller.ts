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
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStatus } from './task-status.enum';
import { createTaskdto } from './dto/createTask.dto';
import { getTaskFilter } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  getTasks(@Query() filterdto: getTaskFilter): Promise<Task[]> {
    return this.taskService.getTasks(filterdto);
  }
  @Get(':id')
  getTaskById(id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskdto: createTaskdto) {
    return this.taskService.createTask(createTaskdto);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: any,
  ): Promise<Task> {
    const { status } = updateTaskDto;
    return this.taskService.updateTaskStatus(id, status);
  }
}
