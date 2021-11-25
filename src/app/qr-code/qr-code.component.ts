import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  constructor(private route: ActivatedRoute, public router: Router) { }
  link;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  header = 'blank';
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (localStorage.getItem('sluid')) {
        this.value = localStorage.getItem('sluid');
      }
    });
  }

  close(){
    console.log('here')
    this.router.navigate(['documents']);
  }

 
}
