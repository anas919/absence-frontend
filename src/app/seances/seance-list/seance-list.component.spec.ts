import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeanceListComponent } from './seance-list.component';

describe('SeanceListComponent', () => {
  let component: SeanceListComponent;
  let fixture: ComponentFixture<SeanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeanceListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
