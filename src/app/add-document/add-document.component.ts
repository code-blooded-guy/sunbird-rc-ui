import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { JSONSchema7 } from "json-schema";
import { GeneralService } from '../services/general/general.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {
  header = 'blank'
  form2: FormGroup;
  model = {};

  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];
  schema: JSONSchema7 = {
    "type": "object",
    "title": "",
    "definitions": {},
    "properties": {},
    "required": []
  };
  schemaloaded = false;
  osid: any;
  verify: boolean = true;
  verified: boolean = false;
  certificate: any;
  constructor(private route: ActivatedRoute, public generalService: GeneralService, private formlyJsonschema: FormlyJsonschema,public router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['id']) {
        this.osid = params['id'];
      }
    })
    var search = {
      "entityType": [
        "DocumentType"
      ],
      "filters": {
        "osid": {
          "eq": this.osid
        }
      }
    }
    this.generalService.postData('/DocumentType/search', search).subscribe((res) => {
      console.log('pub res', res);
      var schema = JSON.parse(res[0]['additionalInput']);
      this.certificate = res[0]['title'];
      this.schema.properties = schema;
      this.form2 = new FormGroup({});
      this.options = {};
      this.fields = [this.formlyJsonschema.toFieldConfig(this.schema)];
      this.schemaloaded = true;
      console.log(this.schema)
      // this.documentTypes = res;
    }, (err) => {
      // this.toastMsg.error('error', err.error.params.errmsg)
      console.log('error', err)
    });
  }

  submit() {
    this.generalService.getData('/User').subscribe((res) => {
      console.log('res', res)
      this.model['title'] = this.certificate;
      var attest = {
        "name": "attestation-MOSIP",
        "entityName": "User",
        "entityId": res[0]['osid'],
        "additionalInput": this.model
      }
      console.log(attest);
      this.generalService.postData('send', attest).subscribe((res) => {
        console.log('pub res', res);
        this.router.navigate(['documents'])
        // this.documentTypes = res;
      }, (err) => {
        // this.toastMsg.error('error', err.error.params.errmsg)
        console.log('error', err)
      });
    });

  }

  verifyFn(){
    this.verified = true;
    this.verify = false;
    // this.router.navigate(['documents'])
  }

}
