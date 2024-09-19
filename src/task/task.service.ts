/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskdto } from './dto/createTask.dto';
import { getTaskFilter } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskWithFilter(filterdto: getTaskFilter): Task[] {
    const { status, search } = filterdto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }
    return tasks;
  }
  createTask(createTaskdto: createTaskdto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, description } = createTaskdto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskBYId(id: string) {
    const task = this.tasks.find((task) => id == task.id);
    if (!task) {
      throw new NotFoundException(`task with id ${id} is not found`);
    }
    return task;
  }
  deleteTask(id: string) {
    const task = this.tasks.find((task) => id == task.id);
    if (task) {
      const index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
      return { msg: ' task deleted' };
    } else {
      return 'not able to delete';
    }
  } 
  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskBYId(id);
    task.status = status;
    return task;
  }
}
