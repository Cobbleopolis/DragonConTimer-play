import {Console} from "../models/console";

export class ConsoleStore {

    static consoles: Map<string, Console> = new Map<string, Console>();

    static emptyConsole: Console = new Console("", "", []);

    static addConsole(...consoles: Console[]): void {
        consoles.forEach(console => ConsoleStore.consoles.set(console.id, console));
    }

    static updateConsole(consoles: Console[]): void {
        consoles.forEach(console => ConsoleStore.consoles.set(console.id, console));
    }

    static getConsole(id: string): Console {
        let c = ConsoleStore.consoles.get(id);
        if (c === undefined)
            return ConsoleStore.emptyConsole;
        else
            return c;
    }
}