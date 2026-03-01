import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { provideTranslocoScope, TranslocoDirective, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, TranslocoDirective],
  templateUrl: './login-form.html',
  providers: [provideTranslocoScope('auth')]
})
export class LoginForm {
  private readonly authService = inject(AuthService);
  private readonly translocoService = inject(TranslocoService);

  readonly showCancel = input(false);
  readonly loggedIn = output<void>();
  readonly cancelled = output<void>();

  email = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  async submit(): Promise<void> {
    this.error.set(null);
    this.loading.set(true);
    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        this.loggedIn.emit();
      } else {
        this.error.set(this.translocoService.translate('auth.invalidCredentials'));
      }
    } finally {
      this.loading.set(false);
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
