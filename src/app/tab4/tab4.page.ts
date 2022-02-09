import { Component, OnInit } from '@angular/core';
import { ApisService } from "../servies/apis.service";


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  resData
  post
  constructor(public api: ApisService) { }

  ngOnInit() {
    this.api.getuser().subscribe(response => {
         console.log("sin res in tab 4",response);
         this.resData = response
         this.post = this.resData.results[0]
      })
  }


}
