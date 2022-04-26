export class Task {
    constructor(task) {
        this.id = task.id;
        this.author = task.author;
        this.name = task.name;
        this.description = task.description;
        this.start = task.start;
        this.end = task.end;
        this.allDay = task.allDay;
        this.done = task.done;
        this.labels = task.labels;
    }
}
