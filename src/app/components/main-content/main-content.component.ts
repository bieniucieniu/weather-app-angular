import { Component } from '@angular/core';

@Component({
  selector: 'app-main-content',
  styles: [
    `
      div.main-container {
        background-color: var(--background-color);
        border-radius: 2rem;
        box-shadow: var(--dark-shadow);
        padding: 1.5rem;
        margin: 1.5rem;
        max-width: 50rem;

        display: flex;
        flex-direction: column;
      }

      .topbar {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        gap: 2rem;
      }
      .topbar h1 {
        color: #306f8a;
        font-size: 1.5rem;
      }
      .topbar img {
        opacity: 0.9;
        width: 2rem;
        height: 2rem;
      }
    `,
  ],
  template: `
    <div class="main-container">
      <div class="topbar">
        <h1>weather app</h1>
        <a
          target="_about"
          href="https://github.com/bieniucieniu/weather-app-angular"
        >
          <img src="assets/github-mark.svg" />
        </a>
      </div>

      <app-search-bar></app-search-bar>
    </div>
  `,
})
export class MainContentComponent {}
