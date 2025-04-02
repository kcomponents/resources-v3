import { Injectable } from '@angular/core';
import { BaseFilterService, searchConstants as sc, SearchModel } from '@ec.com.kgr/kng-components-v3/k-search';

/**
 * Filters services for person module
 *
 * @author components
 * @version 1.0
 * @since 1.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class PersonsFilterService extends BaseFilterService {

  public firstName: SearchModel = new SearchModel(sc.DATA_TYPES.STRING.native, 'firstName');
  public lastName: SearchModel = new SearchModel(sc.DATA_TYPES.STRING.native, 'lastName');
  public documentNumber: SearchModel = new SearchModel(sc.DATA_TYPES.STRING.native, 'documentNumber');
  public email: SearchModel = new SearchModel(sc.DATA_TYPES.STRING.native, 'email');
  public createdDate: SearchModel = new SearchModel(sc.DATA_TYPES.DATE.native, 'createdDate', true, sc.selectedOption.RANGE.value);
  public status: SearchModel = new SearchModel('boolean', 'status');
  public processNumeric = new SearchModel(sc.DATA_TYPES.LONG.native, 'processNumeric', true);
  public processDecimal = new SearchModel(sc.DATA_TYPES.DECIMAL.native, 'processDecimal');
  public processNumber = new SearchModel(sc.DATA_TYPES.LONG.native, 'processNumber');
  public processTable = new SearchModel(sc.DATA_TYPES.INTEGER.native, 'processTable');
}
