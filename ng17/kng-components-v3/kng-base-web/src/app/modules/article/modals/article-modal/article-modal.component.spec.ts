import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { KValidationsModule } from '@ec.com.kgr/kng-components-v3/k-common/k-validations';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { ResponseVO } from '@ec.com.kgr/kng-components-v3/k-common';
import { of } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { ArticleModalComponent } from './article-modal.component';


describe('ArticleModalComponent', () => {
  let component: ArticleModalComponent;
  let fixture: ComponentFixture<ArticleModalComponent>;

  const personsServiceSpy = jasmine.createSpyObj('ArticleService', ['putData', 'postData']);
  const messageServiceSpy = jasmine.createSpyObj('KMessageService', ['success', 'warning']);
  const dynamicDialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);

  const dynamicDialogConfigSpy = {
    data: {
      articleId: '1',
      documentNumber: '1234567890',
      firstName: 'LOREM',
      lastName: 'SETPU',
      email: 'b@casa.com'
    }
  } as DynamicDialogConfig;

  const dynamicDialogConfigSpy2 = {
    data: {
      articleId: '1',
      documentNumber: '1234567890',
      firstName: 'LOREM',
      lastName: 'SETPU',
      email: 'b@casa.com'
    },
    header: 'Editar persona'
  } as DynamicDialogConfig;

  const data = {
    articleId: '1',
    documentNumber: '1234567890',
    firstName: 'LOREM',
    lastName: 'SETPU',
    email: 'b@casa.com'
  };

  const dataDuplicated: Partial<ResponseVO> = {
    code: 1
  };

  const personsModalComponent = new ArticleModalComponent(
    personsServiceSpy,
    messageServiceSpy,
    dynamicDialogRefSpy,
    dynamicDialogConfigSpy);

  const personsModalComponent2 = new ArticleModalComponent(
    personsServiceSpy,
    messageServiceSpy,
    dynamicDialogRefSpy,
    dynamicDialogConfigSpy2);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleModalComponent,
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
        ArticleService,
        KMessageService,
        DynamicDialogRef,
        DynamicDialogConfig
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleModalComponent);
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
    personsModalComponent.article.articleId = '1';
    personsModalComponent.clickForm();
    expect(personsModalComponent).toBeTruthy();
  });

  it('should be called method clickForm', (done: DoneFn) => {
    personsServiceSpy.postData.and.returnValue(of(data));
    personsModalComponent.article.articleId = null;
    personsModalComponent.clickForm();
    expect(personsModalComponent).toBeTruthy();
    done();
  });

  it('should be called method clickForm #ELSE #IF', (done: DoneFn) => {
    personsServiceSpy.postData.and.returnValue(of(dataDuplicated));
    messageServiceSpy.warning = () => {
      false;
    };
    personsModalComponent.article.articleId = null;
    personsModalComponent.clickForm();
    expect(personsModalComponent).toBeTruthy();
    done();
  });
});
