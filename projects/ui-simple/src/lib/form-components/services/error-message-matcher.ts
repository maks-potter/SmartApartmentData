import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { sprintf } from 'sprintf-js';

import {
  SA_VALIDATION_ERRORS,
  SA_VALIDATION_ERRORS_TYPES,
} from '@ui-simple/form-components/constants/validation-errors.constant';
import { SaShowOnDirtyErrorStateMatcher } from '@ui-simple/form-components/services/error-state-matcher';

@Injectable()
export class SaErrorMessageMatcher {
  constructor (private _saShowOnDirtyErrorStateMatcher: SaShowOnDirtyErrorStateMatcher) {
  }

  getValidationMessage (
    formControl: FormControl,
    validationErrors: typeof SA_VALIDATION_ERRORS = SA_VALIDATION_ERRORS,
    form: FormGroupDirective | NgForm | null      = null,
  ): string {
    if (this._saShowOnDirtyErrorStateMatcher.isErrorState(formControl, form)) {
      const [errorKey] = Object.keys(formControl.errors);

      if (!validationErrors[errorKey]) {
        return;
      }

      const message = validationErrors[errorKey].message;
      const error   = formControl.errors[errorKey];

      switch (errorKey) {
        case SA_VALIDATION_ERRORS_TYPES.MAXLENGTH:
        case SA_VALIDATION_ERRORS_TYPES.MINLENGTH:
          return sprintf(message, error.requiredLength);

        case SA_VALIDATION_ERRORS_TYPES.INVALID_RANGE:
          return sprintf(message, error.min, error.max);

        default:
          return message;
      }
    }
  }
}
