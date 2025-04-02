import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResponseVO } from '@ec.com.kgr/kng-components-v3/k-common';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToUpperCaseDirective, UpperCaseDirective } from '@ec.com.kgr/kng-components-v3/k-common/k-directives';
import { KValidationsModule } from '@ec.com.kgr/kng-components-v3/k-common/k-validations';
import { PersonsService } from '@persons/services/persons.service';
import { PersonVO } from '@persons/vo/persons-vo';
import { constants } from 'src/constants/constants';

/**
 * Persons modal component.
 *
 * @author components on 2024/06/18.
 * @version 1.0
 * @since 1.0.0
 */
@Component({
  selector: 'persons-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    KValidationsModule,
    ToUpperCaseDirective,
    UpperCaseDirective
  ],
  templateUrl: './persons-modal.component.html',
  styleUrls: ['./persons-modal.component.scss']
})
export class PersonsModalComponent implements OnInit {

  person: PersonVO;
  disablePersonDocument = true;

  /**
  * Constructor.
  * @param sampleService service to connect to API REST.
  * @param messageService service for message into the window.
  * @param ref reference for dialog modal.
  * @param config config for dialog modal.
  */
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private personsService: PersonsService,
    private messageService: KMessageService
  ) {
    this.person = new PersonVO();
  }

  /**
   * Init event.
   */
  ngOnInit(): void {
    if (this.config.data) {
      this.person = { ...this.config.data };
    }
    this.disablePersonDocument = true;
    if (!this.person.personId) {
      this.disablePersonDocument = false;
    }
  }

  /**
   * Action to save or update person using API REST and close modal.
   */
  clickForm() {
    if (this.person.personId) {
      this.personsService.putData(this.person).subscribe((response: ResponseVO) => {
        const data = response.data;
        this.messageService.success(constants.MESSAGES.PERSON.UPDATE+'.');
        this.closeModal(data);
      });
    } else {
      this.personsService.postData(this.person).subscribe((response: ResponseVO) => {
        if (1 === response.code) {
          this.messageService.warning('La persona ya existe con el número de cédula ' + this.person.documentNumber+'.');
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
   * @param data person info response from API REST
   */
  closeModal(data: PersonVO) {
    this.ref.close(data);
  }
}
