import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
const platform = platformBrowserDynamic();
//noinspection TypeScriptUnresolvedFunction
platform.bootstrapModule(AppModule);