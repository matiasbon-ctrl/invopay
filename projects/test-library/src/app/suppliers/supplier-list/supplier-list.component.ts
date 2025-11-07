import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TableEvent } from 'projects/base/src/shared/components/table/Itable';
import { Subscription } from 'rxjs';
import { SupplierService } from './services/supplier.service';
import { PaymentMethod, PaymentMethodResponse } from './models/paymenMethod';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent {
  /*
ajustarTamano($event: Event) {
   const img = $event.target as HTMLImageElement | null; // ✅ Usar $event, no event
  if (!img) return;
  if (img.naturalWidth > 200) {
    img.style.width = '60px';
  } else if (img.naturalWidth > 100) {
    img.style.width = '80px';
  } else {
    img.style.width = '150px';
  }
}*/

  isMobile:boolean= false;
  private readonly subscriptions = new Subscription();
  titlesMap: Map<string, string>=  new Map<string, string>([]);
  constructor(
     private readonly supplierService: SupplierService,
     private readonly router: Router ,
     private readonly translate : TranslateService
    ) { }


  tableDto: any;
  suppliersData: PaymentMethodResponse | null = null;
  suppliers: PaymentMethod[] = [];

  columnsHeaders = ['logo','name','chanelPaymment','active','description'];
  actions = ['detail'];


  ngOnInit(): void {
      console.log('RevenueListComponent init ');
      console.log(this.formatDate(new Date()))
      this.loadTitleMap()
      this.checkScreenSize()
      this.loadSuppliers()
      
  }
    loadTitleMap() {
          const subsTitles = this.translate.get([
            'IP.NEW-PROVIDER.LOGO',
            'IP.RENDITION-DETAILS.NAME',
            'NEW_VAR.PAYMEN_CHANNEL',
            'IP.ASSIGN-PROJECTS.ACTIVE',
            'IP.COST_CENTER.DESCRIPTION',
          ]).subscribe(translations => {
            this.titlesMap = new Map<string, string>([
              ['logo', translations['IP.NEW-PROVIDER.LOGO']],
              ['name', translations['IP.RENDITION-DETAILS.NAME']],
              ['chanelPaymment', translations['NEW_VAR.PAYMEN_CHANNEL']],
              ['active', translations['IP.ASSIGN-PROJECTS.ACTIVE']],
              ['description', translations['IP.COST_CENTER.DESCRIPTION']],
            ]);
          });
          this.subscriptions.add(subsTitles);
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
          logo:item.logoUrl,
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

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
    this.checkScreenSize();
    }
      
    private checkScreenSize() {
      this.isMobile = window.innerWidth <= 768;

    }

  toggleMobileMenu(index: number) {
    if (this.showMobileMenuIndex === index) {
     this.showMobileMenuIndex = null; 
    }else{
     this.showMobileMenuIndex = index; 
    }  
  }
  showMobileMenuIndex: any;
  onMobileMenuAction(arg0: string,_t22: any) {
  throw new Error('Method not implemented.');
  }

}
