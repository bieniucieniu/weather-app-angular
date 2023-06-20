import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [],
  template: `
    <div>
      <app-navbar></app-navbar>
      <h1>{{ title }}</h1>
    </div>
  `,
})
export class AppComponent {
  title = 'weather';
}
