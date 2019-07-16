import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

/** Error state matcher that matches when a control is invalid and dirty. */
@Injectable({providedIn: 'root'})
export class SaShowOnDirtyErrorStateMatcher implements SaErrorStateMatcher {
  isErrorState (control: FormControl | FormGroup | null, form: FormGroupDirective | NgForm | null = null): boolean {
    return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
  }
}

/** Provider that defines how form controls behave with regards to displaying error messages. */
@Injectable({providedIn: 'root'})
export class SaErrorStateMatcher {
  isErrorState (control: FormControl | FormGroup | null, form: FormGroupDirective | NgForm | null = null): boolean {
    return !!(control && control.invalid && (control.touched || (form && form.submitted)));
  }
}
