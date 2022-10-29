import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InteractionareaComponent } from './interactionarea.component';

describe('InteractionareaComponent', () => {
  let component: InteractionareaComponent;
  let fixture: ComponentFixture<InteractionareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
