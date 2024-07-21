import { Component, OnInit } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Product } from '../../interfaces/Product';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  productsList: Product[] = [];

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.loadProducts();
    console.log(this.productsList);
  }

  addProduct() {
    Swal.fire({
      title: "Add a Product",
      icon: "info",
      html: `<form class="flex justify-center flex-col gap-4">
                    <div class="form-group">
                      <input id="input-name" type="text" class="p-2 border border-gray-300 rounded" placeholder="Product Name" style="margin-bottom: 1em;">
                      <input id="input-amount" type="text" class="p-2 border border-gray-300 rounded" placeholder="Amount">
                    </div>
                    <div class="form-group">
                      <input id="input-category" type="text" class="p-2 border border-gray-300 rounded" placeholder="Category" style="margin-bottom: 1em;">
                      <input id="input-price" type="text" class="p-2 border border-gray-300 rounded" placeholder="Price">
                    </div>
                  </form>
                  `,
      confirmButtonText: "Save",
      confirmButtonColor: "#0b0b52",
       preConfirm: () => {
        const name = (document.getElementById('input-name') as HTMLInputElement).value;
        const amount = parseInt((document.getElementById('input-amount') as HTMLInputElement).value);
        const category = (document.getElementById('input-category') as HTMLInputElement).value;
        const price = parseInt((document.getElementById('input-price') as HTMLInputElement).value);

        if (!name || !amount || !category || !price) {
          Swal.showValidationMessage("Todos os campos são obrigatórios!");
        };

        const product = {
          id: uuidv4(),
          productName: name,
          amount: amount,
          category: category,
          price: price
        };

        this.localStorage.addItem(product);
        this.loadProducts();
      }
    })
  }

  editProduct(id: string, product: Product): void {

    Swal.fire({
      title: "Add a Product",
      icon: "info",
      html: `<form class="flex justify-center flex-col gap-4">
                    <div class="form-group">
                      <input id="input-name" type="text" class="p-2 border border-gray-300 rounded" placeholder="Product Name" style="margin-bottom: 1em;" value="${product.productName}">
                      <input id="input-amount" type="text" class="p-2 border border-gray-300 rounded" placeholder="Amount" value="${product.amount}">
                    </div>
                    <div class="form-group">
                      <input id="input-category" type="text" class="p-2 border border-gray-300 rounded" placeholder="Category" style="margin-bottom: 1em;" value="${product.category}">
                      <input id="input-price" type="text" class="p-2 border border-gray-300 rounded" placeholder="Price" value="${product.price}">
                    </div>
                  </form>
                  `,
      confirmButtonText: "Save",
      confirmButtonColor: "#0b0b52",
       preConfirm: () => {
        const name = (document.getElementById('input-name') as HTMLInputElement).value;
        const amount = parseInt((document.getElementById('input-amount') as HTMLInputElement).value);
        const category = (document.getElementById('input-category') as HTMLInputElement).value;
        const price = parseInt((document.getElementById('input-price') as HTMLInputElement).value);

        if (!name || !amount || !category || !price) {
          Swal.showValidationMessage("Todos os campos são obrigatórios!");
        };

        const product = {
          id: id,
          productName: name,
          amount: amount,
          category: category,
          price: price
        };

        const key = `product_${id}`;
        this.localStorage.set(key, product);
        this.loadProducts();
      }
    })
  }

  removeProduct(id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to remove this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5c5cda",
      cancelButtonColor: "#d33000",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        const key =`product_${id}`;
        this.localStorage.remove(key);
        this.loadProducts();
        Swal.fire({
          title: "Product deleted!",
          text: `The product was succesfully deleted`,
          icon: "success"
        });
      }
    });
  }

  loadProducts(): void {
    this.productsList = this.localStorage.getAll();
  }

}

