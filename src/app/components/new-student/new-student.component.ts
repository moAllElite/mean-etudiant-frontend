import {  Component } from '@angular/core';
import {FormGroup, ReactiveFormsModule, FormsModule,  FormControl, Validators} from "@angular/forms";
import {EtudiantService} from "../../service/etudiant.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-new-student',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.css'
})
export class NewStudentComponent {
  protected  pattern :string='^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$';
  protected  hidden:boolean=true;
  protected formGroup:FormGroup =new FormGroup({
     classe: new FormControl('', [Validators.required,Validators.minLength(4)]),
     email: new FormControl('', [Validators.required, Validators.email]),
     nom_complet: new FormControl('', [Validators.required]),
     phone: new FormControl('', [Validators.required, Validators.pattern(this.pattern)])
  });
  constructor(private  service:EtudiantService,private router:Router) {}

  onClose():void{
    this.router.navigateByUrl('/students').then();
  }
  onSubmit() :void{
    if (this.formGroup.valid)   {
      this.hidden=false;
      this.service.saveStudent(this.formGroup.value).subscribe(
        {
          next:(): void => {
            this.formGroup.reset();
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
    }

  }

  /**
   * Getters pour récupérer les champs du formulaire.
   */
  get nom_complet(){return this.formGroup.get('nom_complet');}
  get email(){return this.formGroup.get('email');}
  get telephone(){return this.formGroup.get('phone');}
  get classe(){return this.formGroup.get('classe');}


}
