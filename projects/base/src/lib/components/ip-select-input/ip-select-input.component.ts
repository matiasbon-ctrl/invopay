import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ip-select-input',
  templateUrl: './ip-select-input.component.html',
  styleUrls: ['./ip-select-input.component.scss'],
})
export class IpSelectInputComponent {
  @Input() control = new FormControl();
  @Input() label = '';
  @Input() onStyle = '';
  @Input() disabled = false;
  @Output() selectEmitter = new EventEmitter<any>();

  errorMessages: Record<string, string> = {
    required: 'IP.VALIDATORS.REQUIRED',
  };

  getErrorMessage(): string {
    if (this.control.touched && this.control.invalid && this.control.errors) {
      const errorKey = Object.keys(this.control.errors || {})[0];
      return this.errorMessages[errorKey] || '';
    }
    return '';
  }

  onSelect(ev: any) {
    this.selectEmitter.emit(ev.target.value);
  }
}
