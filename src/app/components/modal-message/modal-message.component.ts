import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ message }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                   [routerLink]="redirect"></button>
          </div>
          <div class="modal-body ">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="#008000"
                 [class]="icons" viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: [`

    .modal-body {
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: center;
    }
      `],
})
export class ModalMessageComponent {
  @Input()  redirect:string='';
  @Input()  message:string='';
  @Input()  icons:string='';
  @Input()  fill:string='';
}
