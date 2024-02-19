import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Student} from "../../model/student.model";
import {EtudiantService} from "../../service/etudiant.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-group',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `

      <a (click)="onNavigate()"  class="list-group-item list-group-item-action ">
        <div class="d-flex w-100 justify-content-between light">
          <h5 class="mb-1">{{student.nom_complet}}</h5>
          @if( etudiant.calculateDiff(student.createdAt)> 0){
            <small >{{ etudiant.calculateDiff(student.createdAt)}} days</small>
          }@else{
            <small>Ealier today</small>
          }
        </div>
      </a>



  `,
  styles: [`

    a:hover{
      background: #351D13;
      color: white;
      cursor: pointer;
    }

  `]
})
export class ListGroupComponent {
  @Input()  student!:Student;
  @Input()  index!:string;
  @Input() hidden!:boolean;
  @Output() cacher=new EventEmitter<string>();
  constructor(readonly  etudiant:EtudiantService,protected  router:Router) {}
  onNavigate() {
    this.cacher.emit(`student/${this.index} `);
  }

}
