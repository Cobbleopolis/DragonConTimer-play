import { Component, Input } from '@angular/core';
@Component({
    selector: 'dc-timer-app',
    templateUrl: 'assets/javascripts/app/app.template.html'
})
export class AppComponent {
    @Input() message: String;
    constructor() {
        this.message = "Hello World!"
    }
}