import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OublieMotdepasseComponent } from './oublie-motdepasse.component';

describe('OublieMotdepasseComponent', () => {
  let component: OublieMotdepasseComponent;
  let fixture: ComponentFixture<OublieMotdepasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OublieMotdepasseComponent]
    });
    fixture = TestBed.createComponent(OublieMotdepasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
