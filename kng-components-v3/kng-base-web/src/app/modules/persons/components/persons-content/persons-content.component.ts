import { Component, ViewChild } from '@angular/core';
import { constants } from '@const/constants';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';
import { KLayoutComponent } from '@ec.com.kgr/kng-components-v3/k-layout';
import { CommonModule } from '@angular/common';
import {
  NumbersDirective, UpperCaseDirective,
  ToUpperCaseDirective, KDirectivesModule
} from '@ec.com.kgr/kng-components-v3/k-common/k-directives';
import { FormsModule } from '@angular/forms';
import { KFieldsetComponent } from '@ec.com.kgr/kng-components-v3/k-fieldset';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { Table, TableModule } from 'primeng/table';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService } from '@ec.com.kgr/kng-components-v3/k-security';
import { ResponseVO } from '@ec.com.kgr/kng-components-v3/k-common';
import { PersonsModalComponent } from '@persons/modals/persons-modal/persons-modal.component';
import { PersonsFiltersComponent } from '@persons/components/persons-filters/persons-filters.component';
import { PersonsFilterService } from '@persons/services/persons-filter.service';
import { PersonsService } from '@persons/services/persons.service';
import { PersonVO } from '@persons/vo/persons-vo';
import { FilterVO } from '@shared/vo/filter-vo';
/**
 * Persons content module
 *
 * @author components on 2024/06/18.
 * @version 1.0
 * @since 1.0.0
 */

@Component({
  selector: 'app-persons-content',
  standalone: true,
  imports: [
    HttpClientModule,
    KLayoutComponent,
    KFieldsetComponent,
    CommonModule,
    KDirectivesModule,
    ToUpperCaseDirective,
    UpperCaseDirective,
    FormsModule,
    NumbersDirective,
    TableModule,
    PopoverModule,
    PersonsFiltersComponent,
    PersonsModalComponent,
    ConfirmDialogModule
  ],
  providers: [
    DialogService,
    ConfirmationService
  ],
  templateUrl: './persons-content.component.html',
  styleUrl: './persons-content.component.scss'
})

export class PersonsContentComponent {

  @ViewChild('dataTable', { static: false }) private dataTable: Table;
  persons: PersonVO[];
  request: FilterVO;
  ref: DynamicDialogRef;
  rows = 15;
  totalRecords: number;
  disableLinkHome: boolean = false;

  /**
   * Constructor.
   */
  constructor(
    private messageService: KMessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private userService: UserService,
    private personsService: PersonsService,
    public filterService: PersonsFilterService
  ) {
    this.request = new FilterVO();
  }

  /**
   * search event to throw pagination event.
   */
  onSearchEvent() {
    this.dataTable.clear();
  }

  /**
   * pagination event to call load data and changue datatable.
   * @param event have the page and rows of the datatable.
   */
  paginationEvent(event) {
    this.loadData((event.first / this.rows));
  }

  /**
  * load data call the API REST to get data by page and params.
  * @param page the calculated page for the API REST.
  */
  loadData(page) {
    this.request.filters = this.filterService.getFilters();
    this.request.page = page;
    this.request.size = this.rows;
    this.personsService.findByFilter(this.request).subscribe((response: ResponseVO) => {
      const data = response.data;
      if (data.content) {
        this.persons = data.content;
      } else {
        this.persons = [];
      }
      this.totalRecords = data.total;
      if (0 === data.total) {
        this.messageService.info('No se encontraron resultados con los filtros ingresados.');
      }
    });
  }

  /**
  * open the modal to  save person.
  */
  openModal() {
    this.ref = this.dialogService.open(PersonsModalComponent, {
      header: 'Agregar persona',
    });
    this.closeModal();
  }

  /**
  * open the modal to  update person.
  * @param row is the person selected
  */
  openUpdateModal(row: PersonVO) {
    this.ref = this.dialogService.open(PersonsModalComponent, {
      header: 'Editar persona',
      data: row
    });
    this.closeModal();
  }

  closeModal() {
    this.ref.onClose.subscribe((data: PersonVO) => {
      if (data) {
        this.onSearchEvent();
      }
    });
  }

  /**
  * open the confirm dualog to delete person.
  * @param is the person selected
  */
  confirmDelete(row: PersonVO) {
    this.confirmationService.confirm({
      message: row.firstName + ' ' + row.lastName + constants.MESSAGES.PERSON.CONFIRM_DELETE,
      header: 'Eliminar persona',
      accept: () => {
        this.personsService.deleteData(row.personId).subscribe(() => {
          this.onSearchEvent();
          this.messageService.success('Persona ' + row.firstName + ' ' + constants.MESSAGES.PERSON.DELETE + '.');
        });
      }
    });
  }

  logout(): void {
    this.userService.logout();
  }

  doSomething(event) {
    this.messageService.info('El usuario ha dado clic en el nombre de la aplicación.' + event);
  }

  doSomethingHome() {
    this.messageService.info('El usuario ha dado clic en el botón inicio de la aplicación.');
  }
}
