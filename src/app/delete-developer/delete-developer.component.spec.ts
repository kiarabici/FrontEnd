import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeveloperComponent } from './delete-developer.component';

describe('DeleteDeveloperComponent', () => {
  let component: DeleteDeveloperComponent;
  let fixture: ComponentFixture<DeleteDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
