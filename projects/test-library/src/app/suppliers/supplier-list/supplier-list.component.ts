import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableEvent } from 'projects/base/src/shared/components/table/Itable';
import { Subscription } from 'rxjs';
import { SupplierService } from './services/supplier.service';
import { PaymentMethod, PaymentMethodResponse } from './models/paymenMethod';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent {

  private readonly subscriptions = new Subscription();
  titlesMap: Map<string, string>=  new Map<string, string>([
    ['logo', 'Logo'],
    ['name', 'Nombre'],
    ['chanelPaymment', 'Canal'],
    ['active', 'Activo'],
    ['description', 'Descripción']

  ]);
  constructor(
     private readonly supplierService: SupplierService
    ,private readonly router: Router ,
    ) { }


  tableDto: any;
  suppliersData: PaymentMethodResponse | null = null;
  suppliers: PaymentMethod[] = [];

  columnsHeaders = ['logo','name','chanelPaymment','active','description'];
  actions = ['detail'];


  ngOnInit(): void {
      console.log('RevenueListComponent init ');
      console.log(this.formatDate(new Date()))
      this.loadSuppliers()
      
  }

  isValidDate(date: Date|string|null): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  onTableAction(event: { event: string; dataField?: any }) {
    console.log('Action', event);
    console.log('Fila afectada:', event.dataField);
    const id = event.dataField?.realSale.id
    console.log(id)
    if (event.event === 'detail') {
         // this.router.navigate(['supplier-detail',id]);
    }
  }
  onSelectedItems(items: any[]) {
    console.log('Selected', items);
  }

  loadSuppliers(): void {
   var getsupplierSub= this.supplierService.getPaymentMethods().subscribe({
      next: (response: PaymentMethodResponse) => {
        console.log(response)
        this.suppliersData = response;
        this.suppliers= this.suppliersData.content
        this.loadTable();
      }
      ,
      error: (error) => {
        console.error('Error al cargar las recaudaciones:', error);
      }
    });
    this.subscriptions.add(getsupplierSub)
  }

  loadTable() {
   
        this.tableDto = [...this.suppliers.map((item, index) => ({
    
          logo:   index === 0
                ? 'https://cdn.brandfetch.io/id4J-eZGRh/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1753066547229'
                : index === 1
                ? 'https://seeklogo.com/images/B/banco-de-la-nacion-argentina-logo-F9D4809C60-seeklogo.com.png'
                : index===2
                ? 'https://www.galicia.ar/content/dam/galicia/banco-galicia/personas/promociones/combustible/logo-galicia.jpg'
                : item.logoUrl,
          name: item.name,
          chanelPaymment:item.paymentChannels,
          active: item.isActive? 'SI':'NO',
          description:item.description,
          realItem: item
        }))];

        console.log(this.tableDto)
  }
 

  formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      return date;
    }
    return date.toISOString().split('T')[0];
  }

  formatDate2(date: string | Date): string {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
 
  }

}
