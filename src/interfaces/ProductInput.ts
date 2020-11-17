import { Product } from "./Product";

export interface ProductInput {
    id: number;
    product: Product;
    qtd: number;
    observation: string;
	createdAt?: Date;
	updatedAt?: Date;
}