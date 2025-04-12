import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewsActions } from '../../store/actions/news.actions';
//import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  subsections: string[] = ['default']; // Public for test access
  private storeSubscription: any;

  constructor(
    private store: Store<any>,
    private cdRef: ChangeDetectorRef,
    private newsActions: NewsActions
  ) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('news')
      //.pipe(takeUntil(this.unsubscribe))
      .subscribe((storeData: any) => {
        const newsList = (storeData && storeData.newsList) || [];
        
        const subsections = newsList
          .map((news: { subsection: string; }) => news.subsection ? news.subsection.trim() : '')
          .filter((val: any, i: any, self: string[]) => val && self.indexOf(val) === i);

        if (subsections.length > 0) {
          this.subsections = subsections;
          this.cdRef.detectChanges(); // Manual CD trigger
        }
      });
  }

  dispatchAction(subsection: string) {
    if (subsection) {
      this.store.dispatch(this.newsActions.FilterSubsection(subsection));
    }
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}