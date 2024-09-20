import { User } from "./user.types";

export interface Cart {
    id: string;
    items: CartItem[];
}

export interface CartItem {
    id: string;
    // product: Product;
    quantity: number;
}