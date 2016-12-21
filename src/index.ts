export * from './money';
export * from './currency';
export * from './money.component';
export * from './amount.pipe';
export * from './currencyIcon.pipe';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyComponent } from './money.component';
import { AmountPipe } from './amount.pipe';
import { CurrencySymbplPipe } from './currencyIcon.pipe';

const DECLARATIONS = [
    MoneyComponent,
    AmountPipe,
    CurrencySymbplPipe
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DECLARATIONS
    ],
    exports: [
        DECLARATIONS
    ]
})
export class MoneyModule {

}
