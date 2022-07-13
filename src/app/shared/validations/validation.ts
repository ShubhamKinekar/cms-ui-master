import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import * as _ from "lodash";
import { ValidationErrorCodes } from "../enums";
import { JsonHelper } from "../helpers/json.helper";

export function validateWhiteSpace(c: FormControl) {
  return c.value && c.value.toString().length > 0 && c.value.toString().trim().length > 0
    ? null
    : JsonHelper.getJsonFromKeyValue(ValidationErrorCodes.validateWhiteSpace, true);
}

// Todo : Remove
export function validateCodeInputRequirement(c: FormControl) {
  const regex = new RegExp('^[a-zA-Z][a-zA-Z0-9-_]*$');
  if (c.value === '') {
    return null;
  }
  return regex.test(c.value)
    ? null
    : {
      validateCodeInputRequirement: {
        valid: false
      }
    };
}

export function validateSuffixToBeginWithAlphabestOrNumbers(c: FormControl) {
  const regex = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9-_]*$');
  if (c.value === '') {
    return null;
  }
  return regex.test(c.value)
    ? null
    : {
      validateSuffixToBeginWithAlphabestOrNumbers: {
        valid: false
      }
    };
}
export const isNil = (value: any): value is (null | undefined) => {
  return value == null;
};

export const isObject = (value: any): boolean => {
  return value && value.constructor === Object;
};

export const isBlank = (value: any): boolean => {
  return isNil(value) ||
    (isObject(value) && Object.keys(value).length === 0) ||
    value.toString().trim() === '';
};

export const isPresent = (value: any): boolean => {
  return !isBlank(value);
};

export function selectedValueNo(c: FormControl) {
  return parseInt(c.value, 10) === 2 ? JsonHelper.getJsonFromKeyValue(ValidationErrorCodes.selectedValueNo, true) : null;
}

export function actionStatusOpen(c: FormControl) {
  return parseInt(c.value, 10) === 1 ? JsonHelper.getJsonFromKeyValue(ValidationErrorCodes.actionStatusOpen, true) : null;
}

export function isActionCompleteDateLessThanSubmittedDate(c: FormControl) {
  return new Date().getDate() < new Date(c.value).getDate() ? JsonHelper.getJsonFromKeyValue(ValidationErrorCodes.isActionCompleteDateInvalid, true) : null;
}
