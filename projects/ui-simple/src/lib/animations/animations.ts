import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { SA_LEFT_PANEL_WIDTH } from '@ui-simple/layout/constants/layout-left-panel.constant';

export enum SA_FADE_ANIMATION_STATES {
  VOID  = 'void',
  ENTER = 'enter',
  EXIT  = 'exit',
}

export enum SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES {
  VOID  = 'void',
  LEFT  = 'left',
  RIGHT = 'right',
}

export const SA_FADE_ANIMATION_NAME                = 'fadeAnimation';
export const SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_NAME = 'slideLeftToRightAnimation';

export const SA_FADE_ANIMATION_DELAY                = 150;
export const SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_DELAY = 150;

export const SA_FADE_ANIMATION: AnimationTriggerMetadata = trigger(SA_FADE_ANIMATION_NAME, [
  state(`${SA_FADE_ANIMATION_STATES.VOID}, ${SA_FADE_ANIMATION_STATES.EXIT}`, style({ opacity: 0 })),
  state(SA_FADE_ANIMATION_STATES.ENTER, style({ opacity: 1 })),
  transition(
    `* => ${SA_FADE_ANIMATION_STATES.ENTER}`,
    animate(`${SA_FADE_ANIMATION_DELAY}ms cubic-bezier(0.0, 0.0, 0.2, 1)`),
  ),
  transition(
    `* => ${SA_FADE_ANIMATION_STATES.EXIT}`,
    animate(`${SA_FADE_ANIMATION_DELAY}ms cubic-bezier(0.4, 0.0, 1, 1)`),
  ),
]);

export const SA_SLIDE_LEFT_TO_RIGHT_ANIMATION: AnimationTriggerMetadata = trigger(
  SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_NAME,
  [
    state(
      `${SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES.VOID}, ${SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES.RIGHT}`,
      style({ transform: 'translateX(-100%)' }),
    ),
    state(SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES.LEFT, style({ transform: `translateX(${SA_LEFT_PANEL_WIDTH}px)` })),
    transition(
      `* => ${SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES.LEFT}`,
      animate(`${SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_DELAY}ms cubic-bezier(0.0, 0.0, 0.2, 1)`),
    ),
    transition(
      `* => ${SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES.RIGHT}`,
      animate(`${SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_DELAY}ms cubic-bezier(0.4, 0.0, 1, 1)`),
    ),
  ],
);
