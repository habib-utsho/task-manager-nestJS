import { Injectable } from '@nestjs/common';
import { Task } from './task.interface.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { FilterTasksQueryDtoTs } from './dto/filter-tasks-query.dto.ts.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
    private readonly tasks: Task[] = [
        {
            id: 1,
            title: 'Task 1',
            description: 'Description for Task 1',
            isCompleted: false,
            createdAt: new Date()
        }, {
            id: 2,
            title: 'Task 2',
            description: 'Description for Task 2',
            isCompleted: true,
            createdAt: new Date()
        },
        {
            id: 3,
            title: 'Task 3',
            description: 'Description for Task 3',
            isCompleted: false,
            createdAt: new Date()
        }
    ]



    findAll(filters: FilterTasksQueryDtoTs) {
        const { title, isCompleted } = filters;

        const tasks = this.tasks

        console.log(isCompleted, 'isCompleted');

        if (isCompleted === true) {
            return tasks.filter((task: any) => task.isCompleted === true)
        }

        if (isCompleted === false) {
            return tasks.filter((task: any) => task.isCompleted === false)
        }

        if (title) {
            return tasks.filter((task: any) => task.title.includes(title))
        }


        return tasks
    }

    findOne(id: string) {
        const task = this.tasks.find((task: any) => task.id === id)
        return task;
    }


    create(createTaskDto: CreateTaskDto) {
        const newTask = {
            id: this.tasks.length + 1,
            createdAt: new Date(),
            ...createTaskDto
        }
        this.tasks.push(newTask);
        return newTask;
    }


    remove(id: string) {
        const taskIndex = this.tasks.findIndex((task: any) => task.id === id)
        if (taskIndex === -1) {
            return null;
        }
        return this.tasks.splice(taskIndex, 1)[0];
    }

    update(id: string, updateTaskDto: UpdateTaskDto) {
        const task = this.findOne(id);
        if (!task) {
            return null;
        }
        Object.assign(task, updateTaskDto);
        return task;
    }

}
