import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SalesType } from '../models/e-commerce/sales-type';
import { ProductsType } from '../models/inventory-app/products-type';
import { InventoryAppService } from '../services/inventory-app.service';
import { ECommerceService } from '../services/ecommerce.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public eCommerceSales: SalesType[] = [];
  public inventoryAppProducts: ProductsType[] = [];
  public value: string = 'Basic Tee';
  public value1: string = '2';
  public value2: string = '15.99';
  public value3: string = '99';
  public value4: string = 'M050';

  constructor(
    private eCommerceService: ECommerceService,
    private inventoryAppService: InventoryAppService,
  ) {}

  ngOnInit() {
    this.eCommerceService.getSalesList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.eCommerceSales = data,
      error: (_err: any) => this.eCommerceSales = []
    });
    this.inventoryAppService.getProductsList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.inventoryAppProducts = data,
      error: (_err: any) => this.inventoryAppProducts = []
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
