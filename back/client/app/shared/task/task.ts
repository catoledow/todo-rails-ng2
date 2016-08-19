export class Task {

    public id: number;
    public content: string;
    public completed: boolean;

    constructor(source: any) {

        this.id = source.id;
        this.content = source.content;
        this.completed = source.completed;

    }
}