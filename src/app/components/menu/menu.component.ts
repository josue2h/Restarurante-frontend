import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/Sale';
import { NgForm } from '@angular/forms'

import { MenuService } from 'src/app/services/menu/menu.service';
import { Menu } from 'src/app/models/Menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  ngOnInit(): void {
    /*this.saleService.getData().subscribe(data =>{
      this.sales = data;
    })*/
    this.menuService.getMenus().subscribe(data =>{
      this.menus = data;
    });
  }

  menus: Menu[] = [];

  constructor(public menuService: MenuService) {
    
  }

  addMenu(form: NgForm){
    //console.log(form.value)
    this.menuService.createMenu(form.value).subscribe(
      res =>{
        this.menuService.getMenus().subscribe(data =>{
          this.menus = data;
        });
        form.reset();
      },
      err => console.error(err)
    )
  }

  deleteMenu(menu: Menu){
    if(confirm('Esta seguro de eliminar el platillo ?')){
      this.menuService.deleteMenu(menu).subscribe(
        (res) => {
          this.menuService.getMenus().subscribe(data =>{
            this.menus = data;
          });
        },
        (err) => console.error(err)
      );
    }
  }


}
