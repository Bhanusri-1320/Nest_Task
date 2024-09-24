/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
const mockTasksRepository = () => ({
  getTask: jest.fn(),
});
const mockUser = {
  username: 'bhanu',
  id: 'someID',
  password: 'somepassword',
  tasks: [],
};
describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();
    taskService = module.get(TaskService);
    taskRepository = module.get(TaskRepository);
  });
  describe('getTask', async () => {
    it('calls TaskREpository.getTasks and returns the result', async () => {
      expect(taskRepository.getTask).not.toHaveBeenCalled();
      taskRepository.getTask.mockResolvedValue('someValue');
      const result = await taskService.getTasks(null, mockUser);
      expect(taskRepository.getTask).toHaveBeenCalled();
      expect(taskRepository.getTask).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
