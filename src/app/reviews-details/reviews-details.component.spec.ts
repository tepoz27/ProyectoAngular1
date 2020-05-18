import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsDetailsComponent } from './reviews-details.component';

describe('ReviewsDetailsComponent', () => {
  let component: ReviewsDetailsComponent;
  let fixture: ComponentFixture<ReviewsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
