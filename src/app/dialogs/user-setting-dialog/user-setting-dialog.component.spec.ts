import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingDialogComponent } from './user-setting-dialog.component';

describe('UserSettingDialogComponent', () => {
  let component: UserSettingDialogComponent;
  let fixture: ComponentFixture<UserSettingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
