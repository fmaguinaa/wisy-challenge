import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [{
  path: 'weather/:id', component: WeatherComponent,
}, {
  path: '', component: HomeComponent,
}, {
  path: '**', component: HomeComponent,
}
];
