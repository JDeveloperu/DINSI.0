import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionAreaComponent } from './interaction-area.component';

describe('InteractionAreaComponent', () => {
  let component: InteractionAreaComponent;
  let fixture: ComponentFixture<InteractionAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
