import { Component, ViewChild } from '@angular/core';
import { constants } from '@const/constants';
import { ResponseVO } from '@ec.com.kgr/kng-components-v3/k-common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';
import { KLayoutComponent } from '@ec.com.kgr/kng-components-v3/k-layout';
import { CommonModule } from '@angular/common';
import { KDirectivesModule } from '@ec.com.kgr/kng-components-v3/k-common/k-directives';
import { FormsModule } from '@angular/forms';
import { KFieldsetComponent } from '@ec.com.kgr/kng-components-v3/k-fieldset';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { Table, TableModule } from 'primeng/table';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService } from '@ec.com.kgr/kng-components-v3/k-security';
import { FilterVO } from '@ec.com.kgr/kng-components-v3/k-search';
import { ArticleFiltersComponent  } from '../article-filters/article-filters.component';
import { ArticleFilterService } from '../../services/article-filter.service';
import { ArticleService } from '../../services/article.service'
import { ArticleVO } from '../../vo/article-vo';
import { ArticleModalComponent } from '../../modals/article-modal/article-modal.component';


/**
 * Article content module
 *
 * @author components on 2025/03/27.
 * @version 1.0
 * @since 1.0.0
 */

@Component({
  selector: 'app-article-content',
  standalone: true,
  imports: [
    HttpClientModule,
    KLayoutComponent,
    KFieldsetComponent,
    CommonModule,
    KDirectivesModule,
    FormsModule,
    TableModule,
    PopoverModule,
    ConfirmDialogModule,
    ArticleFiltersComponent
  ],
  providers: [
    DialogService,
    ConfirmationService
  ],
  templateUrl: './article-content.component.html',
  styleUrl: './article-content.component.scss'
})

export class ArticleContentComponent {

  @ViewChild('dataTable', { static: false }) private dataTable: Table;

  rows = 15;
  values: ArticleVO[];
  totalRecords: number;
  request: FilterVO;
  ref: DynamicDialogRef;

  /**
   * Constructor.
   */
  constructor(
    private messageService: KMessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private userService: UserService,
    public filterService: ArticleFilterService,
    private service: ArticleService
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
    this.service.findByFilter(this.request).subscribe((response: ResponseVO) => {
      const data = response.data;
      if (data.content) {
        this.values = data.content;
      } else {
        this.values = [];
      }
      this.totalRecords = data.total;
      if (0 === data.total) {
        this.messageService.info('No se encontraron resultados con los filtros ingresados.');
      }
    });
  }

  /**
  * open the modal to save person.
  */
  openSaveModal() {
    this.ref = this.dialogService.open(ArticleModalComponent, {
      header: 'Agregar article',
    });
    this.closeModal();
  }

  /**
  * open the modal to update article.
  * @param row is the article selected
  */
  openUpdateModal(row: ArticleVO) {
    this.ref = this.dialogService.open(ArticleModalComponent, {
      header: 'Editar article',
      data: row
    });
    this.closeModal();
  }

  closeModal() {
    this.ref.onClose.subscribe((data: ArticleVO) => {
      if (data) {
        this.onSearchEvent();
      }
    });
  }

  /**
  * open the confirm dualog to delete article.
  * @param is the article selected
  */
  confirmDelete(row: ArticleVO) {
    this.confirmationService.confirm({
      message: row.firstName + ' ' + row.lastName + constants.MESSAGES.PERSON.CONFIRM_DELETE,
      header: 'Eliminar article',
      accept: () => {
        this.service.deleteData(row.articleId).subscribe(() => {
          this.onSearchEvent();
          this.messageService.success('Article ' + row.firstName + ' ' + constants.MESSAGES.PERSON.DELETE + '.');
        });
      }
    });
  }

  logout(): void {
    this.userService.logout();
  }

}
