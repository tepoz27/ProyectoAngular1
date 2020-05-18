import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsDetailsComponent } from './reviews-details/reviews-details.component';
import { AddReviewsComponent } from './add-reviews/add-reviews.component';
import { EditReviewsComponent } from './edit-reviews/edit-reviews.component';


const routes: Routes = [
  {
    path: 'reviews',
    component: ReviewsComponent,
    data: {title: 'List of reviews'}
  },
  {
    path: 'reviews-details/:id',
    component: ReviewsDetailsComponent,
    data: {title: 'Review details'}
  },
  {
    path: 'add-reviews',
    component: AddReviewsComponent,
    data: {title: 'Add reviews'}
  },
  {
    path: 'edit-reviews/:id',
    component: EditReviewsComponent,
    data: {title: 'Edit reviews'}
  },
  {
    path: '',
    redirectTo: '/reviews',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
