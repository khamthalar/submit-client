import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDesboardComponent } from './admin-desboard.component';

describe('AdminDesboardComponent', () => {
  let component: AdminDesboardComponent;
  let fixture: ComponentFixture<AdminDesboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDesboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDesboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
