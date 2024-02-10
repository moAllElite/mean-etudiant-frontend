import { Component } from '@angular/core';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [],
  template: `
    <div class="card text-center">
      <div class="card-header">
        Featured
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      <div class="card-footer text-body-secondary">
        2 days ago
      </div>
    </div>
  `,

  styles: [`

  `],

})
export class StudentDetailsComponent {

}
