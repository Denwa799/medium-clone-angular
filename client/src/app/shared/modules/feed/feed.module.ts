import {FeedService} from './services/feed.service'
import {StoreModule} from '@ngrx/store'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EffectsModule} from '@ngrx/effects'
import {GetFeedEffect} from './store/effects/getFeed.effect'
import {FeedComponent} from './components/globalFeed/feed.component'
import {reducers} from './store/reducers'

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
  ],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
