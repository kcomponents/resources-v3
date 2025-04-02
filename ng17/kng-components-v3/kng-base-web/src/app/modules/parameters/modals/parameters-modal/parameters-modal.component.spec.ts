import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ParametersModalComponent } from './parameters-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { KValidationsModule } from '@ec.com.kgr/kng-components-v3/k-common/k-validations';
import { ParametersService } from '../../services/parameters.service';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { ResponseVO } from '@ec.com.kgr/kng-components-v3/k-common';
import { of } from 'rxjs';

describe('ParametersModalComponent', () => {
  let component: ParametersModalComponent;
  let fixture: ComponentFixture<ParametersModalComponent>;

  const parametersServiceSpy = jasmine.createSpyObj('ParametersService', ['putData', 'postData']);
  const messageServiceSpy = jasmine.createSpyObj('KMessageService', ['success', 'warning']);
  const dynamicDialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);
  const dynamicDialogConfigSpy = {
    data: {
      'parameterCode': 'URL',
      'parameterDescription': 'URL EDIT',
      'parameteValue': 'URL',
      'systemGroup': 'BASE',
      'parameterStatus': 'ACT',
      'registerDate': 1663077202136
    }
  } as DynamicDialogConfig;

  const dynamicDialogConfigSpy2 = {
    data: {
      'parameterCode': 'URL',
      'parameterDescription': 'URL EDIT',
      'parameteValue': 'URL',
      'systemGroup': 'BASE',
      'parameterStatus': 'ACT',
      'registerDate': 1663077202136
    },
    header: 'Editar parámetro'
  } as DynamicDialogConfig;

  const data = {
    'parameterCode': 'URL',
    'parameterDescription': 'URL EDIT',
    'parameteValue': 'URL',
    'systemGroup': 'BASE',
    'parameterStatus': 'ACT',
    'registerDate': 1663077202136
  };

  const dataDuplicated: Partial<ResponseVO> = {
    code: 1
  };

  const parametersModalComponent = new ParametersModalComponent(
    parametersServiceSpy,
    messageServiceSpy,
    dynamicDialogRefSpy,
    dynamicDialogConfigSpy);

  const parametersModalComponent2 = new ParametersModalComponent(
    parametersServiceSpy,
    messageServiceSpy,
    dynamicDialogRefSpy,
    dynamicDialogConfigSpy2);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ParametersModalComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
        FormsModule,
        KValidationsModule
      ],
      providers: [
        DynamicDialogRef,
        DynamicDialogConfig,
        ParametersService,
        KMessageService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should be called method ngOnInit', () => {
    parametersModalComponent.ngOnInit();
    expect(parametersModalComponent).toBeTruthy();
  });

  it('should be called method ngOnInit #IF', () => {
    parametersModalComponent2.ngOnInit();
    expect(parametersModalComponent2).toBeTruthy();
  });

  it('should be called method clickForm #If', () => {
    component.disableParameter = false;
    parametersServiceSpy.putData.and.returnValue(of(data));
    expect(parametersModalComponent).toBeTruthy();
  });

  it('should be called method clickForm', () => {
    component.disableParameter = true;
    parametersServiceSpy.postData.and.returnValue(of(data));
    expect(parametersModalComponent).toBeTruthy();
  });

  it('should be called method clickForm #ELSE #IF', () => {
    component.disableParameter = true;
    parametersServiceSpy.postData.and.returnValue(of(dataDuplicated));
    expect(parametersModalComponent).toBeTruthy();
  });

});
