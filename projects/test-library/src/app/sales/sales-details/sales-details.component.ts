import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sale } from '../models/sale';
import { SalesService } from '../services/sales.service';
import { formatDate } from '@angular/common';
import { saleDetail } from '../models/saleDetail';
import { DataShow } from './dataShow';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss']
})
export class SalesDetailsComponent {
  
  saleId!: string
  sale!:saleDetail
  title=''
  dataShow!:DataShow
  constructor(private route: ActivatedRoute,private readonly service:SalesService) {}

  ngOnInit(): void {
    
      this.loadSaleDetail();

   }



  loadSaleDetail() {
      this.route.paramMap.subscribe(params => {
      this.saleId = String(params.get('id'));
      console.log('ID de venta:', this.saleId)
       });

     this.service.getSale(this.saleId).subscribe({
      next: (res: saleDetail) => {
        console.log("entreo"+res)
        this.sale = res

        console.log("next get"+ this.saleId)

         this.dataShow ={
              id: this.sale.id,
              saleDate: formatDate(this.sale.saleDate, 'dd/MM/yy', 'en-US'),
              productName: this.sale.productName,
              policyNumber: this.sale.policyData.number,
              policyValue: "ARS "+this.formatNumberToArg(this.sale.policyData.amount),
              premiumValue: "ARS "+this.formatNumberToArg( this.sale.policyData.premiumAmount),
              brokerCommissionPercent: " "+(this.sale.amount / this.sale.policyData.amount) * 100 + " %",
              brokerCommissionARS:"ARS "+ this.formatNumberToArg(this.sale.amount),
              brokerBusiness: this.sale.brokerNameBussiness,
              brokerName: this.sale.brokerName,
              premiumInstallments: this.sale.premiumPaymentInstallments,
              customerName: this.sale.customer.fullName,
              customerEmail: this.sale.customer.email,
              customerPhone: this.sale.customer.phoneNumber,
              installmentPlan: this.sale.policyData.premiumPaymentPlan.map(cuota => ({
                number: cuota.installmentNumber,
                dueDate: formatDate(cuota.dueDate, 'dd/MM/yyyy', 'en-US'),
                amount: cuota.amount,
                paid: cuota.isPaid
              }))
              }
         this.title='Detalles de la venta #..'+this.sale.id;
      },
      error: (err) => {
        console.error('Error cargando detalle de venta:', err);
      }
     });
  }


  
    formatNumberToArg(value: number): string {
      if (isNaN(value)) return '0,00';
      return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
}
    
}








