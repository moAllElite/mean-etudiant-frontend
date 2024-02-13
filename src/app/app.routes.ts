import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import {NewStudentComponent} from "./components/new-student/new-student.component";
import {HomeComponent} from "./components/home/home.component";
import { StudentDetailsComponent } from './components/student-details/student-details.component';

export const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'students'},
  {path:'home',component:HomeComponent},
  {path: 'students', component: StudentListComponent},
  {path: 'new-student', component:NewStudentComponent},
  {path:'student/:id',component:StudentDetailsComponent},
];
