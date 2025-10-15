import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from '../models/sale';
import { SalesService } from '../services/sales.service';
import { formatDate } from '@angular/common';
import { saleDetail } from '../models/saleDetail';
import { TableEvent } from 'projects/base/src/shared/components/table/Itable';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss']
})
export class SalesDetailsComponent {

  
  saleId!: string
  sale!:saleDetail
  title=''
  dataShow!:any
  columnsHeaders:string[]= [
        'number',
        'amount',
        'dueDate',
        'state',
        'brokerCommissionPaid',
        'commissionValue',
        'paymentDate'
      ];
   titlesMap: Map<string, string> = new Map([
      ['number', 'Cuota Nro'],
      ['amount', 'Valor'],
      ['dueDate', 'Vencimiento'],
      ['state', 'Estado'],
      ['brokerCommissionPaid', 'Pago comisión broker'],
      ['commissionValue', 'Valor comisión'],
      ['paymentDate', 'Fecha pago']
    ]);

  constructor(private route: ActivatedRoute,private readonly service:SalesService,private readonly router: Router) {}



    onBackButtonClick() {
      this.router.navigate(['sales-list'])
    }



  ngOnInit(): void {
      this.loadSaleDetail();
   }


loadSaleDetail() {
  this.route.paramMap
    .pipe(
      switchMap(params => {
        this.saleId = String(params.get('id'));
        console.log('ID de venta:', this.saleId);
        return this.service.getSale(this.saleId);
      })
    )
    .subscribe({
      next: (res: saleDetail) => {
        this.sale = res;
        console.log('Detalle de venta recibido:', res);

        this.dataShow = {
          id: this.sale.id,
          saleDate: formatDate(this.sale.saleDate, 'dd/MM/yyyy', 'en-US'),
          productName: this.sale.productName,
          policyNumber: this.sale.policyData.number,
          policyValue:  this.sale.currency + " "+this.formatNumberToArg(this.sale.policyData.amount),
          premiumValue: this.sale.currency +" "+ this.formatNumberToArg(this.sale.policyData.premiumAmount),
          brokerCommissionPercent: this.calcularPorcentaje(this.sale.amount, this.sale.policyData.amount) + ' %',
          brokerCommissionARS: this.sale.currency+" "+ this.formatNumberToArg(this.sale.amount),
          brokerBusiness: this.sale.brokerNameBussiness,
          brokerName: this.sale.brokerName,
          premiumInstallments: this.sale.premiumPaymentInstallments,
          customerName: this.sale.customer.fullName,
          customerEmail: this.sale.customer.email,
          customerPhone: this.sale.customer.phoneNumber,

          installmentPlan: this.sale.policyData.premiumPaymentPlan.map(cuota => ({
            number: cuota.installmentNumber,
            amount: this.sale.currency+" "+ this.formatNumberToArg(cuota.amount),
            dueDate: formatDate(cuota.dueDate, 'dd/MM/yyyy', 'en-US'),
            paid: cuota.isPaid ? 'PAGADA' : 'NO PAGADA',
            state: cuota.isPaid ? 'PAGADA' : 'NO PAGADA',
            brokerCommissionPaid:this.calcularPorcentaje(this.sale.amount, this.sale.policyData.amount) > 0 ? 'SI' : 'NO',
            commissionValue:
              this.sale.currency+" "+
              this.formatNumberToArg(
                this.calcularValorDePorcentaje(
                  cuota.amount,
                  this.calcularPorcentaje(this.sale.amount, this.sale.policyData.amount)
                )
              ),
            paymentDate: cuota.dueDate ? formatDate(cuota.dueDate, 'dd/MM/yyyy', 'en-US') : '-',
          })),
        };

        this.title = 'Detalles de la venta # ' + this.sale.id;
        console.log(this.dataShow);
      },
      error: err => {
        console.error('Error cargando detalle de venta:', err);
      },
    });
}
    calcularValorDePorcentaje(monto: number, porcentaje: number): number {
      const valor = (monto * porcentaje) / 100;
      return +valor.toFixed(2); 
    }
    calcularPorcentaje(valor: number, total: number): number {
      if (total === 0) return 0; // evitar división por cero
      const porcentaje = (valor / total) * 100;
      return +porcentaje.toFixed(2); // redondeado a 2 decimales
    }
  
    formatNumberToArg(value: number): string {
      if (isNaN(value)) return '0,00';
      return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
      }
    
}








