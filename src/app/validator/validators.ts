import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { Registration } from "../model/registration";

export class CustomRegistrationValidators {

    static registrationOwnerCitizenshipValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const country = control.get('country');
        const citizenship = control.get('owner.citizenship');
        if(country && citizenship){
            if(country.value == '' && citizenship.value != ''){
                return { countryIsEmpty: true };
            }
            else if(country.value !== citizenship.value){
                return { differentCountryAndCitizenship: true };
            } else{
                return null;
            } 
        } else {
            return null;
        }
      };
    
    static registrationDateValidator(control: AbstractControl): ValidationErrors | null {
        if (CustomRegistrationValidators.getDateWithoutTime(new Date(control.value)) <= CustomRegistrationValidators.getDateWithoutTime(new Date())) {
            return { invalidRegistrationDate: true };
        } else {
            return null;
        }

    }

    static registrationCarIdValidator(registrations: Registration[]) {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            return new Promise(resolver => {
                setTimeout(() => {
                    console.log(control.value)
                    if(registrations.map(registration => registration.car.id).indexOf(control.value) !== -1){
                        resolver({ alreadyRegistratedAsync: true });
                    } else {
                        resolver(null);
                    }
                }, 1000);
            });
        }
    }

    private static getDateWithoutTime(date: Date) {
        var date = new Date(date.getTime());
        date.setHours(0, 0, 0, 0);
        return date;
      }

}
