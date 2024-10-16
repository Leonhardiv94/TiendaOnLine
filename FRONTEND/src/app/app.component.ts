import { Component, AfterViewInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'FRONTEND';
  ngAfterViewInit() {
    this.adjustFooterPosition();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustFooterPosition();
  }

  adjustFooterPosition() {
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    if (main && footer) {
      if (main.offsetHeight < window.innerHeight) {
        footer.setAttribute('style', 'position: fixed; bottom: 0');
        main.setAttribute('style', 'height: 100vh' );
      } else {
        footer.setAttribute('style', 'position: fixed');
        main.setAttribute('style', 'height: 100%' );
      }
    }
  }
}
