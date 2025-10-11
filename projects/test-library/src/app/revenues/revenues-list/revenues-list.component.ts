import { Component } from '@angular/core';
import { RevenueService } from '../services/revenue.service';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RevenuesListStateService } from '../services/revenues-list-state.service';
import { FormGroup, FormControl } from '@angular/forms';
import { RevenuesResponse } from '../models/revenueResponse';
import { Revenue } from '../models/revenue';
import { RevenueListState } from '../services/revenueListState';
@Component({
  selector: 'app-revenues-list',
  templateUrl: './revenues-list.component.html',
  styleUrls: ['./revenues-list.component.scss']
})
export class RevenuesListComponent {




  private readonly subscriptions = new Subscription();
  constructor(
     private readonly revenueService: RevenueService
    ,private readonly router: Router ,
    private readonly stateService: RevenuesListStateService
    ) { }



    controlsForm = new FormGroup({
      rowPaginator: new FormControl<number>(50),
      dateEnd : new FormControl<string>(''),
      dateStart: new FormControl<string>('')
      });

  revenueData: RevenuesResponse | null = null;
  revenues: Revenue[] = [];
  tableRevDto: any[] = [];
  currentPages=1


  filtredData:any[]=[];
  itemsPerpage:number = 0;
  columnsHeaders = ['fecha','moneda','montoRecaudado','proveedorPago','canalPago','consolidada','nroPoliza','producto','montoPrima','broker'];
  actions = ['detail'];
  titlesMap: Map<string,string>|undefined;

  currentStart:string=''
  maxStart:string = this.formatDate(new  Date())
  maxEnd : string=''
  minEnd : string =''
  currentEnd:string=''




  ngOnInit(): void {

      console.log('RevenueListComponent init ');
 

      console.log(this.formatDate(new Date()))
      this.itemsPerpage=50
      var now = new Date()
      now.setMonth(new Date().getMonth()-1)
      this.currentStart = this.formatDate(now)
      this.loadTitleMap();
      this.loadControlsSubscriptions()
      this.loadRevenues()

      
  }


  loadPreviusState(stateSaved : RevenueListState){


        this.itemsPerpage=stateSaved.itemsXPage
        this.controlsForm.controls.rowPaginator.setValue(this.itemsPerpage)
        this.currentStart=stateSaved.startFilterValue
        this.controlsForm.controls.dateStart.setValue(this.currentStart)
        this.currentEnd=stateSaved.endFilterValue
        this.controlsForm.controls.dateEnd.setValue(this.currentEnd)
        this.currentPages=stateSaved.currentPage
        this.onApplyFilter(this.currentPages)

            setTimeout(() => {
              window.scrollTo(0, stateSaved.scrollPosition);
             }, 100);
      
      
  }

  loadControlsSubscriptions() {
      const rowPaginatorSubscription = this.controlsForm.controls.rowPaginator.valueChanges.subscribe({
        next: (n) => {
          if(n){
            this.itemsPerpage = Number(n);
            this.loadTable(1); 
            this.currentPages = 1;
          }
        }   
      });
      this.subscriptions.add(rowPaginatorSubscription);

}
  onEndDateChange(endDate: any) {

      const target = endDate.target as HTMLInputElement;
        
        
        // Convertir a Date
        const date = new Date(target.value);
        this.currentEnd=this.formatDate(date)
      

        const endMinus3Months = new Date(date);
        endMinus3Months.setMonth(endMinus3Months.getMonth() - 3);
        
        var endDate1DayLess = new Date()
        endDate1DayLess.setDate(endDate1DayLess.getDate() - 1)
        this.maxStart = this.formatDate(endDate1DayLess)
}

