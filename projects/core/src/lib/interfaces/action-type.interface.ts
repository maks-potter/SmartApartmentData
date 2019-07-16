import { ISaAction } from './action.interface';

export interface ISaActionType<T extends ISaAction> {
  new (...args: any[]): T;
}
