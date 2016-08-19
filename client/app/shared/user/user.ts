import { Task } from '../task/task';

export class User {

    public tasks: Task[];

    public id: number;
    public name: string;
    public email: string;
    public token: string;

    constructor(source: any) {

        this.id = source.user.id;
        this.name = source.user.name;
        this.email = source.user.email;
        this.token = source.user.auth_token;

        this.tasks = new Array<Task>();

        if (source.tasks) {
            for(var t of source.tasks) {
                this.tasks.push(new Task(t));
            }
        }

    }
}