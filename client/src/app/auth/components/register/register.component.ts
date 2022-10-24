import {Component, OnInit} from '@angular/core'
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {AuthService} from '../../services/auth.service'
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
    private store: Store<AppStateInterface>,
    private authService: AuthService
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
    this.authService
      .register(this.form.value)
      .subscribe((currentUser: CurrentUserInterface) =>
        console.log('currentUser', currentUser)
      )
  }
}
