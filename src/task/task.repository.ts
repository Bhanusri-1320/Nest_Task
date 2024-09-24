/* eslint-disable prettier/prettier */
// import { EntityRepository, Repository } from 'typeorm';
// import { Task } from './task.entity';
// @EntityRepository(Task)
// export class TaskRepository extends Repository<Task> {}
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { createTaskdto } from './dto/createTask.dto';
import { getTaskFilter } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  // Add custom methods if needed
  async createTask(createTaskdto: createTaskdto): Promise<Task> {
    const { title, description } = createTaskdto;
    const task = this.create({
      // creating the task
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task); // saving it to the repo
    return task;
  }
  async getTask(filterdto: getTaskFilter, user: User) {
    const { status, search } = filterdto;
    const query = this.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status =:status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = query.getMany();
    return tasks;
  }
}
