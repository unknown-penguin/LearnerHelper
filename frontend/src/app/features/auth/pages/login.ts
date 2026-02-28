import { Component, output } from '@angular/core';
import { provideTranslocoScope, TranslocoDirective } from '@jsverse/transloco';
import { LoginForm } from '../components/login-form';

@Component({
  selector: 'app-login',
  imports: [LoginForm, TranslocoDirective],
  templateUrl: './login.html',
  providers: [provideTranslocoScope('auth')]
})
export class Login {
  readonly closed = output<void>();

  close(): void {
    this.closed.emit();
  }
}
