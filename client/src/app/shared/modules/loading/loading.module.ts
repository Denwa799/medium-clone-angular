import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {LoadingComponent} from './components/loading/loading.components'

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
})
export class LoadingModule {}
