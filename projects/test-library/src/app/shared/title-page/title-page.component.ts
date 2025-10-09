import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent {


onClickButton() {
console.log("click")
}
  @Input() title: string = '';
  @Input() showBackButton: boolean = false;

  constructor() {}

  goBack(): void {

  }

}
