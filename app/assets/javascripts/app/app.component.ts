import { Component, Input } from '@angular/core';
import { Console } from './models/console';
@Component({
    selector: 'dc-timer-app',
    templateUrl: 'assets/javascripts/app/app.template.html'
})
export class AppComponent {
    @Input() message: String;
    consoles: Console[] = [];

    constructor() {
        this.message = "Hello World!";
        for(var i = 0; i <= 12; i++)
            this.consoles[i] = {time: i * 5}
    }
}