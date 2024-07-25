import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { MeComponent } from './components/pages/me/me.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { BooksComponent } from './components/pages/admin/books/books.component';
import { UsersComponent } from './components/pages/admin/users/users.component';
import { ReviewsComponent } from './components/pages/admin/reviews/reviews.component';
import { isNotLoggedGuard } from './guards/is-not-logged.guard';
import { isLoggedGuard } from './guards/is-logged.guard';
import { isAdminGuard } from './guards/is-admin.guard';
import { StationsSectionComponent } from './components/pages/home/stations-section/stations-section.component';
import { BestSellerComponent } from './components/pages/home/best-seller/best-seller.component';
import { NewComponent } from './components/pages/home/new/new.component';
import { AddReviewComponent } from './components/pages/book/add-review/add-review.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },

    {
        path: "addReview/:id",
        component: AddReviewComponent
    }

    ,
    {
        path: "login",
        component: LoginComponent,
        canActivate: [isNotLoggedGuard]
    },
    {
        path: "signup",
        component: SignupComponent,
        canActivate: [isNotLoggedGuard]
    },
    {
        path: "me",
        component: MeComponent,
        canActivate: [isLoggedGuard]
    },
    {
        path: "stations",
        component: StationsSectionComponent
    }, {
        path: "bestSeller",
        component: BestSellerComponent

    }, {
        path: "new",
        component: NewComponent

    },
    {
        path: "admin",
        component: AdminComponent,
        canActivate: [isAdminGuard],
        children: [
            {
                path: "books",
                component: BooksComponent
            },
            {
                path: "users",
                component: UsersComponent
            },
            {
                path: "reviews",
                component: ReviewsComponent
            }
        ]
    }
];
