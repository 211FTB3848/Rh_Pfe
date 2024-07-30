import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofilsComponent } from './userprofils.component';

describe('UserprofilsComponent', () => {
  let component: UserprofilsComponent;
  let fixture: ComponentFixture<UserprofilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserprofilsComponent]
    });
    fixture = TestBed.createComponent(UserprofilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
