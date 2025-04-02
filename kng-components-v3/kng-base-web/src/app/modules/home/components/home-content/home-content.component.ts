import { Component } from '@angular/core';
import { KLayoutComponent } from '@ec.com.kgr/kng-components-v3/k-layout';
import { KPanelMenuComponent } from '@ec.com.kgr/kng-components-v3/k-panel-menu';
import { UserService } from '@ec.com.kgr/kng-components-v3/k-security';

/**
 * Home content
 *
 * @author components on 2024/06/18.
 * @version 1.0
 * @since 1.0.0
 */

@Component({
  selector: 'app-home-content',
  standalone: true,
  providers: [],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.scss',
  imports: [KLayoutComponent, KPanelMenuComponent]
})
export class HomeContentComponent {

  /**
   * constructor
   */
  constructor(private userService: UserService) {}

  /**
   * Logout
   */
  logout(): void {
    this.userService.logout();
  }
}
