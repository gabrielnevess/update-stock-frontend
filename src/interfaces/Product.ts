export interface Product {
	id: number;
	brandId: number;
	measurementUnitId: number;
	stateId: number;
	name: string;
	model: string;
	serial: string;
	createdAt?: Date;
	updatedAt?: Date;
}