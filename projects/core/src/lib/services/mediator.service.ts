import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { ISaActionType } from '../interfaces/action-type.interface';
import { ISaAction } from '../interfaces/action.interface';

@Injectable({
  providedIn: 'root',
})
export class Mediator {
  private readonly subjectsMap: WeakMap<ISaActionType<ISaAction>, Subject<ISaAction>> = new WeakMap();

  /**
   * Dispatch Action
   * @param action { ISaAction }
   */
  dispatch (action: ISaAction): void {
    const actionType = action.constructor as ISaActionType<ISaAction>;
    const subject    = this.subjectsMap.get(actionType);

    if (subject) {
      subject.next(action);
    }
  }

  /**
   * Listen dispatch of action
   * @param actionType { ISaAction<T> }
   * @param destroy$ { Subject<void> }
   * @return Observable<T>
   */
  ofAction<T extends ISaAction> (actionType: ISaActionType<T>, destroy$?: Subject<void>): Observable<T> {
    if (!this.subjectsMap.has(actionType)) {
      this.subjectsMap.set(actionType, new Subject());
    }

    const relatedSubject = this.subjectsMap.get(actionType);

    return (
      destroy$
        ? relatedSubject.pipe(takeUntil(destroy$))
        : relatedSubject.asObservable()
    ) as Observable<T>;
  }
}
