import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from '../../models/Sale';
import { Menu } from 'src/app/models/Menu';

@Injectable({
  providedIn: 'root',
})
export class SaleService {

  selectedSale: Sale = {
    nameClient: '',
    salePrice: 0,
    description: '',
    _id: '',
  };

  URL_API = 'http://localhost:4000/api/sales';

  constructor(private httpCliente: HttpClient) { 
    console.log('funcaaaaaaaaaaaaaa el servico sale');
  }

  getData(){
    return this.httpCliente.get<Sale[]>('http://localhost:4000/api/sales')
  }

  getMenu(){
    return this.httpCliente.get<Menu[]>('http://localhost:4000/api/menus')
  }

  createMenu(sale: Sale){
    return this.httpCliente.post('http://localhost:4000/api/sales', sale)
  }

  createSale(sale: Sale){
    return this.httpCliente.post('http://localhost:4000/api/sales', sale)
  }

  deleteMenu(_id: Sale){
    return this.httpCliente.delete(`${this.URL_API}/${_id._id}`)
  }

}
