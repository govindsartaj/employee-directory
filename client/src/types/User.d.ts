export interface User {
  name: Name;
  location: Location;
  email: string;
  phone: string;
  id: number;
  picture: Picture;
  job: Job;
}
export interface Name {
  first: string;
  last: string;
}
export interface Location {
  city: string;
  country: string;
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
