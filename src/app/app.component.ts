import { Country } from './model/country';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Registration } from './model/registration';
import { CustomRegistrationValidators } from './validator/validators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  registrations: Registration[] = []
  availableCountries: string[] = [];

  registrationForm = new FormGroup({
    // number: new FormControl('', Validators.required, CustomValidators.getForbiddenValidator(['123', '456'])),
    number: new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{4}[A-Z]{2}$")]),
    country: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required, CustomRegistrationValidators.registrationDateValidator]),
    owner: new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      citizenship: new FormControl('', Validators.required),
    }),
    car: new FormGroup({
      id: new FormControl('', Validators.required, CustomRegistrationValidators.registrationCarIdValidator(this.registrations)),
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
    })}, {
      validators: CustomRegistrationValidators.registrationOwnerCitizenshipValidator
    }
  );

  get ownerForm(): FormGroup {
    return this.registrationForm.controls['owner'] as FormGroup;
  }

  get carForm(): FormGroup {
    return this.registrationForm.controls['car'] as FormGroup;
  }

  ngOnInit(): void {
    this.availableCountries = Object.keys(Country).filter((item) => {
      return isNaN(Number(item));
    });

    this.registrationForm.get('country')?.valueChanges.subscribe(newCountry => {
      this.ownerForm.patchValue({
        citizenship: newCountry
      })
    })
  }

  clearForm(){
    const cleanedData = {
      "country": '',
      "number": '',
      "date": '',
      "owner": {
        "id": '',
        "name": '',
        "surname": '',
        "age": '',
        "citizenship": '',
      },
      "car": {
        "id": '',
        "brand": '',
        "model": '',
        "releaseDate": '',
      }
      
    };

    this.registrationForm.patchValue(cleanedData);
  }

  onSubmit() {
    this.registrations.push(this.registrationForm.value);
    this.clearForm();
  }

}

