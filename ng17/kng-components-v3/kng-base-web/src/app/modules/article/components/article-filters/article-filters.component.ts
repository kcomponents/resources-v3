import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  KSearchInputDateComponent, KSearchInputNumberComponent, KSearchInputNumericComponent,
  KSearchInputTextComponent, KSearchSelectComponent, KSearchTableComponent,OptionConfigModel, PrimeNgEs
} from '@ec.com.kgr/kng-components-v3/k-search';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KFieldsetComponent } from '@ec.com.kgr/kng-components-v3/k-fieldset';
import { NumbersDirective, UpperCaseDirective, ToUpperCaseDirective } from '@ec.com.kgr/kng-components-v3/k-common/k-directives';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { KValidationsModule } from '@ec.com.kgr/kng-components-v3/k-common/k-validations';
import { ArticleFilterService } from '../../services/article-filter.service';


/**
 * Article filters module
 *
 * @author components on 2025/03/27.
 * @version 1.0
 * @since 1.0.0
 */

@Component({
  selector: 'app-article-filters',
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
  templateUrl: './article-filters.component.html',
  styleUrl: './article-filters.component.scss'
})
export class ArticleFiltersComponent {

  /** Output event */
  @Output() onSearchEvent: EventEmitter<any> = new EventEmitter();
  @Output() change = new EventEmitter<any>();
  statusList: Array<any>;
  es = PrimeNgEs;

  optionSettings: OptionConfigModel = new OptionConfigModel(true, true, true);
  rangeOptionSettings: OptionConfigModel = new OptionConfigModel(true, true, true);

  constructor(
    public articleFilterService: ArticleFilterService) {
    this.findStatus();
    this.articleFilterService.status.parameterValue = 'TODOS';
  }

  /**
   * Clean filters before to leave view.
   */
  ngOnDestroy() {
    this.cleanFilters();
    this.articleFilterService.cleanFilters();
  }

  /**
   * Clean filters action dispatch event.
   */
  cleanFilters() {
    this.articleFilterService.cleanFilters();
    this.articleFilterService.status.parameterValue = 'TODOS';
    this.findStatus();
  }

  /**
   * Search action to call search event.
   */
  clickSearch() {
    this.onSearchEvent.emit();
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
