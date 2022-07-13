import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ValidationErrorCodes } from "../../enums";

@Component({
    template: '',
})
export class BaseValidationsComponent {
    //Validations
    formInput: FormGroup = new FormGroup({});

    constructor() {

    }

    setForm(form: FormGroup) {
        this.formInput = form;
    }

    isModified(controlName: string) {
        return (
            this.formInput.controls[controlName].touched ||
            this.formInput.controls[controlName].dirty
        );
    }

    isEmpty(controlName: string) {
        return this.hasError(controlName, ValidationErrorCodes.required);
    }

    hasWhiteSpace(controlName: string) {
        return this.hasError(controlName, ValidationErrorCodes.validateWhiteSpace);
    }

    isDropdownSelected(controlName: string) {
        return this.hasError(controlName, ValidationErrorCodes.selectDropdown);
    }

    hasError(controlName: string, errorCode: string) {
        return this.formInput.controls[controlName].hasError(errorCode);
    }

    checkDateRange(startDate: Date, endDate: Date) {
        return startDate && endDate && endDate < startDate;
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            } else if (control instanceof FormArray) {
                const allForms = (control as FormArray).controls as FormGroup[];
                allForms.forEach((form) => {
                    this.validateAllFormFields(form);
                });
            }
        });
    }

    disableAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.disable({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.disableAllFormFields(control);
            } else if (control instanceof FormArray) {
                const allForms = (control as FormArray).controls as FormGroup[];
                allForms.forEach((form) => {
                    this.disableAllFormFields(form);
                });
            }
        });
    }

    setControlDirty(controlName: string, controlValue: any) {
        this.formInput.controls[controlName].setValue(controlValue);
        this.formInput.controls[controlName].markAsDirty();
    }

    isFormDirty(formGroup: FormGroup) {
        const keys = Object.keys(formGroup.controls);
        for (let i = 0; i < keys.length; i++) {
            const control = formGroup.get(keys[i]);
            if (control instanceof FormControl) {
                if (control.dirty || control.touched) return true;
            } else if (control instanceof FormGroup) {
                if (control.dirty || control.touched) return true;
            } else if (control instanceof FormArray) {
                const allForms = (control as FormArray).controls as FormGroup[];
                for (let j = 0; j < allForms.length; j++) {
                    if (this.isFormDirty(allForms[j])) return true;
                }
            }
        }
        return false;
    }

    //Validations
}
