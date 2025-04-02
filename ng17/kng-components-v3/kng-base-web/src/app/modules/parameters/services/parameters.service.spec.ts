import { ParametersService } from './parameters.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { constants } from '@const/constants';

describe('ParametersService', () => {
  let service: ParametersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(ParametersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post data and return the response', () => {
    const dummyData = { key: 'value' };
    const responseMock = { success: true };

    service.postData(dummyData).subscribe(response => {
      expect(response).toEqual(responseMock);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}${constants.SERVICES.BASE_SERVICES.APIV1.PATH}${constants.SERVICES.BASE_SERVICES.APIV1.CONTROLLERS.PARAMETERS}`
    );

    expect(req.request.method).toBe('POST');
    req.flush(responseMock);
  });

  it('should put data and return the response', () => {
    const dummyData = { key: 'value' };
    const responseMock = { success: true };

    service.putData(dummyData).subscribe(response => {
      expect(response).toEqual(responseMock);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}${constants.SERVICES.BASE_SERVICES.APIV1.PATH}${constants.SERVICES.BASE_SERVICES.APIV1.CONTROLLERS.PARAMETERS}`
    );

    expect(req.request.method).toBe('PUT');
    req.flush(responseMock);
  });

  it('should delete data and return the response', () => {
    const dummyId = '1';
    const responseMock = { success: true };

    service.deleteData(dummyId).subscribe(response => {
      expect(response).toEqual(responseMock);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}${constants.SERVICES.BASE_SERVICES.APIV1.PATH}${constants.SERVICES.BASE_SERVICES.APIV1.CONTROLLERS.PARAMETERS}` +
       `/${dummyId}`
    );

    expect(req.request.method).toBe('DELETE');
    req.flush(responseMock);
  });

  it('should post request data and return the response', () => {
    const requestPayload = { filter: 'test' };
    const responseMock = { data: 'result' };

    service.findByFilter(requestPayload).subscribe(response => {
      expect(response).toEqual(responseMock);
    });

    const req = httpMock.expectOne(
      `${service.baseUrl}${constants.SERVICES.BASE_SERVICES.APIV1.PATH}`+
      `${constants.SERVICES.BASE_SERVICES.APIV1.CONTROLLERS.PARAMETERS}/filter`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(requestPayload);
    req.flush(responseMock);
  });

});
