import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ParametersContentComponent } from './parameters-content.component';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from '@ec.com.kgr/kng-components-v3/k-security';
import { AdmLoginService } from '@ec.com.kgr/kng-components-v3/k-common/k-services';
import { KeycloakService } from 'keycloak-angular';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { KLayoutComponent } from '@ec.com.kgr/kng-components-v3/k-layout';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ParametersFiltersComponent } from 'src/app/modules/parameters/components/parameters-filters/parameters-filters.component';
import { KFieldsetComponent } from '@ec.com.kgr/kng-components-v3/k-fieldset';
import { ParametersFilterService } from '../../services/parameters-filter.service';
import { ParametersService } from '../../services/parameters.service';
import { ConfirmationService } from 'primeng/api';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ParameterVo } from '../../vo/parameter-vo';

describe('ParametersContentComponent', () => {

  const filterServiceSpy = jasmine.createSpyObj('FiltersService', ['getFilters']);
  const parametersServiceSpy = jasmine.createSpyObj('ParametersService', ['findByFilter', 'deleteData', 'findByFilter']);
  const dialogServiceSpy = jasmine.createSpyObj('DialogService', ['open']);
  const confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);
  const messageServiceSpy = jasmine.createSpyObj('KMessageService', ['success', 'info']);
  const userServiceSpy = jasmine.createSpyObj('UserService', ['logout']);

  const parametersContentComponent = new ParametersContentComponent(
    dialogServiceSpy,
    confirmationServiceSpy,
    messageServiceSpy,
    userServiceSpy,
    filterServiceSpy,
    parametersServiceSpy
  );

  const data: ParameterVo = {
    'parameterCode': 'URL',
    'parameterDescription': 'URL EDIT',
    'parameteValue': 'URL',
    'systemGroup': 'BASE',
    'parameterStatus': 'ACT'
  };

  const responseData = {
    'code': 200,
    'data': {
      'content': [
        {
          'parameterCode': 'URL',
          'parameterDescription': 'URL EDIT',
          'parameteValue': 'URL',
          'systemGroup': 'BASE',
          'parameterStatus': 'ACT',
          'registerDate': 1663077202136
        }
      ],
      'pageable': {
        'page': 0,
        'size': 15,
        'sort': {}
      },
      'total': 1
    }
  };

  const responseData2 = {
    'code': 200,
    'data': { 'total': 0 }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ParametersContentComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
        KLayoutComponent,
        KFieldsetComponent,
        FormsModule,
        TableModule,
        PopoverModule,
        ConfirmDialogModule,
        ParametersFiltersComponent
      ],
      providers: [
        ParametersFilterService,
        ParametersService,
        DialogService,
        ConfirmationService,
        KMessageService,
        KeycloakService,
        AdmLoginService,
        UserService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    parametersContentComponent.onSearchEvent = () => {
      false;
    };
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(ParametersContentComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.destroy();
  });

  it('should be called method loadData IF', (done: DoneFn) => {
    parametersServiceSpy.findByFilter.and.returnValue(of(responseData));
    parametersContentComponent.loadData(1);
    expect(parametersServiceSpy.findByFilter).toHaveBeenCalled();
    done();
  });

  it('should be called method loadData #IF - #ELSE', (done: DoneFn) => {
    parametersServiceSpy.findByFilter.and.returnValue(of(responseData2));
    parametersContentComponent.loadData(1);
    expect(parametersServiceSpy.findByFilter).toHaveBeenCalled();
    done();
  });

  it('should be called method openSaveModal', (done: DoneFn) => {
    dialogServiceSpy.open.and.returnValue({ onClose: of(false) });
    parametersContentComponent.openSaveModal();
    expect(dialogServiceSpy.open).toHaveBeenCalled();
    done();
  });

  it('should be called method openSaveModal #If', (done: DoneFn) => {
    dialogServiceSpy.open.and.returnValue({ onClose: of(data) });
    parametersContentComponent.openSaveModal();
    expect(dialogServiceSpy.open).toHaveBeenCalled();
    done();
  });

  it('should be called method openUpdateModal', (done: DoneFn) => {
    dialogServiceSpy.open.and.returnValue({ onClose: of(false) });
    parametersContentComponent.openUpdateModal(data);
    expect(dialogServiceSpy.open).toHaveBeenCalled();
    done();
  });

  it('should be called method openUpdateModal #If', (done: DoneFn) => {
    dialogServiceSpy.open.and.returnValue({ onClose: of(data) });
    parametersContentComponent.openUpdateModal(data);
    expect(dialogServiceSpy.open).toHaveBeenCalled();
    done();
  });

  it('should be called method confirmDelete', (done: DoneFn) => {
    confirmationServiceSpy.confirm.and.callFake((params: any) => {
      params.accept();
    });
    parametersServiceSpy.deleteData.and.returnValue(of(() => {
      false;
    }));
    messageServiceSpy.success = () => {
      false;
    };
    parametersContentComponent.confirmDelete(data);
    expect(confirmationServiceSpy.confirm).toHaveBeenCalled();
    done();
  });

  it('should be called method logout', () => {
    userServiceSpy.logout.and.returnValue(false);
    parametersContentComponent.logout();
    expect(userServiceSpy.logout).toHaveBeenCalled();
  });

});
