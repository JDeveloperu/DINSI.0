import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorAreaComponent } from './investor-area.component';

describe('InvestorAreaComponent', () => {
  let component: InvestorAreaComponent;
  let fixture: ComponentFixture<InvestorAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
