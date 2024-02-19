import { Component } from '@angular/core';
import {Student} from "../../model/student.model";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EtudiantService} from "../../service/etudiant.service";


@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  template:`
    <form class="row g-3"  formGroupName="formGroup">
      <div class="col-md-4">
        <label for="validationDefault01" class="form-label">ID</label>
        <input type="text" class="form-control" id="validationDefault01" value="" readonly name="_id" required="">
      </div>
      <div class="col-md-4">
        <label for="validationDefault02" class="form-label">Full name</label>
        <input  type="text" class="form-control" id="validationDefault02" value="" name="nom_complet"
               required>
      </div>
      <div class="col-md-4">
        <label for="validationDefaultUsername" class="form-label">Email</label>
        <div class="input-group">
          <input type="text" name="email" class="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required="">
        </div>
      </div>
      <div class="col-md-6">
        <label for="validationDefault03" class="form-label">Class</label>
        <input type="text"  class="form-control" id="validationDefault03" name="classe" required>
      </div>

      <div class="col-md-3">
        <label for="validationDefault05" class="form-label">Created At</label>
        <input type="date"  class="form-control" id="validationDefault05" name="createdAt" required>
      </div>

      <div class="col-12">
        <button class="btn btn-primary" type="submit">Submit form</button>
      </div>
    </form>

  `,
  styleUrl:'./edit-student.component.css'
})
export class EditStudentComponent {
  student!:Student;
  protected formGroup =new FormGroup({
    _id:new FormControl(''),
    nom_complet:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.email]),
    classe:new FormControl('', [Validators.required]),
    createdAt:new FormControl('', [Validators.required,Validators.pattern('dd-MM-yyyy')])
  });

  protected email!:string;
  constructor(private studentService:EtudiantService, private router:Router, private route:ActivatedRoute) {
    this.email = this.route.snapshot.params['email'];
    this.studentService.searchByEmail(this.email).subscribe(
        value => {
          this.formGroup.value.nom_complet = value.nom_complet;
          this.formGroup.value.email = value.email;
          this.formGroup.value.classe = value.classe;
          this.formGroup.value.createdAt = value.createdAt;
          this.formGroup.value._id = value._id;
        }
    )
  }

  onEdit(email:string,student:Student) {
      this.formGroup.value._id = this.route.snapshot.params['id'];
      this.studentService.editStudent(email,student).subscribe(
          value => {
            this.formGroup.value.nom_complet = value.nom_complet;
            this.formGroup.value.email = value.email;
            this.formGroup.value.classe = value.classe;
            this.formGroup.value.createdAt = value.createdAt;
            this.formGroup.value._id = value._id;
          }
        )
  }

  /**
   * Getters
   */
  get nom_complet(){ return this.formGroup.get('nom_complet');}



}
