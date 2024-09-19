/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { createTaskdto } from './dto/createTask.dto';
import { getTaskFilter } from './dto/get-tasks-filter.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  getTasks(@Query() filterdto: getTaskFilter): Task[] {
    if (Object.keys(filterdto).length) {
      return this.taskService.getTaskWithFilter(filterdto);
    } else {
      return this.taskService.getAllTasks();
    }
  }
  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskBYId(id);
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
  updateTaskStatus(@Param('id') id: string, @Body() status: TaskStatus) {
    return this.taskService.updateTaskStatus(id, status);
  }
}
