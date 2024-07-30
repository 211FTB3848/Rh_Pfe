import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CemplyeurComponent } from './cemplyeur.component';

describe('CemplyeurComponent', () => {
  let component: CemplyeurComponent;
  let fixture: ComponentFixture<CemplyeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CemplyeurComponent]
    });
    fixture = TestBed.createComponent(CemplyeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
