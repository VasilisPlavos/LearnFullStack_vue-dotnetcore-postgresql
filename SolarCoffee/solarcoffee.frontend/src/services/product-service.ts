import axios from 'axios';
import {IProduct} from '@/types/Product';

// Product Service.
// Provides UI business logic associated with products.

export class ProductService {
    API_URL = process.env.VUE_APP_API_URL;

    async archive(productId: number){
        console.log(`delete ${this.API_URL}/product/${productId}`);
        let result:any = await axios.patch(`${this.API_URL}/product/${productId}`);
        return result.data;
    }

    async save(newProduct: IProduct) {
        let result:any = await axios.post(`${this.API_URL}/product/`, newProduct);
        return result.data;
    }
}