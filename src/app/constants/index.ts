export const API_URL = 'https://api.weather.gov'

export const enum EnumCities {
  LWX = 'LWX',
  TOP = 'TOP'
}

export type City = {
  value: keyof typeof EnumCities
  viewValue: string
}

export const CITIES: Array<City> = [
  { value: EnumCities.LWX, viewValue: 'District of Columbia Forecast' },
  { value: EnumCities.TOP, viewValue: 'Kansas Forecast' },
]

