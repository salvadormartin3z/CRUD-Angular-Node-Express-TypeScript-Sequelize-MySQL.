import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private __productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    });
    // Poner el mismo nombre que se puso en el app-routing id
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      //Es editar
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this.__productService.getProduct(id).subscribe((data: Product) => {
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      });
    });
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    };
    this.loading = true;

    if (this.id != 0) {
      //Es editar
      product.id = this.id;
      this.__productService.updateProduct(this.id, product).subscribe(() => {
        this.loading = false;
        this.toastr.info(
          `El producto ${product.name} fue actualizado con exito`,
          `Producto actualizado`
        );
        this.router.navigate(['/']);
      });
    } else {
      // Es agregar
      this.__productService.saveProduct(product).subscribe(() => {
        this.loading = false;

        this.toastr.success(
          `El producto ${product.name} fue registrado con exito`,
          `Producto registrado`
        );
        this.router.navigate(['/']);
      });
    }
  }
}
