import { PipeTransform, Pipe } from '@angular/core';
import { Money } from './money';
import sizeMap from './size-map';

export interface AmountPipeSettings {
    decimal: string;
    thousand: string;
}

const defaultSettings: AmountPipeSettings = {
    decimal: '.',
    thousand: ' '
};

@Pipe({ name: 'amount' })
export class AmountPipe implements PipeTransform {
    transform(money: Money, settings?: AmountPipeSettings): string {
        if (!money) return;

        settings = Object.assign({}, defaultSettings, settings || {});

        const currency = money.currency;
        const negative: boolean = money.amount < 0;
        const units = Math.abs(money.amount);
        const size = sizeMap[currency.size] || Math.pow(10, currency.size);

        const fraction = (units % size);
        const whole = (units - fraction) / size;

        const base = Math.abs(whole).toString(10);
        const mod = base.length > 3 ? base.length % 3 : 0;

        const baseStr = mod ? base.substr(0, mod) + settings.thousand : '';
        const wholeStr = base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + settings.thousand);
        const fractionStr = AmountPipe.padZeros(fraction, currency.size);

        return [
            negative ? '-' : '',
            baseStr,
            wholeStr,
            settings.decimal,
            fractionStr
        ].join('');
    }

    private static padZeros(value: number, size: number): string {
        const s = value.toString(10);
        if (s.length < size) {
            const delta = size - s.length;
            return '0'.repeat(delta) + s;
        }

        return s;
    }
}
