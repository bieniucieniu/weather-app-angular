import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [
    `
      div.root {
        display: flex;
        justify-content: center;
      }
      div.main-container {
        background-color: var(--background-color);
        border-radius: 2rem;
        box-shadow: var(--dark-shadow);
        padding: 1.5rem;
        margin: 1.5rem;
        min-width: 50rem;
        max-width: 50rem;
        max-height: calc(100vh - 3rem);

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
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
        text-decoration: none;
      }

      @media (max-width: 768px) {
        div.main-container {
          min-width: calc(100vw - 3rem);
          max-width: calc(100vw - 3rem);
        }
      }

      .topbar img.search-icon {
        width: 1rem;
        height: 1rem;
      }
      .topbar img.github-icon {
        width: 2rem;
        height: 2rem;
      }

      .head-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
      }

      .head-link:hover {
        text-decoration: underline;
      }

      .topbar-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }

      .favorite {
        color: var(--yellow-color);
        text-decoration: none;
        font-size: 2rem;
      }
      .favorite:hover {
        text-decoration: underline;
      }
    `,
  ],
  template: `
    <div class="root">
      <div class="main-container">
        <div class="topbar">
          <a [routerLink]="['/search']" class="head-link">
            <h1>weather app</h1>
            <img
              src="assets/search.svg"
              alt="search-icon"
              class="search-icon"
            />
          </a>
          <div class="topbar-right">
            <a [routerLink]="['/favorite']" class="favorite"> &#9733;</a>
            <a
              target="_about"
              href="https://github.com/bieniucieniu/weather-app-angular"
            >
              <img class="github-icon" src="assets/github-mark.svg" />
            </a>
          </div>
        </div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {}
