import { ListenerSet } from "../listenerset.js";

export default interface Command {

    match(predicate : string) : boolean
    execute(predicate : string, listeners: ListenerSet) : void
    
}

export class CommandHandler {

    private commands : Command[];
    private listeners : ListenerSet;

    public constructor(listeners : ListenerSet) {
        this.listeners = listeners;
        this.commands = [];
    }

    public handle(predicate : string) {
        this.commands.forEach( cm => {

            if(cm.match(predicate)){
                cm.execute(predicate, this.listeners);
                return;
            }
        })
    }


}


