export interface User {
  name: Name;
  location: Location;
  email: string;
  dob: DOB;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
  job: Job;
}
export interface Name {
  title: string;
  first: string;
  last: string;
}
export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;
}
export interface Street {
  number: number;
  name: string;
}
export interface Coordinates {
  latitude: string;
  longitude: string;
}
export interface Timezone {
  offset: string;
  description: string;
}
export interface DOB {
  date: string;
  age: number;
}
export interface Id {
  name: string;
  value?: null;
}
export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
export interface Job {
  title: string;
  department: string;
}
