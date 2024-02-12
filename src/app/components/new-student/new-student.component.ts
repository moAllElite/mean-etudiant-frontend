import {Component} from '@angular/core';
import {FormGroup, ReactiveFormsModule, FormsModule,  FormControl, Validators} from "@angular/forms";
import {EtudiantService} from "../../service/etudiant.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-student',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.css'
})
export class NewStudentComponent {
  protected  pattern :string='^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$';
  protected  hidden:boolean=true;
   protected formGroup:FormGroup= new FormGroup({
     'classe': new FormControl('', [Validators.required]),
     'email': new FormControl('', [Validators.required, Validators.email]),
     'nom_complet': new FormControl('', [Validators.required]),
     'phone': new FormControl('', [Validators.required, Validators.pattern(this.pattern)])
   });
  constructor(private  service:EtudiantService,private router:Router) {}

  onClose():void{
    this.router.navigateByUrl('/students').then();
  }
  onSubmit() :void{
    if (!this.formGroup.valid) {
      alert('Formulaire invalide');
    } else {
      this.hidden=false;
      this.service.saveStudent(this.formGroup.value).subscribe(
        {
          next:(): void => {
            this.formGroup.reset();
          },
          error: (error) =>  console.log(error)
        }
      );
    }

  }
}
