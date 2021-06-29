import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Menu } from 'src/app/models/Menu';
import { Sale } from 'src/app/models/Sale';

import { SaleService } from './sale.service';

const expectedSale: Sale[] =
  [{
    _id: "60d7fa007ca9fa29c830be62",
    nameClient: "tania",
    salePrice: 6,
    description: "60 platos",
    createdAt: "2021-06-27T04:09:36.635Z",
    updatedAt: "2021-06-27T04:09:36.635Z"
  }, {
    _id: "60d7fbdc7ca9fa29c830be6a",
    nameClient: "doris",
    salePrice: 70,
    description: "7 platos",
    createdAt: "2021-06-27T04:17:32.674Z",
    updatedAt: "2021-06-27T04:17:32.674Z"
  }];

const expectedMenu: Menu[] = [
  {
    _id: "60d807223cf55a31c47dde79",
    nameFood: "picante",
    foodPrice: 25,
    createdAt: "2021-06-27T05:05:38.267Z",
    updatedAt: "2021-06-27T05:06:33.644Z"
  },
  {
    _id: "60d8ea734b8a3e225c7032ec",
    nameFood: "pique",
    foodPrice: 50,
    createdAt: "2021-06-27T21:15:31.748Z",
    updatedAt: "2021-06-27T21:15:31.748Z"
  }
];
// Prueba getData
describe('SaleService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: SaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SaleService(httpClientSpy as any);
  });

  it('should return expected service (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(expectedSale));

    service.getData().subscribe(
      sales => {
        console.log(sales);
        expect(sales).toEqual(expectedSale, 'expected sales');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  xit('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue((errorResponse));

    service.getData().subscribe(
      sales => done.fail('expected an error, not sales'),
      error => {
        expect(error.message).toContain('test 404 error');
        done();
      }
    );
  });
});


// Prueba getMenu
describe('SaleService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: SaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SaleService(httpClientSpy as any);
  });

  it('should return expected service (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(expectedMenu));

    service.getMenu().subscribe(
      sales => {
        console.log(sales);
        expect(sales).toEqual(expectedMenu, 'expected sales');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});


  // Prueba createMenu
  describe('SaleService', () => {
    let httpClientSpy: { post: jasmine.Spy };
    let service: SaleService;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
      service = new SaleService(httpClientSpy as any);
    });

    it('the expected message should return (HttpClient called once)', (done: DoneFn) => {

      httpClientSpy.post.and.returnValue(of('menu guardado'));

      service.createMenu(expectedSale[0]).subscribe(
        menus => {
          expect(menus).toEqual('menu guardado', 'expected menus');
          done();
        },
        done.fail
      );
      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
  });


  // Prueba createSale
  describe('SaleService', () => {
    let httpClientSpy: { post: jasmine.Spy };
    let service: SaleService;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
      service = new SaleService(httpClientSpy as any);
    });

    it('the expected message should return (HttpClient called once)', (done: DoneFn) => {

      httpClientSpy.post.and.returnValue(of('venta realizada'));

      service.createSale(expectedSale[0]).subscribe(
        sales => {
          console.log(sales);
          expect(sales).toEqual('venta realizada', 'expected sales');
          done();
        },
        done.fail
      );
      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
  });

  // Prueba deleteMenu
  describe('SaleService', () => {
    let httpClientSpy: { delete: jasmine.Spy };
    let service: SaleService;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);
      service = new SaleService(httpClientSpy as any);
    });

    it('the expected message should return (HttpClient called once)', (done: DoneFn) => {

      httpClientSpy.delete.and.returnValue(of('venta eliminada'));

      service.deleteMenu(expectedSale[0]).subscribe(
        sales => {
          console.log(sales);
          expect(sales).toEqual('venta eliminada', 'expected sales');
          done();
        },
        done.fail
      );
      expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
    });
  });
