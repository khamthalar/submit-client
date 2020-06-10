import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixDetailComponent } from './fix-detail.component';

describe('FixDetailComponent', () => {
  let component: FixDetailComponent;
  let fixture: ComponentFixture<FixDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
