import {AsyncPipe, DatePipe, formatDate, NgIf, TitleCasePipe} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Student } from '../../model/student.model';
import {Component,  signal} from '@angular/core';
import { EtudiantService } from '../../service/etudiant.service';
import {Observable} from "rxjs";
import {Messages} from "../../model/messages.model";
import {ModalMessageComponent} from "../modal-message/modal-message.component";
import {EditStudentComponent} from "../edit-student/edit-student.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [TitleCasePipe, NgIf, AsyncPipe, DatePipe, RouterLink, ModalMessageComponent, EditStudentComponent],
  template: `

      <div class="card text-center">
        <div class="card-header">
          Featured
        </div>
          <div class="card-body" *ngIf="student$  | async as item">
            <h5 class="card-title">{{ item.nom_complet | titlecase }}</h5>
            <p class="card-text">{{ item.classe }}</p>
            <p class="card-text">{{ item.email }}</p>
            <p class="card-text">{{ item!.telephone }}</p>

            @if (etudiantService.calculateDiff(item.createdAt) > 0 ; as b ) {
              <p class="card-text">{{etudiantService.calculateDiff(item.createdAt) }}  day(s) ago</p>
            } @else if (etudiantService.calculateDiff(item.createdAt) == 0) {
              <p class="card-text"> Earlier today</p>
            } @else {
              <p class="card-text"> Empty</p>
            }
            <div class="buttons">
              <!-- Button trigger delete modal -->
              <button class="btn btn-outline-danger" (click)="onDelete(item.email)" type="button"
                      data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="bi bi-trash2"></i>
                Delete
              </button>
              <!-- Button trigger update modal -->
              <button class="btn btn-outline-dark" (click)="onUpdate(item)"  type="button" data-bs-toggle="modal" data-bs-target="#exampleModalUpdate">
                <i class="bi bi-pen-fill"></i>
                Update
              </button>
            </div>
        </div>
        <div class="card-footer text-body-secondary">
        </div>
      </div>

        <!--DELETE MODAL MESSAGES-->
        <app-modal
          [hidden]="showDeleteMessage()"
          [redirect]="redirect()"
          [message]="message()"
          [icons]="icons">
            </app-modal>
      <!--MODAL EDIT FORM-->
      @if(student$  | async ;as student){
        <app-edit-student [formGroup]="form" [hidden]="hiddenEditForm()" [student]="student"   ></app-edit-student>
      }
      <!--EDIT Modal FORM  -->
       `,
  styles: [`
    .card{
      display:flex;
      justify-content:center;
      align-content: center;
      flex-wrap: wrap;
      align-items:center;
      margin:10% 0  0 32%;
      width: 500px;
    }
    .buttons{
      display: flex;
      gap: 1.5em 2em;
    }
  `],

})
export class StudentDetailsComponent {
  showDeleteMessage=signal(true);
  id:string="";
  hiddenEditForm=signal(true);
  icons:string='';
  message=signal('');
  redirect=signal('');
  student$!:Observable<Student>;
  protected form =new FormGroup({
    _id:new FormControl('', [Validators.required]),
    nom_complet:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.email]),
    classe:new FormControl('', [Validators.required]),
    telephone:new FormControl('', [Validators.required, Validators.pattern('')]),
    createdAt:new FormControl('', )
  });
  delete$!:Observable<Messages>;
  constructor(private route: ActivatedRoute,readonly router:Router,readonly etudiantService: EtudiantService) {
    this.id =  this.route.snapshot.params['id'];
    this.student$ = this.etudiantService.getStudentById(this.id);
  }

  onDelete(email:string) {
    this.showDeleteMessage.set(false);
    this.etudiantService.deleteStudent(email).subscribe(
      value => {
        this.message.set(value.msg);
        this.icons=value.status_code==400? 'bi bi-exclamation-diamond': ' bi bi-check2-circle';

        this.redirect.set('/students');
      }
    );
  }


  onUpdate(student:Student) {
    this.form= new FormGroup({
      _id:new FormControl(student._id, [Validators.required]),
      nom_complet:new FormControl(student.nom_complet,[Validators.required]),
      email:new FormControl(student.email,[Validators.required, Validators.email]),
      classe:new FormControl(student.classe, [Validators.required]),
      telephone:new FormControl(student.telephone, ),
      createdAt:new FormControl(student.createdAt)
    });
    this.form.controls.createdAt.setValue(formatDate(student.createdAt,'yyyy-MM-dd','en'));
    console.log(this.form.controls.createdAt.value);
    this.hiddenEditForm.set(false);
    console.log(this.hiddenEditForm());
  }
}
