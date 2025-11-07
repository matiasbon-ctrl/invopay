import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { AssuranceNotificationService } from '../services/assurance-notification.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // ← Agregar FormsModule

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent {
selectedNotification: any;

saveModalActionsData() {
throw new Error('Method not implemented.');
}
isModalActionsOpen: boolean=false;
  modalActionData = {
    entity: '',
    costCenter: '',
    responded: ''
  };
  
  
  closeModalActions() {
    this.isModalActionsOpen=false
  }
 constructor(
      private readonly notificationService: AssuranceNotificationService,
      private readonly router: Router ,
      private translate: TranslateService   
     ) { }

    isMobile: boolean=false;
    showMobileMenuIndex: number|null=null;
    isModalOpen = false; 

  private readonly subscriptions = new Subscription();


  controlsForm = new FormGroup({
    rowPaginator: new FormControl<number>(50),
    dateEnd : new FormControl<string>(''),
    dateStart: new FormControl<string>(''),
    chanelPayment: new FormControl<string>('')
    });

  revenueData: any | null = null;
  revenues: any[] = [];
  tableDto: any[] = [];
  currentPages=1


  filtredData:any[]=[];
  itemsPerpage:number = 1;
  columnsHeaders = ['fecha','entidad','nombre','consulta','respondida'];
  actions = ['detail','reply'];
  titlesMap: Map<string,string>|undefined;

  currentStart:string=''
  maxStart:string = this.formatDate(new  Date())
  maxEnd : string=''
  minEnd : string =''
  currentEnd:string=''
  currentPayChannel =''

  paymentChannels = [
  { label: 'Transferencia', value: 'transferencia' },
  { label: 'Efectivo', value: 'efectivo' },
  { label: 'Tarjeta', value: 'tarjeta' },
  ];
     states = [
  { label: 'Si', value: 'Si' },
  { label: 'No', value: 'No' },
  ];


  ngOnInit(): void {

      console.log('NotifListComponent init ');
      console.log(this.formatDate(new Date()))
      this.loadAuxArrays()
      this.checkScreenSize()
      this.loadTitleMap();
      this.loadControlsSubscriptions()
      this.loadNotif()
  }
  loadAuxArrays() {
      this.columnsHeaders = ['fecha','entidad','nombre','consulta','respondida'];
      this.actions = ['detail','comment'];
      this.paymentChannels = [
          { label: 'Transferencia', value: 'transferencia' },
          { label: 'Efectivo', value: 'efectivo' },
          { label: 'Tarjeta', value: 'tarjeta' },
          ];
      this.states = [
          { label: 'Si', value: 'Si' },
          { label: 'No', value: 'No' },
          ];
  }

      /*
  loadPreviusState(stateSaved : RevenueListState){
        this.itemsPerpage=stateSaved.itemsXPage
        this.controlsForm.controls.rowPaginator.setValue(this.itemsPerpage)
        this.currentStart=stateSaved.startFilterValue
        this.controlsForm.controls.dateStart.setValue(this.currentStart)
        this.currentEnd=stateSaved.endFilterValue
        this.controlsForm.controls.dateEnd.setValue(this.currentEnd)
        this.currentPages=stateSaved.currentPage
        this.currentPayChannel= stateSaved.chanelPaymentFilterValue
        this.controlsForm.controls.chanelPayment.setValue(this.currentPayChannel)
        this.onApplyFilter(this.currentPages)

            setTimeout(() => {
              window.scrollTo(0, stateSaved.scrollPosition);
              }, 100);
  }
              */

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
    const channelPaymentSubscription =this.controlsForm.controls.chanelPayment.valueChanges.subscribe({
            next: (n) => {
          if(n){
            this.currentPayChannel = this.paymentChannels.find(pc => pc.value === n)?.value||'';
            this.loadTable(1); 
            this.currentPages = 1;
          }
        } 
    })
    this.subscriptions.add(channelPaymentSubscription)

  }
  /*
  onEndDateChange(endDate: any) {

        const target = endDate.target as HTMLInputElement;
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
*/

  onApplyFilter(page:number) {
    console.log("apply filter page "+page )

      if (!this.currentStart || !this.currentEnd) return;
       /*TODO  implementar filtros
        const from = new Date(this.currentStart);
        const to = new Date(this.currentEnd);
        const chanelPayment = this.currentPayChannel;
        to.setHours(23, 59, 59, 999);
        */
        this.notificationService.getNotifications().pipe(
          map(response => {
            this.revenueData = response;
            return this.revenueData
            /*return this.revenueData.content.filter(x => {
              const saleDate = new Date(x.revenueDate);
              const matchesDate = saleDate >= from && saleDate <= to;
              const matchesChannel = !this.currentPayChannel || x.paymentChannel.toLocaleLowerCase() === this.currentPayChannel.toLocaleLowerCase();
              return matchesDate && matchesChannel;
            });*/
          })
        ).subscribe(filtered => {
          this.revenues = filtered;
          this.loadTable(page);
          this.isModalOpen=false
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
    const id = event.dataField?.id
    console.log(id)
    if (event.event === 'detail') {
        //TODO : abrir modal detalles
        console.log("detail aciton")
        this.selectedNotification=event.dataField?.realItem
        this.isModalActionsOpen=true
      }
    if(event.event==="comment"){
      console.log("reply action")

    }
        
  }
  onSelectedItems(items: any[]) {
    console.log('Selected', items);
  }

  loadNotif(): void {
    var getRevenuesSub= this.notificationService.getNotifications().subscribe({
      next: (response: any) => {
       // this.revenueData = response;
         const registros: any = {
          content: [
            {
              id:1,
              fecha: '2025-10-13T10:23:05.6632507',
              entidad: 'Banco Nación',
              nombre: 'Matías Bon',
              consulta: 'Consulta de saldo',
              estado: 'si',
              respuestas: 
                [{
                  fecha:'2025-10-13T10:23:05.6632507',
                  respondidoPor:"YO",
                  texto:"asdasdasd"
                  },
                  {
                  fecha:'2025-10-13T10:23:05.6632507',
                  respondidoPor:"YO",
                  texto:"asdasdasd"
                  },
                  {
                  fecha:'2025-10-13T10:23:05.6632507',
                  respondidoPor:"YO",
                  texto:"asdasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssd"
                  }

                ]
              

            },
            {
              id:2,
              fecha: '2025-10-13T10:23:05.6632507',
              entidad: 'Banco Nación',
              nombre: 'Matías Bon',
              consulta: 'Consulta de saldo',
              estado: 'no'
            }
          ]
        };
        this.revenueData=registros
        this.revenues= this.revenueData.content
       
       // const stateSaved = this.stateService.getState()
       // if(stateSaved  && stateSaved.enabled){
       //   this.loadPreviusState(stateSaved)
       // }
       // else{  
       // this.stateService.clearState()
        this.itemsPerpage=20;
        this.controlsForm.controls.rowPaginator.setValue(this.itemsPerpage)
        var oneMountAgo = new Date();
        oneMountAgo.setMonth(new Date().getMonth()-1)
        this.currentStart = this.formatDate(oneMountAgo)
        this.currentEnd = this.formatDate(new Date)
        this.controlsForm.controls.dateStart.setValue(this.currentStart)
        this.controlsForm.controls.dateEnd.setValue(this.currentEnd)
        this.loadTable(1)
      }
      ,
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
        this.tableDto = [...filteredRevenues.map((item, index) => ({
          id: item.id,
          fecha: item.fecha,
          entidad:item.entidad,
          nombre: item.nombre,
          consulta:item.consulta,
          respondida:item.estado,
          realItem:item

        }))];

        console.log(this.tableDto)
  }

  onPageChange(pageNumber: number): void {
    this.currentPages=pageNumber
    this.loadTable(pageNumber);
  }

  loadTitleMap(){
          this.translate.get([
            'IP.NEW-RENDITION.DATE',
            'NEW_VAR.ENTITY',
            'IP.COST_CENTER.NAME',
            'NEW_VAR.CONSULT',
            'NEW_VAR.RESPONSED',
          ]).subscribe(translations => {
            this.titlesMap = new Map<string, string>([
              ['fecha', translations['IP.NEW-RENDITION.DATE']],
              ['entidad', translations['NEW_VAR.ENTITY']],
              ['nombre', translations['IP.COST_CENTER.NAME']],
              ['consulta', translations['NEW_VAR.CONSULT']],
              ['respondida', translations['NEW_VAR.RESPONSED']],
            ]);
          });
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

  formatNumberToArg(value: number): string {
      if (isNaN(value)) return '0,00';
      return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
  }

  toggleMobileMenu(index: number) {
    if (this.showMobileMenuIndex === index) {
        this.showMobileMenuIndex = null; // cierra si se vuelve a hacer click
      } else {
        this.showMobileMenuIndex = index; // abre solo ese menú
      }  
    }
  onMobileMenuAction(accion: string, revenue: any) {
    console.log('Action', accion);
    console.log('Card :', revenue);
    const id = revenue.id
    console.log(id)
    if (accion === 'detail') {
          this.router.navigate(['revenue-detail',id]);
    }
  }

   onClickFiltredSearchMobile() {
    if (this.isMobile) {
      this.isModalOpen = true
    } 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if(this.isMobile){
    this.itemsPerpage=20
    this.controlsForm.controls.rowPaginator.setValue(this.itemsPerpage)
    }
  }

    


}
