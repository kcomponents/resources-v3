import { Component, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import {
  KSearchInputDateComponent, KSearchInputNumberComponent,
  KSearchInputNumericComponent, KSearchInputTextComponent, KSearchSelectComponent, KSearchTableComponent,
  OptionConfigModel, PrimeNgEs, DispatchEvent, KSearchDispatch, searchConstants
} from '@ec.com.kgr/kng-components-v3/k-search';
import { ParametersFilterService } from '@app/modules/parameters/services/parameters-filter.service';
import { KFieldsetComponent } from '@ec.com.kgr/kng-components-v3/k-fieldset';
import { NumbersDirective, UpperCaseDirective, ToUpperCaseDirective } from '@ec.com.kgr/kng-components-v3/k-common/k-directives';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { KValidationsModule } from '@ec.com.kgr/kng-components-v3/k-common/k-validations';

/**
 * Parameters filters module
 *
 * @author components on 2024/06/18.
 * @version 1.0
 * @since 1.0.0
 */

@Component({
  selector: 'app-parameters-filters',
  standalone: true,
  imports: [
    KSearchInputTextComponent,
    KSearchInputDateComponent,
    KSearchInputNumberComponent,
    KSearchInputNumericComponent,
    KSearchSelectComponent,
    KSearchTableComponent,
    KFieldsetComponent,
    FormsModule,
    NumbersDirective,
    UpperCaseDirective,
    ToUpperCaseDirective,
    PopoverModule,
    KValidationsModule
  ],
  templateUrl: './parameters-filters.component.html',
  styleUrl: './parameters-filters.component.scss'
})
export class ParametersFiltersComponent implements OnDestroy {
  @ViewChild('parameterCode') inputFocus;
  /** Output event */
  @Output() onSearchEvent: EventEmitter<any> = new EventEmitter();
  @Output() change = new EventEmitter<any>();
  statusList: Array<any>;
  es = PrimeNgEs;

  optionSettings: OptionConfigModel = new OptionConfigModel(true, false, true);
  rangeOptionSettings: OptionConfigModel = new OptionConfigModel(true, true, true);
  dispatchEventParameterCode;
  dispatchEventParameterDescription;
  dispatchEventParameterStatus;
  dispatchEventRegisterDate;

  /**
   * Constructor.
   * @param filterService filters from search inputs.
   */
  constructor(
    public parametersFilterService: ParametersFilterService
  ) {
    this.findStatus();
    this.parametersFilterService.parameterStatus.parameterValue = 'TODOS';
    this.dispatchEventParameterDescription =
      [new DispatchEvent(KSearchDispatch.UPDATE_COMPARATOR_TYPE, searchConstants.comparatorTypeEnum.CONTAINS)];
  }

  /**
   * Clean filters before to leave view.
   */
  ngOnDestroy() {
    this.cleanFilters();
    this.parametersFilterService.cleanFilters();
  }

  /**
   * Clean filters action dispatch event.
   */
  cleanFilters() {
    this.dispatchEventParameterCode = [new DispatchEvent(KSearchDispatch.CLEAN_FILTER)];
    this.dispatchEventParameterDescription =
      [new DispatchEvent(KSearchDispatch.CLEAN_FILTER),
        new DispatchEvent(KSearchDispatch.UPDATE_COMPARATOR_TYPE, searchConstants.comparatorTypeEnum.CONTAINS)];
    this.dispatchEventRegisterDate = [new DispatchEvent(KSearchDispatch.CLEAN_FILTER)];
    this.dispatchEventParameterStatus = [new DispatchEvent(KSearchDispatch.UPDATE_PARAMETER_VALUE, 'TODOS')];
  }

  /**
   * Search action to call search event.
   */
  clickSearch() {
    this.onSearchEvent.emit();
  }

  /**
   * Find tatus.
   */
  findStatus() {
    this.statusList = [
      {
        'status': 'Todos',
        'value': 'TODOS'
      },
      {
        'status': 'Activo',
        'value': 'ACT'
      },
      {
        'status': 'Inactivo',
        'value': 'INA'
      }
    ];
  }
}
