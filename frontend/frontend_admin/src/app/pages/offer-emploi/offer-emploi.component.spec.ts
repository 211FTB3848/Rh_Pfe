import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferEmploiComponent } from './offer-emploi.component';

describe('OfferEmploiComponent', () => {
  let component: OfferEmploiComponent;
  let fixture: ComponentFixture<OfferEmploiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferEmploiComponent]
    });
    fixture = TestBed.createComponent(OfferEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
