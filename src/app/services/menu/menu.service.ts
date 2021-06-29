import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from 'src/app/models/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  URL_API = 'http://localhost:4000/api/menus';

  selectedMenu: Menu = {
    nameFood: '',
    foodPrice: 0,
    _id: '',
  };

  constructor(public httpCLient: HttpClient) { 
    console.log('funcaaaaaaaaaaaaaa el servico menu');
  }

  getMenus(){
    return this.httpCLient.get<Menu[]>('http://localhost:4000/api/menus');
  }

  createMenu(menu: Menu){
    return this.httpCLient.post('http://localhost:4000/api/menus', menu)
  }

  deleteMenu(_id: Menu){
    return this.httpCLient.delete(`${this.URL_API}/${_id._id}`)
  }
}
