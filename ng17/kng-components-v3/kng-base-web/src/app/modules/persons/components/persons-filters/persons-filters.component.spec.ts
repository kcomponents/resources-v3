import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsFiltersComponent } from './persons-filters.component';
import { FormsModule } from '@angular/forms';
import { KFieldsetComponent } from '@ec.com.kgr/kng-components-v3/k-fieldset';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { KSearchInputDateComponent, KSearchInputNumberComponent, KSearchInputNumericComponent, KSearchInputTextComponent,
  KSearchSelectComponent, KSearchTableComponent } from '@ec.com.kgr/kng-components-v3/k-search';
import { PersonsFilterService } from '../../services/persons-filter.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('PersonsFiltersComponent', () => {
  let component: PersonsFiltersComponent;
  let fixture: ComponentFixture<PersonsFiltersComponent>;
  let de: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PersonsFiltersComponent,
        FormsModule,
        KFieldsetComponent,
        KSearchInputTextComponent,
        KSearchInputDateComponent,
        KSearchInputNumberComponent,
        KSearchInputNumericComponent,
        KSearchSelectComponent,
        KSearchTableComponent,
        PopoverModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
        NoopAnimationsModule,
      ],
      providers: [
        PersonsFilterService,
        KMessageService,
        ToastrService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PersonsFiltersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(PersonsFiltersComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.destroy();
  });

  it('should render title "Filtros de búsqueda"', () => {
    fixture = TestBed.createComponent(PersonsFiltersComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h5')?.textContent).toContain('Filtros de búsqueda');
  });

  it('should have a form', () => {
    const formElement = de.query(By.css('form'));
    expect(formElement).toBeTruthy();
  });

  it('should have an input text for firstName', () => {
    const inputElement = de.query(By.css('k-search-input-text[id="firstName"]'));
    expect(inputElement).toBeTruthy();
  });

  it('should have an input text for lastName', () => {
    const inputElement = de.query(By.css('k-search-input-text[id="lastName"]'));
    expect(inputElement).toBeTruthy();
  });

  it('should be valid when documentNumber has a value', () => {
    const parameterDescription = component.personsFilterService.documentNumber;
    parameterDescription.parameterValue = '1313672154';
    expect(component.personsFilterService.documentNumber.parameterValue).toBeTruthy();
  });
});
