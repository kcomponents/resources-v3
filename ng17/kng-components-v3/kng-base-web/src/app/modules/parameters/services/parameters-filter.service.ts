import { Injectable } from '@angular/core';
import { BaseFilterService, searchConstants as sc, SearchModel } from '@ec.com.kgr/kng-components-v3/k-search';

/**
 * Parameters filter service
 *
 * @author components on 2024/06/18.
 * @version 1.0
 * @since 1.0.0
 */

@Injectable({
  providedIn: 'root'
})
export class ParametersFilterService extends BaseFilterService {

  public parameterCode: SearchModel = new SearchModel(sc.DATA_TYPES.STRING.native, 'parameterCode', null, sc.selectedOption.LIST.value);
  public parameterDescription: SearchModel = new SearchModel(sc.DATA_TYPES.STRING.native, 'parameterDescription');
  public parameterStatus: SearchModel = new SearchModel(sc.DATA_TYPES.STRING.native, 'parameterStatus');
  public registerDate: SearchModel = new SearchModel(sc.DATA_TYPES.DATE.native, 'registerDate', true, sc.selectedOption.RANGE.value);

}
