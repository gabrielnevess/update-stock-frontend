import { Product } from "./Product";

export interface ProductOutput {
    id: number;
    product: Product;
    qtd: number;
    observation: string;
	createdAt?: Date;
	updatedAt?: Date;
}