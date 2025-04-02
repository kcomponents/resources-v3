import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PopoverConfig } from 'ngx-bootstrap/popover';
import { routes } from './app.routes';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { provideHttpClient } from '@angular/common/http';
import { PopoverConfigApp } from '@ec.com.kgr/kng-components-v3/k-common';
import { KMessageModule } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { KSecurityModule } from '@ec.com.kgr/kng-components-v3/k-security';
import { KServicesModule } from '@ec.com.kgr/kng-components-v3/k-common/k-services';
import { listEnvs } from '@const/listEnvs';
import { KHttpInterceptorModule } from '@ec.com.kgr/kng-components-v3/k-common/k-http-interceptor';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    importProvidersFrom([
      KServicesModule.forRoot(listEnvs),
      KMessageModule.forRoot(),
      BrowserAnimationsModule,
      KSecurityModule.forRoot({
        appVersion: '1.0.0',
        systemId: 'BASE',
        pathResources: 'kruger'
      }),
      KHttpInterceptorModule.forRoot()
    ]),
    { provide: PopoverConfig, useFactory: new PopoverConfigApp().getPopoverConfig },
    provideAnimations(),
    provideHttpClient(),
    KeycloakAngularModule,
    BlockUIModule.forRoot().providers,
    BlockUIHttpModule.forRoot().providers,
    KeycloakService
  ]
};
