import { PipeTransform, Pipe } from '@angular/core';
import { Currency, EUR, USD } from './currency';

const symbolMap = {
    'ALL': 'Lek',
    'AFN': '؋',
    'ARS': '$',
    'AWG': 'ƒ',
    'AUD': '$',
    'AZN': 'ман',
    'BSD': '$',
    'BBD': '$',
    'BYN': 'Br',
    'BZD': 'BZ$',
    'BMD': '$',
    'BOB': '$b',
    'BAM': 'KM',
    'BWP': 'P',
    'BGN': 'лв',
    'BRL': 'R$',
    'BND': '$',
    'KHR': '៛',
    'CAD': '$',
    'KYD': '$',
    'CLP': '$',
    'CNY': '¥',
    'COP': '$',
    'CRC': '₡',
    'HRK': 'kn',
    'CUP': '₱',
    'CZK': 'Kč',
    'DKK': 'kr',
    'DOP': 'RD$',
    'XCD': '$',
    'EGP': '£',
    'SVC': '$',
    'FKP': '£',
    'FJD': '$',
    'GHS': '¢',
    'GIP': '£',
    'GTQ': 'Q',
    'GGP': '£',
    'GYD': '$',
    'HNL': 'L',
    'HKD': '$',
    'HUF': 'Ft',
    'ISK': 'kr',
    'IDR': 'Rp',
    'IRR': '﷼',
    'IMP': '£',
    'ILS': '₪',
    'JMD': 'J$',
    'JPY': '¥',
    'JEP': '£',
    'KZT': 'лв',
    'KGS': 'лв',
    'LAK': '₭',
    'LBP': '£',
    'LRD': '$',
    'MKD': 'ден',
    'MYR': 'RM',
    'MUR': '₨',
    'MXN': '$',
    'MNT': '₮',
    'MZN': 'MT',
    'NAD': '$',
    'NPR': '₨',
    'ANG': 'ƒ',
    'NZD': '$',
    'NIO': 'C$',
    'NGN': '₦',
    'KPW': '₩',
    'NOK': 'kr',
    'OMR': '﷼',
    'PKR': '₨',
    'PAB': 'B/.',
    'PYG': 'Gs',
    'PEN': 'S/.',
    'PHP': '₱',
    'PLN': 'zł',
    'QAR': '﷼',
    'RON': 'lei',
    'RUB': '₽',
    'SHP': '£',
    'SAR': '﷼',
    'RSD': 'Дин.',
    'SCR': '₨',
    'SGD': '$',
    'SBD': '$',
    'SOS': 'S',
    'ZAR': 'R',
    'KRW': '₩',
    'LKR': '₨',
    'SEK': 'kr',
    'CHF': 'CHF',
    'SRD': '$',
    'SYP': '£',
    'TWD': 'NT$',
    'THB': '฿',
    'TTD': 'TT$',
    'TVD': '$',
    'UAH': '₴',
    'GBP': '£',
    'UYU': '$U',
    'UZS': 'лв',
    'VEF': 'Bs',
    'VND': '₫',
    'YER': '﷼',
    'ZWD': 'Z$'
};
symbolMap[EUR.code] = '€';
symbolMap[USD.code] = '$';

@Pipe({ name: 'currencySymbol' })
export class CurrencySymbplPipe implements PipeTransform {
    transform(currency: Currency): any {
        if (!currency) return;

        const symb = symbolMap[currency.code];
        if (symb) return symb;

        return currency.code;
    }
}


