import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { Task } from './task';

@Component({
    moduleId: module.id,
    selector: 'task',
    templateUrl: 'task.directive.html',
})
export class TaskDirective implements OnInit {

    @Input() task: Task;
    @Output() update = new EventEmitter();
    @Output() remove = new EventEmitter();

    public lastValue: string;

    ngOnInit() {
        this.lastValue = this.task.content;
    }

    public sendUpdate(event: any) {
        if (event.type == 'keyup') {
            event.target.blur();
        }

        if (this.task.content != this.lastValue) {
            this.update.emit({
                task: this.task,
                lastValue: this.lastValue
            });

            this.lastValue = this.task.content;
        }
    }

    public sendUpdateCompleted() {
        this.task.completed = !this.task.completed;

        this.update.emit({
            task: this.task,
            lastValue: null
        });
    }

    public sendRemove() {
        this.remove.emit(this.task);
    }

    public setClasses() {
        return {
            done: this.task.completed,
            notbold: (this.lastValue != this.task.content)
        }
    }
}