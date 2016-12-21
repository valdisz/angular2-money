import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Money } from './money';

@Component({
    selector: 'money',
    template: require('./money.component.pug'),
    styles: [ require('./money.component.scss').toString() ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MoneyComponent {
    @Input() value: Money;
}
