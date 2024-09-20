/* eslint-disable prettier/prettier */
// import { EntityRepository, Repository } from 'typeorm';
// import { Task } from './task.entity';
// @EntityRepository(Task)
// export class TaskRepository extends Repository<Task> {}
import { Repository } from 'typeorm';
import { Task } from './task.entity';
export class TaskRepository extends Repository<Task> {
  // Add custom methods if needed
  // async createTask(createTaskdto:createTaskdto):Promise<Task>
  // {
  //     const { title, description } = createTaskdto;
  //     const task = this.create({
  //       // creating the task
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     });
  //     await this.save(task); // saving it to the repo
  //     return task;
  // }
}
