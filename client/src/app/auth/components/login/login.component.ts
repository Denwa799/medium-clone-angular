import {Component, OnInit} from '@angular/core'
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'
import {AuthService} from '../../services/auth.service'
import {loginAction} from '../../store/actions/login.action'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import {LoginRequestInterface} from '../../types/loginRequest.interface'

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppStateInterface>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    })
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    }
    this.store.dispatch(loginAction({request}))
  }
}
