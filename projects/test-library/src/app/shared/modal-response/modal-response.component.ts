import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-response',
  templateUrl: './modal-response.component.html',
  styleUrls: ['./modal-response.component.scss']
})
export class ModalResponseComponent {
  @Input() isOpen = false;
@Input() title = 'Responder';
@Input() maxLength = 1000;
@Output() close = new EventEmitter<void>();
@Output() submit = new EventEmitter<string>();


responseText = '';


@HostListener('document:keydown.escape')
onEscape() {
if (this.isOpen) this.onClose();
}


onBackdropClick() {
this.onClose();
}


onClose() {
this.responseText = '';
this.close.emit();
}


canSubmit() {
return this.responseText.trim().length > 0 && this.responseText.length <= this.maxLength;
}


onSubmit() {
if (!this.canSubmit()) return;
this.submit.emit(this.responseText.trim());
this.responseText = '';
this.close.emit();
}


// Si querés que Enter envíe (pero permita Shift+Enter newline):
onEnter(event: KeyboardEvent) {
if (event.key === 'Enter' && !event.shiftKey) {
event.preventDefault();
this.onSubmit();
}
}

}
