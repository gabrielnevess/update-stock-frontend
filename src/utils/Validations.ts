export default class Validations {

    public static validateCPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.trim() === " ") {
            return false;
        }
        // Elimina CPFs invalidos conhecidos
        if (cpf.length !== 11 ||
            cpf === "00000000000" ||
            cpf === "11111111111" ||
            cpf === "22222222222" ||
            cpf === "33333333333" ||
            cpf === "44444444444" ||
            cpf === "55555555555" ||
            cpf === "66666666666" ||
            cpf === "77777777777" ||
            cpf === "88888888888" ||
            cpf === "99999999999") {
            return false;
        }
        // Valida 1o digito
        let add = 0;
        for (let i = 0; i < 9; i++) {
            add += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        if (rev !== parseInt(cpf.charAt(9))) {
            return false;
        }
        // Valida 2o digito
        add = 0;
        for (let i = 0; i < 10; i++) {
            add += parseInt(cpf.charAt(i)) * (11 - i);
        }
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        if (rev !== parseInt(cpf.charAt(10))) {
            return false;
        }
        return true;
    }

    public static validateCNPJ(cnpj: string): boolean | undefined {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.trim() === '') {
            return false;
        }
        if (cnpj.length !== 14) {
            return false;
        }

        // Elimina CNPJs invalidos conhecidos
        if (cnpj === "00000000000000" ||
            cnpj === "11111111111111" ||
            cnpj === "22222222222222" ||
            cnpj === "33333333333333" ||
            cnpj === "44444444444444" ||
            cnpj === "55555555555555" ||
            cnpj === "66666666666666" ||
            cnpj === "77777777777777" ||
            cnpj === "88888888888888" ||
            cnpj === "99999999999999") {
            return false;
        }

        // Valida DVs
        let length: number = cnpj.length - 2
        let number: string = cnpj.substring(0, length);
        let digits: string = cnpj.substring(length);
        let sum = 0;
        let pos = length - 7;
        for (let i = length; i >= 1; i--) {
            sum += Number(number.charAt(length - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        let resultado: number = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (resultado !== Number(digits.charAt(0))) {
            return false;
        }

        length = length + 1;
        number = cnpj.substring(0, length);
        sum = 0;
        pos = length - 7;
        for (let i = length; i >= 1; i--) {
            sum += Number(number.charAt(length - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (resultado !== Number(digits.charAt(1))) {
            return false;
        }
        return true;
    }

}