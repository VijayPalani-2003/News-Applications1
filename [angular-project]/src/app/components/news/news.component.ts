import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import '../../../../node_modules/zone.js/dist/zone.js';

import { NewsItemComponent } from './news-item/news-item.component';
import { NewsService } from '../../service/news.service';
import { News } from '../../../model/news';
import { NewsActions } from '../../store/actions/news.actions';
import { getNews } from '../../store/reducers/selector';
import { news } from '../../store/reducers/news.reducer';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: []
})
export class NewsComponent implements OnInit {
  sectionNewsList: any;
  NewsActions: any;
  constructor(private _route:ActivatedRoute, private _newsService:NewsService,private store:Store<any>  ) { 
    
  }

  ngOnInit() {
    this._route.params.subscribe((param:any)=>{
      let sectionName = param.id;
      // send this sectionName to newsService. Subscribe newsService and get the newsList
      this._newsService.getSectionNews(sectionName).subscribe((apiRes:any)=>{
        this.store.dispatch(this.NewsActions.LoadSectionNews(apiRes.results));

        this.store.select('news').subscribe((storeData:any)=>{
           this.sectionNewsList =storeData.newsList;
          });

      });
    })
      // now, get news from store
  }
}

