import 'reflect-metadata';
import { FormGroup } from '@angular/forms';

export interface IReflection {
  displayColumns(): any;
  countFields(): any;
  trimAll(): void;
  loadFromInput(formGroup: FormGroup): void;
}

export class Reflection implements IReflection {
  displayColumns() {
    // Deep copy to avoid accidental modification of data
    return (
      JSON.parse(
        JSON.stringify(Reflect.getMetadata('displayColumn', this.getTarget()))
      ) || []
    );
  }
  countFields() {
    if (Reflect.getMetadata('count', this.getTarget())) {
      return (
        JSON.parse(
          JSON.stringify(Reflect.getMetadata('count', this.getTarget()))
        ) || []
      );
    }
    return [];
  }

  trimAll() {
    const _this: any = this;
    if (Reflect.getMetadata('trim', _this.getTarget())) {
      Reflect.getMetadata('trim', _this.getTarget()).forEach(
        (element: string | number) => {
          if (_this[element]) {
            _this[element] = _this[element].trim();
          }
        }
      );
    }
  }

  loadFromInput(formGroup: FormGroup) {
    const _this: any = this;
    const formInputFields = Reflect.getMetadata('formInput', _this.getTarget());
    formInputFields.forEach((element: string | number) => {
      if (formGroup.controls[element]) {
        _this[element] = formGroup.controls[element].value;
      }
    });
  }

  getTarget() {
    return Object.getPrototypeOf(this);
  }

  advanceSearchs() {
    // Deep copy to avoid accidental modification of data

    return (
      JSON.parse(
        JSON.stringify(Reflect.getMetadata('advanceSearch', this.getTarget()))
      ) || []
    );
  }
}
