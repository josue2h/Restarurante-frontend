import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/Sale';
import { NgForm } from '@angular/forms'
import { SaleService } from '../../services/sale/sale.service'
import { Menu } from 'src/app/models/Menu';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  sales: Sale[] = [];
  menus: Menu[] = [];
  total: number = 0;
  orderDescription: string = '';

  salej: Sale = {
    nameClient: '',
    salePrice: 0,
    description: '',
    _id: '',
  };

  ngOnInit(): void {
    this.saleService.getMenu().subscribe(data => {
      this.menus = data;
    }
    )

  }
  constructor(public saleService: SaleService) { }

  addOrder(menu: Menu) {
    this.total += menu.foodPrice;
    this.orderDescription += menu.nameFood + ", ";
    this.salej.salePrice = this.total;
    this.salej.description = this.orderDescription;
  }

  addSale(form: NgForm) {
    form.value.salePrice = this.salej.salePrice;
    form.value.description = this.salej.description;
    if (form.value.nameClient == '') {
      alert('Ingrese el nombre de cliente.');
    } else {
      if (form.value.salePrice == 0) {
        alert('Compre algun platillo.');
      } else {
        if (form.value.description == '') {
          alert('Compre algun platillo.');
        } else {
          console.log(form.value);
          this.saleService.createSale(form.value).subscribe(
            res => console.log(res),
            err => console.error(err)
          )
          alert('Gracias por su compra');
          form.reset();
          this.salej = {
            nameClient: '',
            salePrice: 0,
            description: '',
            _id: '',
          };
        }
      }
    }
  }


}
