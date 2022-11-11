import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentsComponent } from './repayments.component';

describe('RepaymentsComponent', () => {
  let component: RepaymentsComponent;
  let fixture: ComponentFixture<RepaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
