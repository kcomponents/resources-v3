import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from '@const/constants';
import { BaseService } from '@ec.com.kgr/kng-components-v3/k-common/k-services';

/**
 * Article service
 *
 * @author components on 2025/03/27.
 * @version 1.0
 * @since 1.0.0
 */

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseService {

  /**
   * Constructor.
   * @param http HttpClient.
   */
  constructor() {
    super();
    this.baseUrl = constants.SERVICES.BASE_SERVICES.CONTEXT;
  }

  /**
   * Method POST
   * @param obj the body of request
   */
  postData(obj: any): Observable < any > {
    return this.http.post(this.baseUrl +
      `${constants.SERVICES.BASE_SERVICES.APIV1.PATH}${ constants.SERVICES.BASE_SERVICES.APIV1.CONTROLLERS.PERSONS } `, obj);
  }

  /**
   * Method PUT
   * @param obj the body of request
   */
  putData(obj: any): Observable<any> {
    return this.http.put(this.baseUrl +
      `${ constants.SERVICES.BASE_SERVICES.APIV1.PATH }${ constants.SERVICES.BASE_SERVICES.APIV1.CONTROLLERS.PERSONS } `, obj);
  }

  /**
   * Method DELETE
   * @param id HttpParams for query search
   */
  deleteData(id: string): Observable<any> {
    return this.http.delete(this.baseUrl +
      `${ constants.SERVICES.BASE_SERVICES.APIV1.PATH }${ constants.SERVICES.BASE_SERVICES.APIV1.CONTROLLERS.PERSONS }/${id}`);
}

/**
* Method POST
* SearchModel, paged
* @param request the body of request
*/
findByFilter(request: any): Observable < any > {
  return this.http.post(this.baseUrl + `${constants.SERVICES.BASE_SERVICES.APIV2.PATH}` +
      `${ constants.SERVICES.BASE_SERVICES.APIV2.CONTROLLERS.PERSONS } `, request);
  }
}
