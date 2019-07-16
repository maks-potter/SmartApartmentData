// Required field
const SA_REQUIRED_MESSAGE        = 'Required field';
// Select at least one item
const SA_EMPTY_SELECTION_MESSAGE = 'Select at least one item';
// Min length is %1$s
const SA_MIN_LENGTH_MESSAGE      = 'Min length is %1$s';
// Max length is %1$s
const SA_MAX_LENGTH_MESSAGE      = 'Max length is %1$s';
// This field can contains only numbers
const SA_ONLY_NUMBERS            = 'This field can contains only numbers';
// Valid range is %1$s - %2$s
const SA_VALID_RANGE             = 'Valid range is %1$s - %2$s';
// Version is already exist
const SA_VERSION_EXIST_MESSAGE   = 'Version is already exist';
// Incorrect email format
const SA_INCORRECT_EMAIL         = 'Incorrect email format';
// Passwords do not match
const SA_MATCH_PASSWORD          = 'Passwords do not match';

export interface ISaValidationError {
  message: string;
}

export enum SA_VALIDATION_ERRORS_TYPES {
  REQUIRED        = 'required',
  EMPTY_SELECTION = 'emptySelection',
  MINLENGTH       = 'minlength',
  MAXLENGTH       = 'maxlength',
  ONLY_NUMBERS    = 'onlyNumbers',
  INVALID_RANGE   = 'invalidRange',
  VERSION_EXIST   = 'versionExist',
  EMAIL           = 'email',
  MATCH_PASSWORD  = 'matchPassword',
}

export const SA_VALIDATION_ERRORS: { [key: string]: ISaValidationError } = {
  [SA_VALIDATION_ERRORS_TYPES.REQUIRED]: {
    message: SA_REQUIRED_MESSAGE,
  },
  [SA_VALIDATION_ERRORS_TYPES.EMPTY_SELECTION]: {
    message: SA_EMPTY_SELECTION_MESSAGE,
  },
  [SA_VALIDATION_ERRORS_TYPES.MINLENGTH]: {
    message: SA_MIN_LENGTH_MESSAGE,
  },
  [SA_VALIDATION_ERRORS_TYPES.MAXLENGTH]: {
    message: SA_MAX_LENGTH_MESSAGE,
  },
  [SA_VALIDATION_ERRORS_TYPES.ONLY_NUMBERS]: {
    message: SA_ONLY_NUMBERS,
  },
  [SA_VALIDATION_ERRORS_TYPES.INVALID_RANGE]: {
    message: SA_VALID_RANGE,
  },
  [SA_VALIDATION_ERRORS_TYPES.VERSION_EXIST]: {
    message: SA_VERSION_EXIST_MESSAGE,
  },
  [SA_VALIDATION_ERRORS_TYPES.EMAIL]: {
    message: SA_INCORRECT_EMAIL,
  },
  [SA_VALIDATION_ERRORS_TYPES.MATCH_PASSWORD]: {
    message: SA_MATCH_PASSWORD,
  },
};
