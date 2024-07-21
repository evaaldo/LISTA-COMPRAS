import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  private isProduct(item: any): item is Product {
    return 'id' in item && 'productName' in item && 'amount' in item && 'category' in item && 'price' in item;
  }

  getAll(): Product[] {
    const items: Product[] = [];
    if (this.storage) {
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i);
        if (key) {
          const item = this.storage.getItem(key);
          if (item) {
            try {
              const parsedItem = JSON.parse(item);
              if (this.isProduct(parsedItem)) {
                items.push(parsedItem);
              }
            } catch (error) {
              console.error(`Error parsing item with key ${key}:`, error);
            }
          }
        }
      }
    }
    return items;
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (this.storage) {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  addItem(product: Product): boolean {
    if (this.storage) {
      const key = `product_${product.id}`;
      this.storage.setItem(key, JSON.stringify(product));
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
