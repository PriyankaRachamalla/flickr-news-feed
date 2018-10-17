import { Component, OnInit } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  publicImages: any;
  searchTagImages: any;
  showSearched = false;
  showAllImages = true;

  constructor(private http:Http) { }

  ngOnInit() {
    this.getFlickrPublicImages();
  }
  
  getFlickrPublicImages(){
    this.http.get('https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1').subscribe(

    (res:Response) => {
      this.publicImages = res.json().items;
      // console.log("public images",res);
      // this.publicImages = this.publicImages.JSON.parse();
      console.log("public images",this.publicImages);
      
    }
    )
  }

  searchImages(tags){
    this.searchTagImages = [];
    if(tags != ''){

      for(var key in this.publicImages){
     // console.log(key);
        if(this.publicImages[key].tags.includes(tags)){
          this.searchTagImages.push(this.publicImages[key]);
          console.log("this.searched images",this.searchTagImages);
          this.showSearched = true;
          this.showAllImages = false;
        }
      }
    } 
    else{
      this.searchTagImages = this.publicImages;
    }
  }

}
