import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-details-assurance',
  templateUrl: './notification-details-assurance.component.html',
  styleUrls: ['./notification-details-assurance.component.scss']
})
export class NotificationDetailsAssuranceComponent {
onResponseSubmit($event: string) {
throw new Error('Method not implemented.');
}

closeResponseModal() {
this.isResponseModalOpen=false
}

  @Input() isOpen: boolean = false;
  @Input() notification: any | null = null;
  @Input() title: string = 'Detalle de Notificación';
  @Output() close = new EventEmitter<void>();
 notificationData: any = null; // 👈 Aquí guardás el objeto ordenado o adaptado
  isResponseModalOpen: boolean = false;

  ngOnChanges() {
    this.updateBodyScroll();

    if (this.notification) {
      this.notificationData = this.normalizeNotification(this.notification);
    }
  }

  private normalizeNotification(notification: any) {
    return {
      id: notification.id,
      fecha:this.getDate(notification.fecha),
      hora:this.getTime(notification.fecha),
      entidad: notification.entidad,
      nombre: notification.nombre,
      estado: notification.respondida === 'Si' ? 'Respondida' : 'Pendiente',
      respuestas: (notification.respuestas
          ?.sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
          .map((r: any) => ({ ...r, hora : this.getTime(r.fecha), fecha: this.getDate(r.fecha)})) 
        ) || [],
      consulta: notification.consulta,
    };
  }


  getDate(date: string | Date): string {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  
  getTime(date: string | Date): string {
    const d = new Date(date);

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return ` ${hours}:${minutes}:${seconds}`;
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  ngOnInit() {
    this.updateBodyScroll();
  }


  ngOnDestroy() {
    document.body.style.overflow = 'unset';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isOpen) {
      this.onClose();
    }
  }

  private updateBodyScroll() {
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  onClose() {
    this.close.emit();
  }

  onResponder() {
    this.isResponseModalOpen=true
  }


  onBackdropClick() {
    this.onClose();
  }

  onModalClick(event: Event) {
    event.stopPropagation();
  }
}
