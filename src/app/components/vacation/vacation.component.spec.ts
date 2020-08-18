import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VacationComponent } from './vacation.component';

describe('VacationComponent', () => {
  let component: VacationComponent;
  let fixture: ComponentFixture<VacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
