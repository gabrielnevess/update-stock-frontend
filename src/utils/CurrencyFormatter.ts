import currencyFormatter from "currency-formatter";

export default class CurrencyFormatter {

    public static format(value: number, code = ""): string {
        return currencyFormatter.format(value, { code: code })
    }

}