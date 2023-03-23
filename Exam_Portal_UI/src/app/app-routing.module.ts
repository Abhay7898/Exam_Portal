import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboadComponent } from './pages/admin/dashboad/dashboad.component';
import { UpdateRUserComponent } from './pages/admin/register-user-opration/update-r-user/update-r-user.component';
import { ViewRResultComponent } from './pages/admin/register-user-opration/view-r-result/view-r-result.component';
import { ViewRUserComponent } from './pages/admin/register-user-opration/view-r-user/view-r-user.component';
import { RegisteredUsersComponent } from './pages/admin/registered-users/registered-users.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileUpdateComponent } from './pages/profile-update/profile-update.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigupComponent } from './pages/sigup/sigup.component';
import { InstructionsComponent } from './pages/users/instructions/instructions.component';
import { LoadQuizComponent } from './pages/users/load-quiz/load-quiz.component';
import { StartQuizComponent } from './pages/users/start-quiz/start-quiz.component';
import { UsersDashboardComponent } from './pages/users/users-dashboard/users-dashboard.component';
import { AdminGuard } from './service/admin.guard';
import { NormalGuard } from './service/normal.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch:'full'
  },
  {
  path:'singup',
  component:SigupComponent,
  pathMatch:'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'

  },
  {
    path: 'admin',
    component: DashboadComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'',
        component:WelcomeComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'update-profile',
        component:ProfileUpdateComponent,
      },
      {
        path:'categories',
        component:ViewCategoriesComponent,
      },
      {
        path:'add-categories',
        component:AddCategoryComponent,
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent
      },
      {
        path:'view-questions/:qid/:title',
        component:ViewQuestionsComponent
      },
      {
        path:'add-question/:qid/:title',
        component:AddQuestionComponent
      },
      {
        path:'update-question/:questionid',
        component:UpdateQuestionComponent
      },
      {
        path:'registered-users',
        component:RegisteredUsersComponent
      },
      {
        path:'view-r-user/:uid',
        component:ViewRUserComponent
      },
      {
        path:'update-r-user/:uid',
        component:UpdateRUserComponent
      },
      
      {
        path:'view-r-result',
        component:ViewRResultComponent
      },
    ],

  },
  {
    path: 'user-dashboard',
    component: UsersDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path:':catId',
        component:LoadQuizComponent
      },
      {
        path: 'instructions/:qid',
        component: InstructionsComponent,

      },
      
    ]
  },
  {
    path: 'start/:qid',
    component: StartQuizComponent,
    canActivate:[NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
