import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ip-button-modal',
  templateUrl: './ip-button-modal.component.html',
  styleUrls: ['./ip-button-modal.component.scss']
})
export class IpButtonModalComponent {
  @Input() typeBtn!: 'action' | 'cancel' | 'submit' | 'action2';
  @Input() size: 'small' | 'normal' | 'large' = 'normal';
  @Input() disabled = false;
  @Input() styleButton?: string;
  @Output() clicked = new EventEmitter<any>();

  onClickButton(ev: MouseEvent) {
    this.clicked.emit(ev);
  }

}
