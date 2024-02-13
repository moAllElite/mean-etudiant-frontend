import { Component } from '@angular/core';
import {Student} from "../../model/student.model";


@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [],
  template:`

  `,
  styleUrl:'./edit-student.component.css'
})
export class EditStudentComponent {
  student!:Student;

}
