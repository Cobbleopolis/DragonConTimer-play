import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent }   from './app.component';
import { ConsoleComponent }   from './components/console/console.component'

@NgModule({
    imports:      [ BrowserModule, Ng2BootstrapModule ],
    declarations: [ AppComponent, ConsoleComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }