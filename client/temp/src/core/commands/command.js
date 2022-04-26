export class CommandHandler {
    constructor(listeners) {
        this.listeners = listeners;
        this.commands = [];
    }
    handle(predicate) {
        this.commands.forEach(cm => {
            if (cm.match(predicate)) {
                cm.execute(predicate, this.listeners);
                return;
            }
        });
    }
}
