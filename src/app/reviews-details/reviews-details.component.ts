import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Reviews } from '../reviews';

@Component({
  selector: 'app-reviews-details',
  templateUrl: './reviews-details.component.html',
  styleUrls: ['./reviews-details.component.scss']
})
export class ReviewsDetailsComponent implements OnInit {
  reviews: Reviews = {_id:'', title:'', update: null, restaurant:'', dish:'', review:''};
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getReviewsDetails(this.route.snapshot.params.id);
  }

  getReviewsDetails(id: string) {
    this.api.getReviewsById(id)
      .subscribe((data: any) => {
        this.reviews = data;
        console.log(this.reviews);
        this.isLoadingResults = false;
      });
  }

  deleteReviews(id: any) {
    this.isLoadingResults = true;
    this.api.deleteReviews(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/reviews']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
