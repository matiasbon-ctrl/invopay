import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDetailsAssuranceComponent } from './notification-details-assurance.component';

describe('NotificationDetailsAssuranceComponent', () => {
  let component: NotificationDetailsAssuranceComponent;
  let fixture: ComponentFixture<NotificationDetailsAssuranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationDetailsAssuranceComponent]
    });
    fixture = TestBed.createComponent(NotificationDetailsAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
