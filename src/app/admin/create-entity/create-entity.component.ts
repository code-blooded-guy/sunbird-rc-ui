import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchemaService } from '../../services/data/schema.service';

@Component({
  selector: 'create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss']
})
export class CreateEntityComponent implements OnInit {
  params: any;
  usecase: any;
  entity: any;
  entityName: string;
  description: string;

  apiEntityName : any = {
    "educationboard" : {
      'entityName' : "Education Board",
      "fields" : [
        {
          'title' : "Institute Name"
        },
        {
          'title' : "Affiliation Number"
        }
      ]
    }
  }

  SchemaUrl: any;
  entityFields: any;

  constructor( 
    private activeRoute: ActivatedRoute,
    public router: Router,
    public schemaService: SchemaService) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe(params => {
      this.params = params;

      if(this.params.hasOwnProperty('entity'))
      {
        this.entity = this.params.entity;
      }

      if(this.params.hasOwnProperty('usecase'))
      {
        this.usecase = params.usecase.toLowerCase();
      }

      this.entityFields = this.apiEntityName[this.entity]

      //this.getSchemaJSON();
     
      console.log(this.entityFields);
    })

  }

  openEntity(entityName)
  {
    let url = "/create/" + this.usecase + "/entity/" + entityName;
    this.router.navigate([url])
  }

  getSchemaJSON(){
    this.schemaService.getEntitySchemaJSON().subscribe((data)=>{
      this.SchemaUrl = data.entitySchema[this.usecase+"SchemaUrl"];
      console.log(this.SchemaUrl);
    })
  }

}