    onStartDatechange(startDate1: any) {

        console.log(startDate1)
        const target = startDate1.target as HTMLInputElement;
        
        console.log(target.value);  
  
        // Convertir a Date
        const date = target.value

        this.currentStart= this.formatDate(date)

        const startPlus3Months = new Date(date);
        startPlus3Months.setMonth(startPlus3Months.getMonth() + 3);
        
        const startDatePlus1day =new Date(this.currentStart)
        startDatePlus1day.setDate(startDatePlus1day.getDate() + 1)
        this.minEnd =this.formatDate(startDatePlus1day)

        const now = new Date();


        if(startPlus3Months>now){
          this.maxEnd=this.formatDate(now)
        }
        else{
            this.maxEnd=this.formatDate(startPlus3Months)
        }
        console.log(this.maxEnd)
        
        if(new Date(this.currentEnd)<new Date(this.currentStart)){
          this.currentEnd = ''
          this.controlsForm.controls.dateEnd.setValue('')
        }  
   }


    onApplyFilter(page:number) {
      console.log("apply filter page "+page )

        if (!this.currentStart || !this.currentEnd) return;

          const from = new Date(this.currentStart);
          const to = new Date(this.currentEnd);
          to.setHours(23, 59, 59, 999);

          this.revenueService.getRevenues().pipe(
            map(response => {
              this.revenueData = response;
              return this.revenueData.content.filter(x => {
                const saleDate = new Date(x.revenueDate);
                return saleDate >= from && saleDate <= to;
              });
            })
          ).subscribe(filtered => {
            this.revenues = filtered;
            this.loadTable(page);
          });
    }

    onClickFiltredSearch() {
      this.onApplyFilter(1)
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
          this.router.navigate(['revenues-detail',id]);
    }
  }
  onSelectedItems(items: any[]) {
    console.log('Selected', items);
  }

  loadRevenues(): void {
   var getRevenuesSub= this.revenueService.getRevenues().subscribe({
      next: (response: RevenuesResponse) => {
        this.revenueData = response;
        this.revenues= this.revenueData.content
         // transformando el contenido para que matcheen con las columnas de la tabla
         // (lo pide el componente table) , posicionandonos en la pagina 1
        this.loadTable(1)
      const stateSaved = this.stateService.getState()
      if(stateSaved){
        this.loadPreviusState(stateSaved)}
      },
      error: (error) => {
        console.error('Error al cargar las recaudaciones:', error);
      }
    });
    this.subscriptions.add(getRevenuesSub)
  }

  loadTable(pagina:number) {
    console.log("pagina:"+pagina)
    console.log("itms x pag : "+this.itemsPerpage)

        const itemsPerPage =Number(this.itemsPerpage)
        const startIndex = (pagina-1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        console.log("start :"+startIndex)
        console.log("end :"+endIndex)
        const filteredRevenues = [...this.revenues.slice(startIndex, endIndex)]
        console.log(this.revenues)
        console.log(filteredRevenues)
        this.tableRevDto = [...filteredRevenues.map((item, index) => ({
          id: item.id,
          fecha: this.formatDate2(item.revenueDate),
          moneda:item.currency,
          montoRecaudado: item.revenueAmount,
          proveedorPago:item.paymentProvider,
          canalPago:item.paymentChannel,
          consolidada: item.isConsolidated ? 'SI':'NO',
          nroPoliza: item.policyNumber,
          producto: item.productName,
          montoPrima:item.premiumAmount,
          broker:item.brokerName,
          realSale: item
        }))];

        console.log(this.tableRevDto)
  }

  onPageChange(pageNumber: number): void {
    this.currentPages=pageNumber
    this.loadTable(pageNumber);
  }

  onVolver() {
  }


  loadTitleMap(){
   this.titlesMap = new Map<string, string>([
    ['fecha', 'Fecha'],
    ['moneda', 'Moneda'],
    ['montoRecaudado', 'Monto Recaudado'],
    ['proveedorPago', 'Proveedor Pago'],
    ['canalPago', 'Canal Pago'],
    ['consolidada', 'Consolidada'],
    ['nroPoliza', 'Nro Póliza'],
    ['producto', 'Producto'],
    ['montoPrima', 'Monto Prima'],
    ['broker', 'Broker'],
  ]);
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
      const state: RevenueListState={
          scrollPosition:window.scrollY,
          startFilterValue: this.currentStart,
          endFilterValue: this.currentEnd,
          currentPage:this.currentPages,
          itemsXPage:this.itemsPerpage
        }
      this.stateService.saveState(state)

  }
}





