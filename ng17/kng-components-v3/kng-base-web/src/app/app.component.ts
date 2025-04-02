import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KFooterComponent } from '@ec.com.kgr/kng-components-v3/k-footer';
import { PrimeNgEs } from '@ec.com.kgr/kng-components-v3/k-search';
import { UserService } from '@ec.com.kgr/kng-components-v3/k-security';
import { PrimeNGConfig } from 'primeng/api';

/**
 * Main component
 *
 * @author components on 2024/06/18.
 * @version 1.0
 * @since 1.0.0
 */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KFooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /**
   * Configuration for spanish in primeng components
  **/
  es = PrimeNgEs;
  title = 'kng-base-web';
  constructor(
    private config: PrimeNGConfig,
    private user: UserService
  ) {
    this.config.setTranslation(this.es);
    // eslint-disable-next-line no-shadow
    this.user.userInfo().then( (user: any) => user);
  }
}
