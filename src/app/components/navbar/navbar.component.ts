import {Component,  signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {StudentCardComponent} from "../student-card/student-card.component";
import {EtudiantService} from "../../service/etudiant.service";
import { map, Observable} from "rxjs";
import {Student} from "../../model/student.model";
import {FormsModule, NgForm} from "@angular/forms";
import {ListGroupComponent} from "../list-group/list-group.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    NgForOf,
    UpperCasePipe,
    StudentCardComponent,
    FormsModule,
    AsyncPipe,
    NgIf,
    ListGroupComponent,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
    closeOffcanva=signal(true);

  items:
    {
      name:string,
      route:string,
      icon: string
    }[] =[
    { name:'home', route:'home',icon:'bi bi-house'},
    { name:'new student', route:'new-student',icon:'bi bi-person-add'},
    {name:'list students', route:'students',icon:'bi bi-list'},
  ]
  students$!:Observable<Student []>;
    email:string="";
    student!:Student;
    hidden=false;
    keyword='';
  constructor(readonly etudiantService:EtudiantService,readonly router:Router) {}



  onSubmit(form:NgForm) {
    this.students$ = this.etudiantService.getAllStudent().pipe(
      map(
        students => {
          return   students.filter(
            student => student.nom_complet.includes( this.keyword )
          )
        }
      )
    );

  }

  showOffCanva() {
    this.closeOffcanva.set(false);
    console.log(this.closeOffcanva());
  }


  onResetForm(form: NgForm,event:string,id:string) {
    form.resetForm();
    this.keyword='';
    this.hidden=true;
    this.router.navigate([`/student/${id}`]).then(
      ()=> window.location.reload()
    );
    console.log(event);
  }
}
