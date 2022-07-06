import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { DomSanitizer,SafeHtml } from "@angular/platform-browser";
import { SafeUrl } from "@angular/platform-browser";


@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit {
  item:any;
  recordItems: any;
  vcOsid: any;
  headerName: string = 'records'
  //headerName : string = 'issuer';
  newName="hello";
  documentName: string;
  pdfName: any;

  
  public data: any;
  sampleData: any;
  schemaContent: any;
  userJson: any;
  userHtml: any = '';
  templateName: any;
  issuerOsid: string;
  oldTemplateName: string;
  description: any;
  pdfResponse : any;
  pdfResponse2 : any;
  sanitizer: DomSanitizer;
  base64data:any;
  base64String: string;
  imagePath:any;
 
  constructor(public router: Router, public route: ActivatedRoute,public translate: TranslateService,sanitizer: DomSanitizer,
    public generalService: GeneralService,public http: HttpClient) {
      this.sanitizer = sanitizer;
      this.documentName = this.route.snapshot.paramMap.get('document'); 
      console.log(this.documentName);
      this.vcOsid = this.route.snapshot.paramMap.get('id'); 
      console.log(this.vcOsid);

     
     
      this.userHtml = '';
  
  
      if (localStorage.getItem('sampleData')) {
        this.sampleData = JSON.parse(localStorage.getItem('sampleData'));
      } else {
        this.sampleData = this.router.getCurrentNavigation().extras.state.item;
        localStorage.setItem('sampleData', JSON.stringify(this.sampleData));
      }
  
      this.generalService.getData('/Issuer').subscribe((res) => {
  
        this.issuerOsid = res[0].osid;
      });
}

async ngOnInit() {
 
  this.userHtml = '';
  await this.readHtmlSchemaContent(this.sampleData);
  this.injectHTML();


}

downloadPDF() {
  this.pdfName =  this.documentName;
  let headerOptions = new HttpHeaders({
    'template-key':'html',
      'Accept': 'application/pdf'
  });
   let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };
  // post or get depending on your requirement
  this.http.get('http://localhost:4200/registry/api/v1/' + this.documentName + '/' +  this.vcOsid, requestOptions).pipe(map((data: any) => {

      let blob = new Blob([data], {
          type: 'application/pdf' // must match the Accept type
          // type: 'application/octet-stream' // for excel 
      });
      var link = document.createElement('a');
      console.log(blob);
      link.href = window.URL.createObjectURL(blob);
      link.download = this.pdfName + '.pdf';
      link.click();
      
   
      window.URL.revokeObjectURL(link.href);
      

  })).subscribe((result: any) => {
  });

}


async readHtmlSchemaContent(doc) {

  this.userHtml = '';
  await fetch(doc.schemaUrl)
    .then(response => response.text())
    .then(data => {
      this.schemaContent = data;
      this.userJson = JSON.parse(data);
    });

  await fetch(doc.certificateUrl)
    .then(response => response.text())
    .then(data => {
      this.userHtml = data;

       
    });
}

injectHTML() {

  this.pdfName =  this.documentName;
  let headerOptions = new HttpHeaders({
    'template-key':'html',
      'Accept': 'application/pdf'
  });
   let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };
  // post or get depending on your requirement
  this.http.get('http://localhost:4200/registry/api/v1/' + this.documentName + '/' +  this.vcOsid, requestOptions).pipe(map((data: any) => {

      let blob = new Blob([data], {
          type: 'application/pdf' // must match the Accept type
          // type: 'application/octet-stream' // for excel 
      });
      // var link = document.createElement('a');
      // console.log(blob);
      // link.href = window.URL.createObjectURL(blob);
      // link.download = this.pdfName + '.pdf';
      // link.click();
     
      // window.URL.revokeObjectURL(link.href);
      this.pdfResponse = window.URL.createObjectURL(blob);
      this.pdfResponse2=  this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfResponse);
      console.log(this.pdfResponse2);
    //   document.querySelector("iframe").src = this.pdfResponse;
    this.pdfResponse = this.readBlob(blob);
    console.log(this.pdfResponse);
    
    // this.imagePath = this.sanitizer.sanitize(bypassSecurityTrustResourceUrl(SecurityContext.RESOURCE_URL, + 'data:application/pdf;base64 + this.pdfResponse'));
    //              console.log(this.imagePath);
    //        // this.pdfResponse2=  this.sanitizer.bypassSecurityTrustResourceUrl(this.base64String);

   
    //   let myRow = document.getElementById('my-row');
    // (myRow.querySelector('.myClass') as HTMLInputElement).value = " a vaule";
      
      //  const iframe: HTMLIFrameElement = document.getElementById('iframe1') as HTMLIFrameElement;


  // step 2: obtain the document associated with the iframe tag
  // most of the browser supports .document. 
  // Some supports (such as the NetScape series) .contentDocumet, 
  // while some (e.g. IE5/6) supports .contentWindow.document
  // we try to read whatever that exists.

  // var iframedoc;
  // if (iframe.contentDocument)
  //   iframedoc = iframe.contentDocument;
  // else if (iframe.contentWindow)
  //   iframedoc = iframe.contentWindow.document;


  // if (iframedoc) {
  //   // Put the content in the iframe
  //   iframedoc.open();
  //   iframedoc.writeln(this.pdfResponse);
  //   iframedoc.close();
  // } else {
  //   alert('Cannot inject dynamic contents into iframe.');
  // }
      

  })).subscribe((result: any) => {
  });


  
}

readBlob(blob){
  var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
    var base64String = reader.result ;
    console.log('Base64 String - ', base64String);
    return base64String;
    }

}

}