import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general/general.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-get-records',
  templateUrl: './get-records.component.html',
  styleUrls: ['./get-records.component.scss']
})
export class GetRecordsComponent implements OnInit {
  item:any;
  recordItems: any;
  vcOsid: any;
  headerName: string = 'records'
  //headerName : string = 'issuer';
  newName="hello";
  documentName: string;
  pdfName: any;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    
    public generalService: GeneralService,
    public translate: TranslateService,
    public http: HttpClient) { 
      this.documentName = this.route.snapshot.paramMap.get('document'); 
      console.log(this.documentName);

   // this.item = this.router.getCurrentNavigation().extras.state.item;

    // if( this.item){
    //   localStorage.setItem('item',  this.item);
    // }else{
    //   this.item =  localStorage.getItem('item');
    // }

  }

  ngOnInit(): void {
this.getRecords();
  }

  getRecords(){
    let payout = {
      "filters": {}
  }
    this.generalService.postData('/' + this.documentName + '/search', payout).subscribe((res) => {
    console.log(res);
    this.recordItems = res;
    }, err=>{
      this.recordItems = [];
      console.log(err);
    });
  }

  addRecord()
  {
   // this.router.navigate(['/add-records'] );
    // this.router.navigate(['/add-records'], { state: { item: this.item } });

  }

  downloadVc(item){
    this.vcOsid = item.osid;
    this.pdfName = (item.name) ? item.name : this.documentName;

    let headers = {
      Accept: 'text/html',
      'template-key':'html',
    };
   
    this.downloadPDF();
    // this.http.get('https://sunbird-certificate-demo.xiv.in/registry/api/v1/' + this.documentName + '/' + item.osid, {headers}).subscribe(
    //   (data) => {
       
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.log('getPDF error: ',error);
    //   }
    // );

   
  }
  onPress(){
    this.router.navigateByUrl['/pdf-view'];
    
  }

  downloadPDF() {

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

}
