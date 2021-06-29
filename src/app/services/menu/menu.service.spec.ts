import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Menu } from 'src/app/models/Menu';

import { MenuService } from './menu.service';

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

// Prueba getMenus
describe('MenuService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new MenuService(httpClientSpy as any);
  });

  it('should return expected service (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(expectedMenu));

    service.getMenus().subscribe(
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
describe('MenuService', () => {
  let httpClientSpy: { post: jasmine.Spy };
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new MenuService(httpClientSpy as any);
  });

  it('the expected message should return (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of('menu guardado'));

    service.createMenu(expectedMenu[0]).subscribe(
      sales => {
        console.log(sales);
        expect(sales).toEqual('menu guardado', 'expected menu');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });
});


// Prueba deleteMenu
describe('MenuService', () => {
  let httpClientSpy: { delete: jasmine.Spy };
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);
    service = new MenuService(httpClientSpy as any);
  });

  it('the expected message should return (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(of('menu eliminado'));

    service.deleteMenu(expectedMenu[0]).subscribe(
      sales => {
        console.log(sales);
        expect(sales).toEqual('menu eliminado', 'expected menu');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });
});
