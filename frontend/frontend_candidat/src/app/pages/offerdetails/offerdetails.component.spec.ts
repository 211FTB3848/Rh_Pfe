import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferdetailsComponent } from './offerdetails.component';

describe('OfferdetailsComponent', () => {
  let component: OfferdetailsComponent;
  let fixture: ComponentFixture<OfferdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferdetailsComponent]
    });
    fixture = TestBed.createComponent(OfferdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
