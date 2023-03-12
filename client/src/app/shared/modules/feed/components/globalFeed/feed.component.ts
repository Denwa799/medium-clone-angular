import {
  isLoadingSelector,
  errorSelector,
  feedSelector,
} from 'src/app/shared/modules/feed/store/selectors'
import {GetFeedResponseInterface} from 'src/app/shared/modules/feed/types/getFeedResponse.interface'
import {Observable} from 'rxjs'
import {getFeedAction} from 'src/app/shared/modules/feed/store/actions/getFeed.action'
import {Component, Input, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrlProps: string

  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  feed$: Observable<GetFeedResponseInterface | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(feedSelector))
  }

  fetchData(): void {
    this.store.dispatch(getFeedAction({url: this.apiUrlProps}))
  }
}
