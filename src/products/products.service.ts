import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Array<Product> = [];

  insertProduct(title: string, description: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(productId: string) {
    const [product] = this.findProdut(productId);
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProdut(productId);
    this.products[index] = {
      ...product,
      title: title || product.title,
      description: description || product.description,
      price: price || product.price,
    };
  }

  deleteProduct(prodId: string) {
    const [product, index] = this.findProdut(prodId);
    this.products.splice(index, 1);
  }

  //

  private findProdut(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, productIndex];
  }
}
