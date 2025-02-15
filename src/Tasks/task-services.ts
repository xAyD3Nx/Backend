import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // 🟢 Create a Task
  async create(createTaskDto: CreateTaskDto) {
    const taskData: Prisma.TaskCreateInput = {
        ...createTaskDto,
        name: ''
    };
    return this.prisma.task.create({ data: taskData });
  }

  // 🟡 Update a Task
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task) throw new NotFoundException('Task not found');

    return this.prisma.task.update({
      where: { id: Number(id) },
      data: updateTaskDto,
    });
  }
}
