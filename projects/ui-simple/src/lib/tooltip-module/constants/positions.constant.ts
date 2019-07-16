import { ConnectionPositionPair } from '@angular/cdk/overlay';

export enum SA_PLACEMENTS {
  TOP          = 'top',
  TOP_LEFT     = 'top-left',
  TOP_RIGHT    = 'top-right',
  RIGHT        = 'right',
  RIGHT_TOP    = 'right-top',
  RIGHT_BOTTOM = 'right-bottom',
  BOTTOM       = 'bottom',
  BOTTOM_LEFT  = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  LEFT         = 'left',
  LEFT_TOP     = 'left-top',
  LEFT_BOTTOM  = 'left-bottom',
}

export enum SA_TOOLTIP_MODES {
  BLUE     = 'sa-tooltip-new--blue',
  BIG      = 'sa-tooltip-new--big',
  BIG_BLUE = 'sa-tooltip-new--blue sa-tooltip-new--big',
}

export const SA_POSITION_MAP: { [key: string]: ConnectionPositionPair } = {
  [SA_PLACEMENTS.TOP]: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
  },
  [SA_PLACEMENTS.TOP_LEFT]: {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
  },
  [SA_PLACEMENTS.TOP_RIGHT]: {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
  },
  [SA_PLACEMENTS.RIGHT]: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
  },
  [SA_PLACEMENTS.RIGHT_TOP]: {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
  },
  [SA_PLACEMENTS.RIGHT_BOTTOM]: {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'bottom',
  },
  [SA_PLACEMENTS.BOTTOM]: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },
  [SA_PLACEMENTS.BOTTOM_LEFT]: {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  },
  [SA_PLACEMENTS.BOTTOM_RIGHT]: {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
  },
  [SA_PLACEMENTS.LEFT]: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
  },
  [SA_PLACEMENTS.LEFT_TOP]: {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
  },
  [SA_PLACEMENTS.LEFT_BOTTOM]: {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'bottom',
  },
};

export const SA_DEFAULT_POSITIONS = [
  SA_POSITION_MAP.top,
  SA_POSITION_MAP.bottom,
  SA_POSITION_MAP.right,
  SA_POSITION_MAP.left,
];
