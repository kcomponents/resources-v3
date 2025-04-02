import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { KLayoutComponent } from '@ec.com.kgr/kng-components-v3/k-layout';
import { UserService } from '@ec.com.kgr/kng-components-v3/k-security';
import { AdmLoginService } from '@ec.com.kgr/kng-components-v3/k-common/k-services';
import { KeycloakService } from 'keycloak-angular';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { ConfirmationService } from 'primeng/api';
import { KFieldsetComponent } from '@ec.com.kgr/kng-components-v3/k-fieldset';
import { KDirectivesModule } from '@ec.com.kgr/kng-components-v3/k-common/k-directives';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ArticleModalComponent } from '../../modals/article-modal/article-modal.component';
import { ArticleContentComponent } from './article-content.component';
import { ArticleService } from '../../services/article.service';
import { ArticleFilterService } from '../../services/article-filter.service';
import { ArticleFiltersComponent } from '../article-filters/article-filters.component';

describe('ArticleContentComponent', () => {
  const personsServiceSpy = jasmine.createSpyObj('ArticleService', ['findByFilter', 'deleteData', 'findByFilter']);
  const filterServiceSpy = jasmine.createSpyObj('FiltersService', ['getFilters'],['parameterValue']);
  const dialogServiceSpy = jasmine.createSpyObj('DialogService', ['open']);
  const confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);
  const messageServiceSpy = jasmine.createSpyObj('KMessageService', ['success', 'info']);
  const userServiceSpy = jasmine.createSpyObj('UserService', ['logout']);
  const keycloackService: KeycloakService = jasmine.createSpyObj('KeycloakService', ['logout']);

  const personsContentComponent = new ArticleContentComponent(
    messageServiceSpy,
    dialogServiceSpy,
    confirmationServiceSpy,
    userServiceSpy,
    filterServiceSpy,
    personsServiceSpy
  );

  const data = {
    articleId: '1',
    documentNumber: '1234567890',
    firstName: 'LOREM',
    lastName: 'SETPU',
    email: 'b@casa.com',
    userName: 'smxadmin'
  };

  const responseData = {
    'code': 200,
    'data': {
      'content': [
        {
          'status': true,
          'createdDate': 1664367679535,
          'articleId': 'b3968961-47d6-47e8-b89e-5c5bc96e18db',
          'documentNumber': '1717031379',
          'firstName': 'MARK EDZ',
          'lastName': 'MA',
          'email': 'kcomponents@ec.krugercorp.com'
        },
        {
          'status': false,
          'createdDate': 1666110163749,
          'articleId': 'd1636ea6-b984-4830-8222-db7584ceaf2e',
          'documentNumber': '1004100903',
          'firstName': 'FERNANDO',
          'lastName': 'CHULD',
          'email': 'asda@hotmail.com'
        }
      ],
      'pageable': {
        'page': 0,
        'size': 2,
        'sort': {}
      },
      'total': 2
    }
  };

  const responseData2 = {
    'code': 200,
    'data': { 'total': 0 }
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleContentComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
        KLayoutComponent,
        KFieldsetComponent,
        KDirectivesModule,
        FormsModule,
        TableModule,
        PopoverModule,
        ConfirmDialogModule,
        ArticleModalComponent,
        ArticleFiltersComponent,
      ],
      providers: [
        ArticleService,
        KMessageService,
        DialogService,
        ArticleFilterService,
        ConfirmationService,
        KeycloakService,
        AdmLoginService,
        UserService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    personsContentComponent.onSearchEvent = () => {
      false;
    };
    messageServiceSpy.info = () => {
      false;
    };
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ArticleContentComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.destroy();
  });
  it('should be called method loadData IF', (done: DoneFn) => {
    personsServiceSpy.findByFilter.and.returnValue(of(responseData));
    personsContentComponent.loadData(1);
    expect(personsServiceSpy.findByFilter).toHaveBeenCalled();
    done();
  });

  it('should be called method loadData #IF - #ELSE', (done: DoneFn) => {
    personsServiceSpy.findByFilter.and.returnValue(of(responseData2));
    personsContentComponent.loadData(1);
    expect(personsServiceSpy.findByFilter).toHaveBeenCalled();
    done();
  });

  it('should be called method openSaveModal', (done: DoneFn) => {
    dialogServiceSpy.open.and.returnValue({ onClose: of(false) });
    personsContentComponent.openSaveModal();
    expect(dialogServiceSpy.open).toHaveBeenCalled();
    done();
  });

  it('should be called method openSaveModal #If', (done: DoneFn) => {
    dialogServiceSpy.open.and.returnValue({ onClose: of(data) });
    personsContentComponent.openSaveModal();
    expect(dialogServiceSpy.open).toHaveBeenCalled();
    done();
  });

  it('should be called method openUpdateModal', (done: DoneFn) => {
    dialogServiceSpy.open.and.returnValue({ onClose: of(false) });
    personsContentComponent.openUpdateModal(data);
    expect(dialogServiceSpy.open).toHaveBeenCalled();
    done();
  });

  it('should be called method openUpdateModal #If', (done: DoneFn) => {
    dialogServiceSpy.open.and.returnValue({ onClose: of(data) });
    personsContentComponent.openUpdateModal(data);
    expect(dialogServiceSpy.open).toHaveBeenCalled();
    done();
  });

  it('should be called method confirmDelete', (done: DoneFn) => {
    confirmationServiceSpy.confirm.and.callFake((params: any) => {
      params.accept();
    });
    personsServiceSpy.deleteData.and.returnValue(of(() => {
      false;
    }));
    messageServiceSpy.success = () => {
      false;
    };
    personsContentComponent.confirmDelete(data);
    expect(confirmationServiceSpy.confirm).toHaveBeenCalled();
    done();
  });

  it('should be called method logout', () => {
    userServiceSpy.logout.and.returnValue(false);
    personsContentComponent.logout();
    expect(userServiceSpy.logout).toHaveBeenCalled();
  });

});
