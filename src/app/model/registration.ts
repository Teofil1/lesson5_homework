import { Car } from './car';
import { Country } from "./country";
import { Owner } from "./owner";

export interface Registration {
    car: Car;
    owner: Owner;
    number: string;
    date: Date;
    country: Country;
}