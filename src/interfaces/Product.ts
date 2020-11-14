import { Brand } from "./Brand";
import { MeasurementUnit } from "./MeasurementUnit";

export interface Product {
	id: number;
	brand: Brand;
	measurementUnit: MeasurementUnit;
	name: string;
	model: string;
	serial: string;
	createdAt?: Date;
	updatedAt?: Date;
}