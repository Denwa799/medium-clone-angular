import {Component, OnInit} from '@angular/core'
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import {AuthService} from '../../services/auth.service'
import {registerAction} from '../../store/actions/register.action'
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors'
import { RegisterRequestInterface } from '../../types/registerRequest.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
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
      username: ['', Validators.required],
      email: '',
      password: '',
    })
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))
  }
}
