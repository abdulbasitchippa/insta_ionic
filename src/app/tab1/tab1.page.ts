import { ApisService } from "../servies/apis.service";
import { Component,ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  postsData
  postsDataAll
  postNo = 1

  constructor(public api: ApisService) {}

  loadData(event) {
    setTimeout(() => {
      this.postNo = this.postNo + 3
        console.log("second if" , this.postNo)
        this.getPostData(this.postNo)
          event.target.complete();
    }, 500);
  }


  ionViewWillEnter() {
    console.log("ionview", this.postNo)
    this.getPostData(this.postNo);
  }

  getPostData(postNo){
    if(postNo <= 10){
      this.api.getPosts(postNo).subscribe(response => {
        this.postsData = response;
       this.postsDataAll = this.postsData.results
       console.log(this.postsDataAll);
     })
    }
  }

  getimage(id){
    console.log(id)
  }

}
