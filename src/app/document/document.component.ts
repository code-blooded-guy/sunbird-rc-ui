import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../services/general/general.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  layout: string = 'mydoc';
  header = 'documents'
  items = [
    {}, {}, {}
  ];
  sluid;
  documentTypes: any;
  docs: any;
  hasDocs: boolean=false;

  constructor(private route: ActivatedRoute, public generalService: GeneralService) {

  }

  ngOnInit(): void {
    var search = {
      "entityType": [
        "DocumentType"
      ],
      "filters": {

      }
    }
    this.generalService.postData('/DocumentType/search', search).subscribe((res) => {
      console.log('pub res',res);
      this.documentTypes = res;
    }, (err) => {
      // this.toastMsg.error('error', err.error.params.errmsg)
      console.log('error', err)
    });
    this.generalService.getData('/User').subscribe((res) => {
      console.log('res', res)
      if(res[0]['attestation-MOSIP'] && res[0]['attestation-MOSIP'].length > 0){
        this.hasDocs = true;
        this.docs  = res[0]['attestation-MOSIP']
      }
    });
    // this.sluid = localStorage.getItem('sluid');
    // this.route.params.subscribe(params => {
    //   console.log(params);

    //   this.layout = params.layout;

    // });
    // var elements = document.getElementsByClassName('modal-backdrop');
    // console.log(elements)
    // while(elements.length > 0){
    //     elements[0].parentNode.removeChild(elements[0]);
    // }
  }

}
