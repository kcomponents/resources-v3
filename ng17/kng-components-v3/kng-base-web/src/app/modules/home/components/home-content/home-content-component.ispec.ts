import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeycloakService } from 'keycloak-angular';
import { HomeContentComponent } from './home-content.component';
import { UserService } from '@ec.com.kgr/kng-components-v3/k-security';
import { AdmLoginService } from '@ec.com.kgr/kng-components-v3/k-common/k-services';
import { KLayoutComponent } from '@ec.com.kgr/kng-components-v3/k-layout';
import { KPanelMenuComponent } from '@ec.com.kgr/kng-components-v3/k-panel-menu';
import { RouterTestingModule } from '@angular/router/testing';
import { PlatformLocation } from '@angular/common';

describe('HomeContentComponent', () => {
  let component: HomeContentComponent;
  let fixture: ComponentFixture<HomeContentComponent>;

  beforeEach(waitForAsync(() => {
    const mockPlatformLocation = {
      _location: { pathname: '/mock-path' },
    };
    TestBed.configureTestingModule({
      imports: [
        HomeContentComponent,
        KLayoutComponent,
        HttpClientTestingModule,
        KPanelMenuComponent,
        RouterTestingModule
      ],
      providers:[
        { provide: PlatformLocation, useValue: mockPlatformLocation },
        UserService,
        AdmLoginService,
        KeycloakService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
