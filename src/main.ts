import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import customConfig from './customConfig.json';



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));



  interface IAppConfig {
  backend_URL?: string;
}
