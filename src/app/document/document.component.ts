import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  layout : string = 'mydoc';
  header = 'blank'
  items = [
    {},{},{}
  ];
  sluid;

  constructor(private route: ActivatedRoute) {
  
  }

  ngOnInit(): void {
    this.sluid = localStorage.getItem('sluid');
    this.route.params.subscribe(params => {
      console.log(params);
      
      this.layout = params.layout;
      
    });
    // var elements = document.getElementsByClassName('modal-backdrop');
    // console.log(elements)
    // while(elements.length > 0){
    //     elements[0].parentNode.removeChild(elements[0]);
    // }
  }

}
