import { Currency } from './currency';
import sizeMap from './size-map';

type MoneyOrNumber = Money | number;

export class Money {

    constructor(
        public amount: number,
        public currency: Currency) {
    }

    asNumber(): number {
        return this.amount / (sizeMap[this.currency.size] || Math.pow(10, this.currency.size));
    }

    asZero() {
        return Money.asZero(this.currency);
    }

    add(n: MoneyOrNumber) {
        return Money.add(this, n);
    }

    subtract(n: MoneyOrNumber) {
        return Money.subtract(this, n);
    }

    negate() {
        return Money.negate(this);
    }

    multiply(...multiplyers: number[]) {
        return Money.multiply(this, ...multiplyers);
    }

    divide(n: number): Money[] {
        return Money.divide(this, n);
    }

    private static round(n: number): number {
        return n > 0
            ? Math.floor(n)
            : Math.ceil(n);
    }

    static fromNumber(amount: number, currency: Currency): Money {
        const size = sizeMap[currency.size] || Math.pow(10, currency.size);
        return new Money(Money.round(amount * size), currency);
    }

    static asZero(currency: Currency): Money {
        return new Money(0, currency);
    }

    static min(...values: Money[]): Money {
        if (values == null) return null;
        if (values.length === 1) return values[0];

        let m = values[0];
        for (let i = 1; i < values.length; i++) {
            let a = values[i];
            if (a.amount < m.amount) m = a;
        }

        return m;
    }

    static max(...values: Money[]): Money {
        if (values == null) return null;
        if (values.length === 1) return values[0];

        let m = values[0];
        for (let i = 1; i < values.length; i++) {
            let a = values[i];
            if (a.amount > m.amount) m = a;
        }

        return m;
    }

    static abs({ amount, currency }: Money): Money {
        return amount >= 0
            ? new Money(amount, currency)
            : new Money(-amount, currency);
    }

    static add(...values: MoneyOrNumber[]): Money {
        if (!values || !values.length) return;

        let amount = 0;
        let currency: Currency;
        for (let value of values) {
            if (typeof value === 'number') {
                amount += <number>value;
            }
            else {
                amount += (<Money>value).amount;
                if (!currency) {
                    currency = (<Money>value).currency;
                }
            }
        }

        if (!currency) return;
        return new Money(amount, currency);
    }

    static subtract({ amount, currency }: Money, b: MoneyOrNumber): Money {
        return typeof b === 'number'
            ? new Money(amount - b, currency)
            : new Money(amount - (<Money>b).amount, currency);
    }

    static negate({ amount, currency}: Money): Money {
        return new Money(-amount, currency);
    }

    static multiply({ amount, currency}: Money, ...multiplayers: number[]): Money {
        for (let m of multiplayers) {
            amount = amount * m;
        }

        return new Money(amount, currency);
    }

    static divide({ amount, currency}: Money, value: number): Money[] {
        if (value === 0) return [ ];
        if (value === 1) return [ new Money(amount, currency) ];

        let result = new Array(value);

        if (amount === 0) {
            result = result.fill(Money.asZero(currency));
        }
        else {
            let rem = amount % value;
            let lo = new Money((amount - rem) / value, currency);
            let hi = lo.add(1);

            for (let i = 0; i < value; i++) {
                result[i] = i < rem ? hi : lo;
            }

            result.reverse();
        }

        return result;
    }
}
