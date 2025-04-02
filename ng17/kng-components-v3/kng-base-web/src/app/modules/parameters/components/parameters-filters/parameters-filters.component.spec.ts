import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersFiltersComponent } from './parameters-filters.component';
import { KSearchInputDateComponent, KSearchInputNumberComponent, KSearchInputNumericComponent, KSearchInputTextComponent,
  KSearchSelectComponent, KSearchTableComponent } from '@ec.com.kgr/kng-components-v3/k-search';
import { KFieldsetComponent } from '@ec.com.kgr/kng-components-v3/k-fieldset';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ParametersFilterService } from '../../services/parameters-filter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ParametersFiltersComponent', () => {
  let component: ParametersFiltersComponent;
  let fixture: ComponentFixture<ParametersFiltersComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ParametersFiltersComponent,
        HttpClientTestingModule,
        KSearchInputTextComponent,
        KSearchInputDateComponent,
        KSearchInputNumberComponent,
        KSearchInputNumericComponent,
        KSearchSelectComponent,
        KSearchTableComponent,
        KFieldsetComponent,
        FormsModule,
        PopoverModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
        NoopAnimationsModule
      ],
      providers: [
        ParametersFilterService,
        KMessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ParametersFiltersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    const formElement = de.query(By.css('form'));
    expect(formElement).toBeTruthy();
  });

  it('should have an input text for parameterCode', () => {
    const inputElement = de.query(By.css('k-search-input-text[id="parameterCode"]'));
    expect(inputElement).toBeTruthy();
  });

  it('should have an input text for description', () => {
    const inputElement = de.query(By.css('k-search-input-text[id="description"]'));
    expect(inputElement).toBeTruthy();
  });

  it('should be valid when parameterDescription has a value', () => {
    const parameterDescription = component.parametersFilterService.parameterDescription;
    parameterDescription.parameterValue = '1';
    expect(component.parametersFilterService.parameterDescription.parameterValue).toBeTruthy();
  });

});
