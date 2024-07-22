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

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent
    },
    {
        path:"login",
        component: LoginComponent,
        canActivate: [isNotLoggedGuard]
    },
    {
        path:"signup",
        component: SignupComponent,
        canActivate: [isNotLoggedGuard]
    },
    {
        path: "me",
        component: MeComponent,
        canActivate: [isLoggedGuard]
    },
    {
        path: "admin",
        component: AdminComponent,
        canActivate: [isAdminGuard],
        children:[
            {
                path: "books",
                component: BooksComponent
            },
            {
                path: "users",
                component: UsersComponent
            },
            {
                path:"reviews",
                component: ReviewsComponent
            }
        ]
    }
];
