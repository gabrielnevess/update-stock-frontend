import { Product } from "./Product";
import { User } from "./User";

export interface ProductOutput {
    id: number;
    product: Product;
    user: User;
    qtd: number;
    observation: string;
	createdAt?: Date;
	updatedAt?: Date;
}