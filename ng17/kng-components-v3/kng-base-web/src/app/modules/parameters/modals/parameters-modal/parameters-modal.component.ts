import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResponseVO } from '@ec.com.kgr/kng-components-v3/k-common';
import { KMessageService } from '@ec.com.kgr/kng-components-v3/k-common/k-message';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ParametersService } from '@parameters/services/parameters.service';
import { ParameterVo } from '@parameters/vo/parameter-vo';
import { constants } from '@const/constants';
import { ToUpperCaseDirective, UpperCaseDirective } from '@ec.com.kgr/kng-components-v3/k-common/k-directives';
import { KValidationsModule } from '@ec.com.kgr/kng-components-v3/k-common/k-validations';

/**
 * Parameters modal module
 *
 * @author components on 2024/06/18.
 * @version 1.0
 * @since 1.0.0
 */

@Component({
  selector: 'app-parameters-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    KValidationsModule,
    ToUpperCaseDirective,
    UpperCaseDirective
  ],
  templateUrl: './parameters-modal.component.html',
  styleUrls: ['./parameters-modal.component.scss']
})
export class ParametersModalComponent implements OnInit {

  parameter: ParameterVo;
  disableParameter = false;

  /**
    * Constructor.
    * @param sampleService service to connect to API REST.
    * @param messageService service for message into the window.
    * @param ref reference for dialog modal.
    * @param config config for dialog modal.
    */
  constructor(
    private parametersService: ParametersService,
    private messageService: KMessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.parameter = new ParameterVo();
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.parameter = { ...this.config.data };
    }
    this.disableParameter = true;
    if (!this.parameter.parameterCode) {
      this.disableParameter = false;
    }
  }

  clickForm() {
    if (this.disableParameter) {
      this.parametersService.putData(this.parameter)
        .subscribe((response: ResponseVO) => {
          const data = response.data;
          this.messageService.success(constants.MESSAGES.PARAMETERS.UPDATE + '.');
          this.closeModal(data);
        });
    } else {
      this.parametersService.postData(this.parameter)
        .subscribe((response: ResponseVO) => {
          const data = response.data;
          if (1 === response.code) {
            this.messageService.warning('El catálogo ya existe con el numero de código ' + this.parameter.parameteValue + '.');
          } else {
            this.messageService.success(constants.MESSAGES.PARAMETERS.SAVE + '.');
            this.closeModal(data);
          }
        });
    }
  }

  /**
 * Action to close modal
 * @param data person info response from API REST
 */
  closeModal(data?: ParameterVo) {
    this.ref.close(data);
  }
}
