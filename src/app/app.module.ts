import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route} from '@angular/router';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { SaleComponent } from './components/sale/sale.component';
import { MenuComponent } from './components/menu/menu.component';


import { SaleService } from './services/sale/sale.service';
import { MenuService } from './services/menu/menu.service';
import { DailyReportComponent } from './components/daily-report/daily-report.component';

const routes: Route[] = [
  {path: 'sale', component: SaleComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'report', component: DailyReportComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    SaleComponent,
    MenuComponent,
    DailyReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SaleService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
