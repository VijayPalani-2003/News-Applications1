import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; // Legacy HttpModule
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';  // Add 'map' operator to Observable

@Injectable()
export class NewsService {

  constructor(private _http: Http) { }

  getSectionNews(sectionName: string): Observable<any> {
    // fetch news of that sectionName and map the response to desired format
    return this._http.get('https://api.nytimes.com/svc/topstories/v2/' + sectionName + '.json?api-key=315a5a51483b469a918246dc2753b339')
      .map(response => response.json());  // Use map directly on the observable
  }
}
