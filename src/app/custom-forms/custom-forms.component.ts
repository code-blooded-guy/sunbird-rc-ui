import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { JSONSchema7 } from "json-schema";

@Component({
  selector: 'app-custom-forms',
  templateUrl: './custom-forms.component.html',
  styleUrls: ['./custom-forms.component.scss']
})
export class CustomFormsComponent implements OnInit {
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
  property: any;
  redirectTo: any = 'cf/login';
  buttonText: string = "Submit";
  verify: boolean = false;
  verified: boolean = false;
  constructor(private route: ActivatedRoute,private formlyJsonschema: FormlyJsonschema,public router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['form'] == 'login') {
       this.login()
      }
      else if (params['form'] == 'otp') {
        this.otp()
       }
      else if (params['form'] == 'sluid') {
        this.sluid()
       }
       else{
        this.login()
       }
    });
  
  }

  login(){
    this.property = {
      "mobile": {
        "type": "string",
        "title": "Mobile Number"
      }
    }
    this.schema["title"] = 'Login or Register';
    this.schema["properties"] = this.property;
    this.schema.required.push('mobile');
    this.schemaloaded = true;
    this.verify = false;
    this.redirectTo = 'cf/otp'
    this.buttonText = 'Continue'
    this.loadSchema();
  }

  otp(){
    this.property = {
      "otp": {
        "type": "number",
        "title": "Enter OTP",
        "description": "Enter the code sent to "+localStorage.getItem('mobile')
      }
    }
    this.schema["title"] = 'Confirm OTP';
    this.schema["properties"] = this.property;
    this.buttonText = 'Confirm OTP'
    this.schemaloaded = true;
    this.verify = false;
    this.redirectTo = 'documents'
    this.loadSchema();
  }
  sluid(){
   this.model = {}
    this.property = {
      "sluid": {
        "type": "number",
        "title": "SLUID Number"
      }
    }
    this.schema["title"] = 'You are not registered, Please add any of your identity to register';
    this.schema["properties"] = this.property;
    this.schema.required.push('sluid')
    this.redirectTo = 'documents';
    this.buttonText = 'Get Document'
    this.schemaloaded = true;
    this.verify = true;
    this.loadSchema();
  }

  loadSchema(){
    this.form2 = new FormGroup({});
    this.options = {};
    this.fields = [this.formlyJsonschema.toFieldConfig(this.schema)];
  };

  submit() {
    if (this.form2.valid) {
      localStorage.setItem(Object.keys(this.model)[0],this.model[Object.keys(this.model)[0]])
      console.log(Object.keys(this.model)[0])
      this.router.navigate([this.redirectTo])
    }
  }
  verifyFn(){
    this.verified = true;
    this.verify = false;
    // this.router.navigate(['documents'])
  }



}


 