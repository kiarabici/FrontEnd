import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevDetailsComponent } from './dev-details.component';

describe('DevDetailsComponent', () => {
  let component: DevDetailsComponent;
  let fixture: ComponentFixture<DevDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
