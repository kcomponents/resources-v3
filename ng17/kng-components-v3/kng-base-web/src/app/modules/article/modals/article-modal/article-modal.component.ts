import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResponseVO } from '@ec.com.kgr/kng-components-v3/k-common';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { constants } from 'src/constants/constants';
import { ToUpperCaseDirective, UpperCaseDirective } from '@ec.com.kgr/kng-components-v3/k-common/k-directives';
import { KValidationsModule } from '@ec.com.kgr/kng-components-v3/k-common/k-validations';
import { ArticleService } from '../../services/article.service';
import { ArticleVO } from '../../vo/article-vo';

/**
 * Article modal component.
 *
 * @author components on 2025/03/27.
 * @version 1.0
 * @since 1.0.0
 */
@Component({
  selector: 'article-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    KValidationsModule,
    ToUpperCaseDirective,
    UpperCaseDirective
  ],
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent implements OnInit {

  article: ArticleVO;
  enableArticleDocument = false;

  /**
  * Constructor.
  * @param sampleService service to connect to API REST.
  * @param messageService service for message into the window.
  * @param ref reference for dialog modal.
  * @param config config for dialog modal.
  */
  constructor(
    private service: ArticleService,
    private messageService: KMessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.article = new ArticleVO();
  }

  /**
   * Init event.
   */
  ngOnInit(): void {
    if (this.config.header === 'Editar article') {
      this.enableArticleDocument = true;
    } else {
      this.enableArticleDocument = false;
    }
    if (this.config.data) {
      this.article = { ...this.config.data };
    }
  }

  /**
   * Action to save or update article using API REST and close modal.
   */
  clickForm() {
    if (this.article.articleId) {
      this.service.putData(this.article)
        .subscribe((response: ResponseVO) => {
          const data = response.data;
          this.messageService.success(constants.MESSAGES.PERSON.UPDATE+'.');
          this.closeModal(data);
        });
    } else {
      this.service.postData(this.article)
        .subscribe((response: ResponseVO) => {
          if (1 === response.code) {
            this.messageService.warning('La article ya existe con el número de cédula ' + this.article.documentNumber+'.');
          } else {
            const data = response.data;
            this.messageService.success(constants.MESSAGES.PERSON.SAVE+'.');
            this.closeModal(data);
          }
        });
    }
  }

  /**
   * Action to close modal
   *
   * @param data article info response from API REST
   */
  closeModal(data: ArticleVO) {
    this.ref.close(data);
  }
}
