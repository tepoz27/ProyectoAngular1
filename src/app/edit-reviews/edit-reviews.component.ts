import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-edit-reviews',
  templateUrl: './edit-reviews.component.html',
  styleUrls: ['./edit-reviews.component.scss']
})
export class EditReviewsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  reviewsForm: FormGroup;
  _id:'';
  title:'';
  restaurant:'';
  dish:'';
  review:'';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.getReviewsById(this.route.snapshot.params.id);
    this.reviewsForm = this.formBuilder.group({
      title : [null, Validators.required],
      restaurant : [null, Validators.required],
      dish : [null, Validators.required],
      review : [null, Validators.required]
    });
  }

  getReviewsById(id: any) {
    this.api.getReviewsById(id).subscribe((data: any) => {
      this._id = data._id;
      this.reviewsForm.setValue({
        name: data.name,
        gender: data.gender,
        age: data.age,
        address: data.address,
        city: data.city,
        country: data.country,
        status: data.status
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateReviews(this._id, this.reviewsForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/reviews-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  casesDetails() {
    this.router.navigate(['/reviews-details', this._id]);
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}