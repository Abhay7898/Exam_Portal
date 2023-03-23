import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { FooterComponent } from './componets/footer/footer.component';
import { SigupComponent } from './pages/sigup/sigup.component';
import { LoginComponent } from './pages/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authAuthInterceptorProvider } from './service/auth.interceptor';
import { DashboadComponent } from './pages/admin/dashboad/dashboad.component';
import { UsersDashboardComponent } from './pages/users/users-dashboard/users-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import {MatTableModule} from '@angular/material/table';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UserSidebarComponent } from './pages/users/user-sidebar/user-sidebar.component';
import { LoadQuizComponent } from './pages/users/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/users/instructions/instructions.component';
import { StartQuizComponent } from './pages/users/start-quiz/start-quiz.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxUiLoaderModule ,NgxUiLoaderHttpModule} from "ngx-ui-loader";
import { ProfileUpdateComponent } from './pages/profile-update/profile-update.component';
import { RegisteredUsersComponent } from './pages/admin/registered-users/registered-users.component';
import { UpdateRUserComponent } from './pages/admin/register-user-opration/update-r-user/update-r-user.component';
import { ViewRUserComponent } from './pages/admin/register-user-opration/view-r-user/view-r-user.component';
import { ViewRResultComponent } from './pages/admin/register-user-opration/view-r-result/view-r-result.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SigupComponent,
    LoginComponent,
    HomeComponent,
    DashboadComponent,
    UsersDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    ViewQuestionsComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    UserSidebarComponent,
    LoadQuizComponent,
    InstructionsComponent,
    StartQuizComponent,
    ProfileUpdateComponent,
    RegisteredUsersComponent,
    UpdateRUserComponent,
    ViewRUserComponent,
    ViewRResultComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    CKEditorModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
  ],
  providers: [authAuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
