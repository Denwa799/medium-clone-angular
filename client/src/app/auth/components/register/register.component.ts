import {Component, OnInit} from '@angular/core'
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {registerAction} from '../../store/actions/register.action'
import {isSubmittingSelector} from '../../store/selectors'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form: UntypedFormGroup
  isSubmitting$: Observable<boolean>

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: '',
      password: '',
    })
  }

  onSubmit(): void {
    this.store.dispatch(registerAction(this.form.value))
  }
}
