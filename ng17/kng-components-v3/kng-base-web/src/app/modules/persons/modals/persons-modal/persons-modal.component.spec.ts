import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PersonsModalComponent } from './persons-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { KValidationsModule } from '@ec.com.kgr/kng-components-v3/k-common/k-validations';
import { PersonsService } from '../../services/persons.service';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { ResponseVO } from '@ec.com.kgr/kng-components-v3/k-common';
import { of } from 'rxjs';

describe('PersonsModalComponent', () => {
  let component: PersonsModalComponent;
  let fixture: ComponentFixture<PersonsModalComponent>;

  const personsServiceSpy = jasmine.createSpyObj('PersonsService', ['putData', 'postData']);
  const messageServiceSpy = jasmine.createSpyObj('KMessageService', ['success', 'warning']);
  const dynamicDialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);

  const dynamicDialogConfigSpy = {
    data: {
      personId: '1',
      documentNumber: '1234567890',
      firstName: 'LOREM',
      lastName: 'SETPU',
      email: 'b@casa.com'
    }
  } as DynamicDialogConfig;

  const data = {
    personId: '1',
    documentNumber: '1234567890',
    firstName: 'LOREM',
    lastName: 'SETPU',
    email: 'b@casa.com'
  };

  const dataDuplicated: Partial<ResponseVO> = {
    code: 1
  };

  const personsModalComponent = new PersonsModalComponent(
    dynamicDialogRefSpy,
    dynamicDialogConfigSpy,
    personsServiceSpy,
    messageServiceSpy
  );

  const personsModalComponent2 = new PersonsModalComponent(
    dynamicDialogRefSpy,
    dynamicDialogConfigSpy,
    personsServiceSpy,
    messageServiceSpy);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PersonsModalComponent,
        HttpClientTestingModule,
        FormsModule,
        KValidationsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
      ],
      providers: [
        PersonsService,
        KMessageService,
        DynamicDialogRef,
        DynamicDialogConfig
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be called method ngOnInit', () => {
    personsModalComponent.ngOnInit();
    expect(personsModalComponent).toBeTruthy();
  });

  it('should be called method ngOnInit #IF', () => {
    personsModalComponent2.ngOnInit();
    expect(personsModalComponent2).toBeTruthy();
  });

  it('should be called method clickForm #If', () => {
    personsServiceSpy.putData.and.returnValue(of(data));
    personsModalComponent.person.personId = '1';
    personsModalComponent.clickForm();
    expect(personsModalComponent).toBeTruthy();
  });

  it('should be called method clickForm', (done: DoneFn) => {
    personsServiceSpy.postData.and.returnValue(of(data));
    personsModalComponent.person.personId = null;
    personsModalComponent.clickForm();
    expect(personsModalComponent).toBeTruthy();
    done();
  });

  it('should be called method clickForm #ELSE #IF', (done: DoneFn) => {
    personsServiceSpy.postData.and.returnValue(of(dataDuplicated));
    messageServiceSpy.warning = () => {
      false;
    };
    personsModalComponent.person.personId = null;
    personsModalComponent.clickForm();
    expect(personsModalComponent).toBeTruthy();
    done();
  });
});
