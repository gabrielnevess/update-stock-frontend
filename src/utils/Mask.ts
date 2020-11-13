export default class Mask {

    public static maskCpf(value: string): string {
        value = value.replace(/[^\d]/g, "");
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    public static maskCep(value: string): string {
        value = value.replace(/\D/g, "");
        return value.replace(/(\d{5})(\d{3})/, "$1-$2");
    }

    public static maskCellphone(value: string): string {
        value = value.replace(/\D/g, "");
        return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    public static maskPhone(value: string): string {
        value = value.replace(/\D/g, "");
        return value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    public static removeMask(value: string): string {
        value = value.replace(/[^\d]/g, "");
        return value;
    }

}