import {Component,  signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule, FormsModule,  FormControl, Validators} from "@angular/forms";
import {EtudiantService} from "../../service/etudiant.service";
import {Router, RouterLink} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {ModalMessageComponent} from "../modal-message/modal-message.component";
import {Observable} from "rxjs";
import {Student} from "../../model/student.model";

@Component({
  selector: 'app-new-student',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    ModalMessageComponent,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.css'
})
export class NewStudentComponent {
  protected  pattern :string='^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$';
  protected hiddens=signal(true);
  protected  student$!:Observable<Student>;
  protected formGroup:FormGroup =new FormGroup({
     classe: new FormControl('', [Validators.required,Validators.minLength(4)]),
     email: new FormControl('', [Validators.required, Validators.email]),
     nom_complet: new FormControl('', [Validators.required]),
     phone: new FormControl('', [Validators.required, Validators.pattern(this.pattern)])
  });

  constructor(private  service:EtudiantService,private router:Router) {}
  redirect=signal<string>('');
  message= signal<string>('');
  fill=signal<string>('');
  icons=signal<string>('') ;
  onSubmit() :void{
    if (this.formGroup.valid)   {
        this.service.saveStudent(this.formGroup.value).subscribe(
        (data) => {
            this.message.set(data.msg);
          this.icons.set(data.status_code==400? 'bi bi-exclamation-diamond': ' bi bi-check2-circle');
        });
      this.formGroup.reset();
      this.redirect.set('/students');
      this.hiddens.set(false);
    }

  }
  onRedirectTo():void{
    this.router.navigateByUrl(this.redirect()).then();
  }


  /**
   * Getters pour récupérer les champs du formulaire.
   */
  get nom_complet(){return this.formGroup.get('nom_complet');}
  get email(){return this.formGroup.get('email');}
  get telephone(){return this.formGroup.get('phone');}
  get classe(){return this.formGroup.get('classe');}

}
