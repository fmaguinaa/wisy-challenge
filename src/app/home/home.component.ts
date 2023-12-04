import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CITIES, City, EnumCities } from '../constants';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule]
})
export class HomeComponent {
  cities: City[] = CITIES;

  constructor(private router: Router) { }

  select(value: keyof typeof EnumCities) {
    this.router.navigate(['weather', value])
  }
}
