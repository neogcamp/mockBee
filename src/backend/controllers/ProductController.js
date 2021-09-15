import { Response } from "miragejs";

export const getAllProductsHandler =  () => {
    return new Response(201, {}, { products: this.db.products });
}

export const getProductHandler =  (request) => {
    const productId = request.params.productId;
    const product = this.db.products.findBy({_id: productId});
    return new Response(201, {}, { product });
}