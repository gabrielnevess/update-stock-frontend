import { Product } from "./Product";

export interface Stock {
    id: number;
    product: Product;
	qtd: number;
	createdAt?: Date;
	updatedAt?: Date;
}