export interface RestError {
    field: string;
    timestamp: Date;
    message: string;
    details: string;
}