import { Car } from "./car";
import { Country } from "./country";

export interface Owner {
    id: number;
    name: string;
    surname: string;
    age: number;
    citizenship: Country;
}