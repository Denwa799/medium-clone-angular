import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {StoreModule} from '@ngrx/store'
import {CommonModule} from '@angular/common'
import {EffectsModule} from '@ngrx/effects'
import {ErrorMessageModule} from 'src/app/shared/modules/errorMessage/errorMessage.module'
import {LoadingModule} from 'src/app/shared/modules/loading/loading.module'
import {GetFeedEffect} from './store/effects/getFeed.effect'
import {FeedComponent} from './components/globalFeed/feed.component'
import {reducers} from './store/reducers'
import {FeedService} from './services/feed.service'

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
  ],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
