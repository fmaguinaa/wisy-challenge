import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnumCities } from '../constants';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables)

type Period = {
  detailedForecast: string
  icon: string
  name: string
  temperature: number
  temperatureUnit: string
  windDirection: string
  windSpeed: string
  relativeHumidity: {
    unitCode: string
    value: number
  }
  dewpoint: {
    unitCode: string
    value: number
  }
}

type Properties = {
  units?: string
  updateTime?: string
  periods: Array<Period>
}

type Data = {
  '@context'?: any
  geometry?: any
  properties: Properties
}


@Component({
  selector: 'app-weather',
  standalone: true,
  providers: [ApiService],
  imports: [HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {
  id: EnumCities;
  data: Data;
  chart: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.id = EnumCities.LWX;
    this.data = { properties: { periods: [] } } as Data
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as EnumCities || EnumCities.LWX;
    this.apiService.getData(this.id).subscribe(res => {
      this.data = res as Data;
      console.log(this.data)
      this.createChart();
    })
  }

  createChart() {
    const { periods } = this.data.properties
    const labels = periods.map((period: Period) => period.name)
    const temperatures = periods.map((period: Period) => period.temperature)
    const relativeHumidities = periods.map((period: Period) => period.relativeHumidity.value)
    const dewpoints = periods.map((period: Period) => period.dewpoint.value)

    const hoverValue = {
      id: 'hoverValue',
  

    }

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: `Temperature °F`,
          data: temperatures,
          fill: false,
          tension: 0.1
        }, {
          label: `Relative Humidity`,
          data: relativeHumidities,
          
          fill: false,
          tension: 0.1
        },
        {
          label: `Dewpoint`,
          data: dewpoints,
          fill: false,
          tension: 0.1
        },]
      },
      options: { aspectRatio: 1, plugins: {
        subtitle: {
          display: true,
          text:'geggee'
        }
      } },
    })
  }
}
