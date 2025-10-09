import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sale } from '../models/sales';
import { SalesResponse } from '../models/salesResponse';
import { SalesService } from '../services/sales.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit , OnDestroy {



  private readonly subscriptions = new Subscription();
  constructor(
     private readonly salesService: SalesService
    ,private readonly router: Router 
    ,private readonly cdr :ChangeDetectorRef) { }



    controlsForm = new FormGroup({
      rowPaginator: new FormControl<number>(50),
      dateEnd : new FormControl<string>('')
      });

  salesData: SalesResponse | null = null;
  sales: Sale[] = [];
  tableSalesDto: any[] = [];
  currentPages=1


  filtredData:any[]=[];
  itemsPerpage:number = 0;
  columnsHeaders = ['fila','fecha','producto','broker','cliente','montoPoliza'];
  actions = ['view'];
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
      this.loadSales();
      this.loadControlsSubscriptions()
      
  }

  loadControlsSubscriptions() {
      const rowPaginatorSubscription = this.controlsForm.controls.rowPaginator.valueChanges.subscribe({
        next: (n) => {
          if(n){
            console.log("loadControlsSubscriptions" + n);
            this.itemsPerpage = Number(n);
            this.loadTable(1); 
            this.currentPages = 1;
          }
        }   
      });
      this.subscriptions.add(rowPaginatorSubscription);

}
  onEndDateChange(endDate: any) {
       console.log(endDate)

      const target = endDate.target as HTMLInputElement;
        
        // El valor viene como string en formato ISO
        console.log(target.value);  // "2025-10-09" o "2025-10-09T14:30"
        
        // Convertir a Date
        const date = new Date(target.value);
        this.currentEnd=this.formatDate(date)
      
        console.log(this.currentEnd);

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
        console.log(date);  // Date object

        this.currentStart= this.formatDate(date)

        const startPlus3Months = new Date(date);
        startPlus3Months.setMonth(startPlus3Months.getMonth() + 3);
        
        const startDatePlus1day =new Date(this.currentStart)
        startDatePlus1day.setDate(startDatePlus1day.getDate() + 1)
        console.log(this.formatDate(startDatePlus1day))
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


  onApplyFilter(){

    this.sales.filter(x=>{
    })


  }

isValidDate(date: Date|string|null): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}


  onTableAction(event: { event: string; dataField?: any }) {
    console.log('Action', event);
    console.log('Fila afectada:', event.dataField);
    if (event.event === 'VIEW') {
      // redireccionar toggle para detailsales
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
          // Forzar nueva referencia con spread operator
        this.tableSalesDto = [...filteredSales.map((item, index) => ({
          id: item.id,
          fila: startIndex+index + 1, 
          fecha: this.formatDate(item.saleDate),
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
  console
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

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }


  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}


