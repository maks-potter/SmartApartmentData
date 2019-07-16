import { ISaAction } from '@sa-core/interfaces/action.interface';

export namespace SaLayoutLeftPanelActions {
  export class ShowSidebar implements ISaAction {
    constructor (
      public sidebarTitle: string,
    ) {
    }
  }

  export class HideSidebar implements ISaAction {}

  export class SidebarShowed implements ISaAction {}

  export class SidebarHidden implements ISaAction {}
}
