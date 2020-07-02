import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YourAddressComponent } from './your-address.component';

describe('YourAddressComponent', () => {
  let component: YourAddressComponent;
  let fixture: ComponentFixture<YourAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourAddressComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YourAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
