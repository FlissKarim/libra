import * as crypto from 'crypto';

export function isWritable<T extends Object>(o: T, p: keyof T) {
    const desc = Object.getOwnPropertyDescriptor(o, p) || {}
    return Boolean(desc.writable);
}

export function parseCSV(str: string) {
    const arr = [];
    let quote = false;
    for (let row = 0, col = 0, c = 0; c < str.length; c++) {
        let cc = str[c], nc = str[c + 1];
        arr[row] = arr[row] || [];
        arr[row][col] = arr[row][col] || '';
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }
        if (cc == '"') { quote = !quote; continue; }
        if (cc == ',' && !quote) { ++col; continue; }
        if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }
        if (cc == '\r' && !quote) { ++row; col = 0; continue; }
        arr[row][col] += cc;
    }
    return arr;
}

export function crypt(password: string, salt: string): string {
    return crypto
        .createHmac('sha512', salt)
        .update(password)
        .digest('hex');
}

export function convert(type: any, value: number | string): any {
    switch (type) {
        case undefined:
            value = null;
            break;
        case Boolean:
            value = type([1, '1', 'true'].includes(value));
            break;
        case Number:
        case String:
            value = type(value);
            break;
        default:
            value = new type(value);
            break;
    }
    return value;
}