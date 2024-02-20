import {Component, Input} from '@angular/core';
import {Student} from "../../model/student.model";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {EtudiantService} from "../../service/etudiant.service";
import {DatePipe,  NgIf} from "@angular/common";


@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    NgIf
  ],
  template:`
    <!--EDIT Modal FORM  -->
    <div [hidden]="hiddenEditForm" class="modal fade" id="exampleModalUpdate" tabindex="-1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit student</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="needs-validation" [formGroup]="formGroup" (ngSubmit)="onSaveChanges(student.email)" >
              <div class="input-group  mb-3">
                <span class="input-group-text" id="basic-addon1">ID</span>
                <input id="_id" name="_id" class="form-control" type="text" formControlName="_id"
                       aria-label="readonly input example" readonly>
              </div>
              <label for="floatingInputInvalid" class="form-label">Email</label>
              <div  class="input-group mb-3">
                <input formControlName="email" type="email" name="email" [class]="email?.valid?'form-control':'form-control is-invalid' "
                       readonly id="floatingInputInvalid">

              </div>
              <div class="mb-3">
                <label for="validationCustomUsername" class="form-label">Full name</label>
                <div class="input-group has-validation mb-3">
                  <input  formControlName="nom_complet" name="nom_complet" type="text" [class]="nom_complet?.valid?'form-control':'form-control is-invalid'" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required>
                  <div class="invalid-feedback">
                    @if( nom_complet?.invalid && (nom_complet?.dirty || nom_complet?.touched)){
                      <div *ngIf="nom_complet?.errors?.['required']" [class]="nom_complet?.valid?'invalid-feedback':'text-danger  mb-3'" >Full name is required</div>
                    }
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="validationTel" class="form-label">Phone</label>
                <div class="input-group has-validation mb-3">
                  <input  formControlName="telephone" name="telephone" type="text" [class]="telephone?.valid?'form-control':'form-control is-invalid'" id="validationTel" aria-describedby="inputGroupPrepend" required>
                  <div class="invalid-feedback">
                    @if(telephone?.invalid && (telephone?.dirty || classe?.touched)){
                      <div *ngIf="telephone?.errors?.['required']" class="text-danger  mb-3'" >Class is required</div>
                    }
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="validationClasse" class="form-label">Class</label>
                <div class="input-group has-validation mb-3">
                  <input  formControlName="classe" name="classe" type="text" [class]="classe?.valid?'form-control':'form-control is-invalid'" id="validationClasse" aria-describedby="inputGroupPrepend" required>
                  <div class="invalid-feedback">
                    @if(classe?.invalid && (classe?.dirty || classe?.touched)){
                      <div *ngIf="classe?.errors?.['required']" class="text-danger  mb-3'" >Class is required</div>
                    }
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label" for="floatingInputInvalid4">Created at</label>
                <div class="input-group ">
                  <input readonly value="{{student.createdAt| date:'yyyy-MM-dd'}}" formControlName="createdAt" type="date"
                         name="createdAt" class="form-control  "
                         id="floatingInputInvalid4">
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Save changes</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles:[`
    .modal-header{
      background: #351D13;
      color:white;
    }
    .btn-close{
      --bs-btn-close-color:white;
      --bs-btn-close-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e");
    }
  `]
})
export class EditStudentComponent {

  @Input()  student!:Student;
  @Input() hiddenEditForm!:boolean;
  @Input() formGroup:FormGroup=new FormGroup({
    _id:new FormControl('', [Validators.required]),
    nom_complet:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.required, Validators.email]),
    classe:new FormControl('', [Validators.required]),
    telephone:new FormControl('', [Validators.required, Validators.pattern('')]),
    createdAt:new FormControl("", [Validators.required]),
  });

  constructor(private studentService:EtudiantService, private router:Router) {}

  onSaveChanges(email:string){
    if(this.formGroup.valid){
      this.student.email = this.formGroup.value.email;
      this.student.nom_complet = this.formGroup.value.nom_complet;
      this.student.classe = this.formGroup.value.classe;
      this.student.telephone = this.formGroup.value.telephone;
      this.student.createdAt = this.formGroup.value.createdAt;

      console.log(this.student.createdAt);
      this.studentService.editStudent(email,this.student).subscribe(
        value => {
          value=this.student;
          console.log(value);
        }
      );

      this.router.navigate([`students`]).then(
       ()  =>  window.location.reload()
      );
      alert("success ");
    }
    else{
      alert("error ");
      this.hiddenEditForm=false;

    }

  }

  /**
   * Getters
   */
  get nom_complet(){ return this.formGroup.get('nom_complet');}
  get email(){return this.formGroup.get('email');}
  get classe(){return this.formGroup.get('classe');}
  get telephone(){return this.formGroup.get('telephone');}

}
