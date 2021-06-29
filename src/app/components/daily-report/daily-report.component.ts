import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/Sale';
import { SaleService } from 'src/app/services/sale/sale.service';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {

  
  dailyReports: Sale[]=[];
  constructor(public saleService: SaleService) { }

  ngOnInit(): void {
    this.getReport();
    
  }

  getReport(){
    this.saleService.getData().subscribe(data =>{
      this.dailyReports = data;
    })
  }

  async downloadPDF() {
    // Extraemos el
    const DATA: any = await document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

}
