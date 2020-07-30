import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredDetailComponent } from './registered-detail.component';

describe('RegisteredDetailComponent', () => {
  let component: RegisteredDetailComponent;
  let fixture: ComponentFixture<RegisteredDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
