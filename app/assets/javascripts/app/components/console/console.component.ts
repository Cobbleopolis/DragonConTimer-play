import { Component, Input } from '@angular/core';
import { Console } from '../../models/console';
@Component({

    selector: 'console',
    templateUrl: 'assets/javascripts/app/components/console/console.template.html'
})
export class ConsoleComponent {
    @Input() console: Console;
    constructor() {}

    getType(): string {
        if (this.console.time > 45)
            return 'success';
        else if (this.console.time > 30)
            return 'info';
        else if (this.console.time > 15)
            return 'warning';
        else
            return 'danger';
    }

    random(): void {
        this.console.time = Math.random() * 60;
    }
}
