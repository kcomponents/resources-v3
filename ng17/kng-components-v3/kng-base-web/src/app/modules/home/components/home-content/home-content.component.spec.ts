import { TestBed } from '@angular/core/testing';

import { HomeContentComponent } from './home-content.component';
import { UserService } from '@ec.com.kgr/kng-components-v3/k-security';
import { AdmLoginService } from '@ec.com.kgr/kng-components-v3/k-common/k-services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeycloakService } from 'keycloak-angular';
import { KLayoutComponent } from '@ec.com.kgr/kng-components-v3/k-layout';
import { KPanelMenuComponent } from '@ec.com.kgr/kng-components-v3/k-panel-menu';

describe('HomeContentComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeContentComponent,
        KLayoutComponent,
        HttpClientTestingModule,
        KPanelMenuComponent
      ],
      providers:[
        UserService,
        AdmLoginService,
        KeycloakService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomeContentComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.destroy();
  });
});
