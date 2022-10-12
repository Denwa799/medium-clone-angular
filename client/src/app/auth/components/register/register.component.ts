import {Component, OnInit} from '@angular/core'
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {registerAction} from '../../store/actions/register.action'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form: UntypedFormGroup

  constructor(private fb: UntypedFormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
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
