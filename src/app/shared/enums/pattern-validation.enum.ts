

export enum PatternValidation {
   CommaNotAllowed = "^[^,]+$",
   PanCard = '[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}',
   mobileNumber = '^[0-9]{10}$',
   email = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
  }