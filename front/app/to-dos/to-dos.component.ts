import { Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { Task } from '../shared/task/task';
import { TaskDirective } from '../shared/task/task.directive';
import { UserService } from '../shared/user/user.service';
import { ToDoService } from '../shared/to-do/to-do.service';

@Component({
    moduleId: module.id,
    templateUrl: 'to-dos.component.html',
    directives: [TaskDirective]
})
export class ToDosComponent {
    public todoService: ToDoService;
    public userService: UserService;

    public newToDo: string;

    constructor(us: UserService, ts: ToDoService) {
        this.userService = us;
        this.todoService = ts;
    }

    public addItem() {
        if (! this.newToDo) {
            return;
        }

        this.todoService.create(this.newToDo)
            .then(resp => {
                if (resp) {
                    this.userService.user.tasks.push(new Task(resp));
                    this.newToDo = '';
                }
            });
    }

    public updateItem(json: any) {
        this.todoService.update(json.task.id, json.task.content, json.task.completed)
            .then(resp => {
                if (! resp) {
                    for(let i = this.userService.user.tasks.length - 1; i >= 0; i--) {
                        if(this.userService.user.tasks[i].id == json.task.id) {
                            if (json.lastValue === null) {
                                this.userService.user.tasks[i].completed = !json.task.completed;
                            } else {
                                this.userService.user.tasks[i].content = json.lastValue;
                            }
                        }
                    }
                }

            });
    }

    public removeItem(item: Task) {

        this.todoService.delete(item.id)
            .then(resp => {
                if (resp) {
                    for(let i = this.userService.user.tasks.length - 1; i >= 0; i--) {
                        if(this.userService.user.tasks[i].id == item.id) {
                            this.userService.user.tasks.splice(i,1);
                        }
                    }
                }

            });
    }
}