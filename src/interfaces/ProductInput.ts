export interface ProductInput {
    id: number;
    productId: number;
    qtd: number;
    observation: string;
	createdAt?: Date;
	updatedAt?: Date;
}