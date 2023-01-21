import { trigger, transition, style,
         query, group, animate } from "@angular/animations";

export const pageSwitch = trigger('routeAnimations', [
    transition('* => isRight', fadeOutAndSlideIn() ),
    transition('isRight => *', fadeInAndSlideOut() ),
]);

function fadeOutAndSlideIn() {
    const optional = { optional: true };
    return [
        query(':leave', [
            style({
                position: 'absolute',
                top: 0, left: 0,
                height: '100%',
                width: '100%',
                opacity: 1,
                'z-index': 9998
            })
        ], optional),
        query(':enter', [
            style({
                position: 'absolute',
                top: 0, right: '-150%',
                height: '100%',
                width: '100%',
                'z-index': 9999
            })
        ], optional),
        group([
            query(':leave', [
                animate('350ms ease', style({ opacity: 0 }))
            ], optional),
            query(':enter', [
                animate('350ms ease', style({ right: '0%' }))
            ], optional),
        ]),
    ];
}

function fadeInAndSlideOut() {
    const optional = { optional: true };
    return [
        query(':leave', [
            style({
                position: 'absolute',
                top: 0, right: 0,
                height: '100%',
                width: '100%',
                'z-index': 9999
            })
        ], optional),
        query(':enter', [
            style({
                position: 'absolute',
                top: 0, left: 0,
                height: '100%',
                width: '100%',
                opacity: 0,
                'z-index': 9998
            })
        ], optional),
        group([
            query(':leave', [
                animate('350ms ease', style({ right: '-150%' }))
            ], optional),
            query(':enter', [
                animate('350ms ease', style({ opacity: 1 }))
            ], optional),
        ]),
    ];
}
