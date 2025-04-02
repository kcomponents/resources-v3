import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  KSearchInputDateComponent, KSearchInputNumberComponent, KSearchInputNumericComponent,
  KSearchInputTextComponent, KSearchSelectComponent, KSearchTableComponent, OptionConfigModel
} from '@ec.com.kgr/kng-components-v3/k-search';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KFieldsetComponent } from '@ec.com.kgr/kng-components-v3/k-fieldset';
import { NumbersDirective, UpperCaseDirective, ToUpperCaseDirective } from '@ec.com.kgr/kng-components-v3/k-common/k-directives';
import { PersonsFilterService } from '@persons/services/persons-filter.service';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { KValidationsModule } from '@ec.com.kgr/kng-components-v3/k-common/k-validations';

/**
 * Persons filters module
 *
 * @author components on 2024/06/18.
 * @version 1.0
 * @since 1.0.0
 */

@Component({
  selector: 'app-persons-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    KFieldsetComponent,
    ToUpperCaseDirective,
    UpperCaseDirective,
    NumbersDirective,
    KSearchInputTextComponent,
    KSearchInputDateComponent,
    KSearchInputNumberComponent,
    KSearchInputNumericComponent,
    KSearchSelectComponent,
    KSearchTableComponent,
    PopoverModule,
    KValidationsModule
  ],
  templateUrl: './persons-filters.component.html',
  styleUrl: './persons-filters.component.scss'
})
export class PersonsFiltersComponent {
  @ViewChild('parameterCode') inputFocus;
  /** Output event */
  @Output() onSearchEvent: EventEmitter<any> = new EventEmitter();
  @Output() change = new EventEmitter<any>();
  optionSettings: OptionConfigModel = new OptionConfigModel(true, true, true);
  rangeOptionSettings: OptionConfigModel = new OptionConfigModel(true, true, true);
  statusList: Array<any>;

  constructor(
    public personsFilterService: PersonsFilterService) {
    this.findStatus();
    this.personsFilterService.status.parameterValue = 'TODOS';
  }

  /**
   * Clean filters before to leave view.
   */
  ngOnDestroy() {
    this.cleanFilters();
    this.personsFilterService.cleanFilters();
  }

  /**
   * Search action to call search event.
   */
  clickSearch() {
    this.onSearchEvent.emit();
  }

  /**
   * Clean filters action dispatch event.
   */
  cleanFilters() {
    this.personsFilterService.cleanFilters();
    this.personsFilterService.status.parameterValue = 'TODOS';
    this.findStatus();
  }

  /**
   * Find status.
   */
  findStatus() {
    this.statusList = [
      {
        'status': 'Todos',
        'value': 'TODOS'
      },
      {
        'status': 'Activo',
        'value': 'true'
      },
      {
        'status': 'Inactivo',
        'value': 'false'
      }
    ];
  }

}
