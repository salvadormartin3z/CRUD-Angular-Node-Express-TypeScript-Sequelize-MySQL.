import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent {
  listProducts: Product[] = [];
  loading: boolean = false;

  // Los servicios empiezan con _
  constructor(
    private _productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;
    this._productService.getListProducts().subscribe((data: Product[]) => {
      this.listProducts = data;
      this.loading = false;
    });
  }

  deleteProduct(id: number) {
    this.loading = true;
    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning(
        'El producto fue eliminado con exito',
        'Producto eliminado'
      );
    });
  }
}
