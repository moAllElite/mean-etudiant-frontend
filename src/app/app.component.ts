import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
  imports: [RouterOutlet, NavbarComponent, StudentListComponent, NgOptimizedImage]
})
export class AppComponent {
  title = 'etudiant mean';

}
