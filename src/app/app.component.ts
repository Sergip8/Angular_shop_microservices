import { isPlatformBrowser } from '@angular/common';
import { Component, HostBinding, Inject, PLATFORM_ID, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-shop';

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId:any) {
    this.isBrowser = isPlatformBrowser(platformId);
    effect(() => {
      if(this.isBrowser){
        localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
       

      }
    });
    if(this.isBrowser)
      this.darkMode.set(JSON.parse(localStorage.getItem('darkMode') ?? 'false') )
  }

  darkMode = signal<boolean>(false)
  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }
}
