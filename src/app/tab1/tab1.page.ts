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

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (this.postsDataAll.length == 50 || this.postNo == 50) {
      //   console.log("first if")
      //   event.target.disabled = true;
      //   console.log('Done');
      //   event.target.complete();
      // }
      if(this.postsDataAll.length <= 5 || this.postNo <= 5){
        this.postNo = this.postNo + 2
        console.log("second if" , this.postNo)
        this.getPostData(this.postNo)

        if(this.postNo <= 5){
          console.log('Done form second if if');
          event.target.complete();
          event.target.disabled = true;
        }
      }else{
        console.log('Done');
        event.target.complete();
        console.log("second if else", this.postNo)
        event.target.disabled = true;
      }
    }, 500);
  }

  // toggleInfiniteScroll() {
  //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  // }

  ionViewWillEnter() {
    if (this.postNo <= 5) {
      console.log("ionview", this.postNo)
    this.getPostData(this.postNo)
    }
  }


  getPostData(postNo){

    if(postNo <= 5){
      this.api.getPosts(postNo).subscribe(response => {
        this.postsData = response;
       //  console.log(this.postsData.results);
       this.postsDataAll = this.postsData.results
       console.log(this.postsDataAll);
     })
    }

  }


  getimage(id){
    console.log(id)
  }

}
