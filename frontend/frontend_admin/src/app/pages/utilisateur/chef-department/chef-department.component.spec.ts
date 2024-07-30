import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefDepartmentComponent } from './chef-department.component';

describe('ChefDepartmentComponent', () => {
  let component: ChefDepartmentComponent;
  let fixture: ComponentFixture<ChefDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChefDepartmentComponent]
    });
    fixture = TestBed.createComponent(ChefDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
