import { Product } from './product';

export class Order {
    id: string;

    name: string;

    email: string;

    phone: string;

    orderDate: string;

    totalQuantity: number;

    totalOrder: number;

    products: Product[];
}
