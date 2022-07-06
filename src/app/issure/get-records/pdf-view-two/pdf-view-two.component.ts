
import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-pdf-view-two',
  templateUrl: './pdf-view-two.component.html',
  styleUrls: ['./pdf-view-two.component.scss']
})

export class PdfViewTwoComponent implements OnInit {
  @Input() newNameChild;
  docName: string;
  constructor(public router: Router, public route: ActivatedRoute,public translate: TranslateService,
    public generalService: GeneralService,public http: HttpClient) {
      
     }

  ngOnInit(): void {
  
}

}