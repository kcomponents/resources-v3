import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from '@ec.com.kgr/kng-components-v3/k-security';
import { KeycloakService } from 'keycloak-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdmLoginService } from '@ec.com.kgr/kng-components-v3/k-common/k-services';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HttpClientTestingModule
      ],
      providers:[ UserService, AdmLoginService, KeycloakService ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the "kng-base-web" title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('kng-base-web');
    fixture.destroy();
  });
});
