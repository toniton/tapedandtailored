import { trigger, transition, animate, style, state, keyframes, query, group, sequence, animateChild } from '@angular/animations';

export function SLIDE_IN_OUT() {
    return trigger('flyInOut', [
        state('', style({ opacity: 1, transform: 'translateY(0)' })),
        transition('void => *', [
            style({
                opacity: 0,
                transform: 'translateY(50%)'
            }),
            animate('0.4s ease-in')
        ]),
        transition('* => void', [
            animate('0.4s 0.2s ease-out', style({
                opacity: 0,
                transform: 'translateY(-50%)'
            }))
        ])
    ])
}