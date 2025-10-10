import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Sale } from '../models/sale';
import { SalesResponse } from '../models/salesResponse';
import { SalesService } from '../services/sales.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SaleListState } from '../services/saleListState';
import { SalesListStateService } from '../services/sales-list-state.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit , OnDestroy {




  private readonly subscriptions = new Subscription();
  constructor(
     private readonly salesService: SalesService
    ,private readonly router: Router ,
    private readonly stateService: SalesListStateService
    ) { }



    controlsForm = new FormGroup({
      rowPaginator: new FormControl<number>(50),
      dateEnd : new FormControl<string>(''),
      dateStart: new FormControl<string>('')
      });

  salesData: SalesResponse | null = null;
  sales: Sale[] = [];
  tableSalesDto: any[] = [];
  currentPages=1


  filtredData:any[]=[];
  itemsPerpage:number = 0;
  columnsHeaders = ['fila','fecha','producto','broker','cliente','montoPoliza'];
  actions = ['detail'];
  titlesMap: Map<string,string>|undefined;

  currentStart:string=''
  maxStart:string = this.formatDate(new  Date())
  maxEnd : string=''
  minEnd : string =''
  currentEnd:string=''




  ngOnInit(): void {

      console.log('SalesListComponent Init');
 

      console.log(this.formatDate(new Date()))
      this.itemsPerpage=50
      var now = new Date()
      now.setMonth(new Date().getMonth()-1)
      this.currentStart = this.formatDate(now)
      this.loadTitleMap();
      this.loadControlsSubscriptions()
      this.loadSales()

      
  }


  loadPreviusState(stateSaved : SaleListState){


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

          this.salesService.getSales().pipe(
            map(response => {
              this.salesData = response;
              return this.salesData.content.filter(x => {
                const saleDate = new Date(x.saleDate);
                return saleDate >= from && saleDate <= to;
              });
            })
          ).subscribe(filtered => {
            this.sales = filtered;
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
          this.router.navigate(['sales-detail',id]);
    }
  }
  onSelectedItems(items: any[]) {
    console.log('Selected', items);
  }

  loadSales(): void {
   var getSalesSub= this.salesService.getSales().subscribe({
      next: (response: SalesResponse) => {
        this.salesData = response;
        this.sales= this.salesData.content
         // transformando el contenido para que matcheen con las columnas de la tabla
         // (lo pide el componente table) , posicionandonos en la pagina 1
        this.loadTable(1)
      const stateSaved = this.stateService.getState()
      if(stateSaved){
        this.loadPreviusState(stateSaved)}
      },
      error: (error) => {
        console.error('Error al cargar ventas:', error);
      }
    });
    this.subscriptions.add(getSalesSub)
  }

  loadTable(pagina:number) {
    console.log("pagina:"+pagina)
    console.log("itms x pag : "+this.itemsPerpage)

        const itemsPerPage =Number(this.itemsPerpage)
        const startIndex = (pagina-1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        console.log("start :"+startIndex)
        console.log("end :"+endIndex)
        const filteredSales = [...this.sales.slice(startIndex, endIndex)]
        console.log(this.sales)
        console.log(filteredSales)
        this.tableSalesDto = [...filteredSales.map((item, index) => ({
          id: item.id,
          fila: startIndex+index + 1, 
          fecha: this.formatDate2(item.saleDate),
          producto: item.productName,
          broker: item.brokerName,
          cliente: item.customerName,
          montoPoliza: item.policyAmount,
          realSale: item
        }))];

        console.log(this.tableSalesDto)
  }

  onPageChange(pageNumber: number): void {
    this.currentPages=pageNumber
    this.loadTable(pageNumber);
  }

  onVolver() {
  }


  loadTitleMap(){
      this.titlesMap = new Map<string,string>([
      ['fila', 'Fila'],
      ['fecha', 'Fecha'],
      ['producto', 'Producto'],
      ['broker', 'Broker'],
      ['cliente', 'Cliente'],
      ['montoPoliza', 'Monto Póliza'],
      ['', 'Acciones']// hara falta usar translate
    ]);
  }

  formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      return date;
    }
    return date.toISOString().split('T')[0];
  }

    formatDate2(date: string | Date): string {
    if (typeof date === 'string') {
      return date.replace('T', ' ');
    }
    const iso = date.toISOString();
    return iso.replace('T', ' ');
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
      const state: SaleListState={
          scrollPosition:window.scrollY,
          startFilterValue: this.currentStart,
          endFilterValue: this.currentEnd,
          currentPage:this.currentPages,
          itemsXPage:this.itemsPerpage
        }
      this.stateService.saveState(state)

  }
}


