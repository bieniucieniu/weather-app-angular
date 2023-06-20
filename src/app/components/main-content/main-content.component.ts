import { Component } from '@angular/core';

@Component({
  selector: 'app-main-content',
  styles: [
    `
      div.main-container {
        background-color: rgba(200, 200, 200, 0.15);
        backdrop-filter: blur(1rem);
        border-radius: 2rem;
        box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
        padding: 20px;
        margin: 20px;
        max-width: 800px;
        background-color: #fff;

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
        <a target="_about" href="https://github.com/bieniucieniu">
          <img src="assets/github-mark.svg" />
        </a>
      </div>
    </div>
  `,
})
export class MainContentComponent {}
