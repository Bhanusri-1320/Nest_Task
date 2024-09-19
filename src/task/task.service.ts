/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { createTaskdto } from './dto/createTask.dto';
import { getTaskFilter } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>, // Inject base repository
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTaskWithFilter(filterdto: getTaskFilter): Task[] {
  //   const { status, search } = filterdto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  //   return tasks;
  // }
  getTasks(filterdto: getTaskFilter): Promise<Task[]> {
    const { status, search } = filterdto;
    const query = this.taskRepository.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status =:status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = query.getMany();
    return tasks;
  }
  async createTask(createTaskdto: createTaskdto): Promise<Task> {
    const { title, description } = createTaskdto;
    const task = this.taskRepository.create({
      // creating the task
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task); // saving it to the repo
    return task;
  }
  async getTaskById(id: any): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`task with id ${id} is not found`);
    }
    return found;
  }
  async deleteTask(id: string) {
    const result = await this.taskRepository.delete({ id });
    return { result, msg: 'task deleted🎊' };
  }

  async updateTaskStatus(id: string, status): Promise<Task> {
    const task = await this.getTaskById(id);
    console.log(task);
    console.log(status);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
