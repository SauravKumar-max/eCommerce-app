import { Product } from "../context/context.types";

export type Wishlist = {
    userWishlist: Product[];
}

export type Cart = {
    userCart: Product[]
}

export type User = {
    email: string;
    name: string;
    address: Address[]
}

export type Address = {
    _id: string;
    name: string;
    phone: string;
    pincode: string;
    street: string;
    locality: string;
    city: string;
    state: string;
}

export type CarouselContent = {
    image: string;
}
