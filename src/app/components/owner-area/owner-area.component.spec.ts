import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAreaComponent } from './owner-area.component';

describe('OwnerAreaComponent', () => {
  let component: OwnerAreaComponent;
  let fixture: ComponentFixture<OwnerAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
