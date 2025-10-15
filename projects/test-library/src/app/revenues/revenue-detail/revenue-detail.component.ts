import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RevenueService } from '../services/revenue.service';
import { switchMap } from 'rxjs';
import { RevenueDetail } from '../models/revenueDetail';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-revenue-detail',
  templateUrl: './revenue-detail.component.html',
  styleUrls: ['./revenue-detail.component.scss']
})
export class RevenueDetailComponent {


    
    saleId!: string
    revenue!:RevenueDetail
    title=''
    dataShow!: any
    columnsHeaders:string[]= [
          'installmentNumber',
          'dueDate',
          'amount',
        ];
     titlesMap: Map<string, string> = new Map([
        ['installmentNumber', 'Cuota Nro'],
        ['amount', 'Valor Pago'],
        ['dueDate', 'Vencimiento'],
      ]);
  
    constructor(private route: ActivatedRoute,private readonly service:RevenueService,private readonly router: Router) {}
  
      ngOnInit(): void {
          this.loadRevenueDetail();
      }
  
  
  loadRevenueDetail() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.saleId = String(params.get('id'));
          console.log('ID de venta:', this.saleId);
          return this.service.getRevenue(this.saleId);
        })
      )
      .subscribe({
        next: (res: RevenueDetail) => {
          this.revenue = res;
          console.log('Detalle de venta recibido:', res);

        //mapeo de la respuesta a la vista de datos necesaria
         this.dataShow = {
                         transactionData: this.revenue?.transactionData
                        ? {
                            revenueDate: formatDate(this.revenue.transactionData.revenueDate,'dd/MM/yyyy','en-US') ,
                            currency: this.revenue.transactionData.currency,
                            amount: this.formatNumberToArg( this.revenue.transactionData.amount),
                            paymentProvider: this.revenue.transactionData.paymentProvider,
                            paymentChannel: this.revenue.transactionData.paymentChannel,
                            transactionObservations: this.revenue.transactionData.transactionObservations
                          }:null,

                        conciliationData: this.revenue?.conciliationData
                          ? {
                              isConsolidated: this.revenue.conciliationData.isConsolidated?'si':'no',
                              productName: this.revenue.conciliationData.productName,
                              policyNumber: this.revenue.conciliationData.policyNumber,
                              policyAmount: this.revenue.conciliationData.policyAmount,
                              paymentNumber: this.revenue.conciliationData.paymentNumber,
                              paymentValue: this.formatNumberToArg(this.revenue.conciliationData.paymentValue),
                              brokerName: this.revenue.conciliationData.brokerName
                            }:null,
                        policyData: this.revenue?.policyData
                          ? {
                              number: this.revenue.policyData.number,
                              amount: this.formatNumberToArg(this.revenue.policyData.amount),
                              saleDate:   formatDate( this.revenue.policyData.saleDate,'dd/MM/yyyy','en-US'),
                              productName: this.revenue.policyData.productName,
                              premiumAmount: this.formatNumberToArg( this.revenue.policyData.premiumAmount),
                              premiumPaymentInstallments: this.revenue.policyData.premiumPaymentInstallments,
                              premiumPaymentPlan: this.revenue.policyData.premiumPaymentPlan?.map(p => ({
                                installmentNumber: p.installmentNumber,
                                dueDate: p.dueDate,
                                amount: p.amount,
                                isPaid: p.isPaid
                              })) ?? []
                            }
                          : null
                        
                      };
      
          this.title = 'Detalles de la recoleccion ';
        },
        error: err => {
          console.error('Error cargando detalle de recaudacion:', err);
        },
      });
  }



      onBackButtonClick() {
        this.router.navigate(['revenues-list'])
       }
    
      formatNumberToArg(value: number): string {
        if (isNaN(value)) return '0,00';
        return new Intl.NumberFormat('es-AR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value);
        }
      
}
