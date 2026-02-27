import { Component, inject, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { provideTranslocoScope, TranslocoDirective, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-login',
  imports: [FormsModule, TranslocoDirective],
  templateUrl: './login.html',
  providers: [provideTranslocoScope('auth')]
})
export class Login {
  private readonly userService = inject(UserService);
  private readonly translocoService = inject(TranslocoService);

  readonly closed = output<void>();

  email = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  async submit(): Promise<void> {
    this.error.set(null);
    this.loading.set(true);
    try {
      const success = await this.userService.loginUser(this.email, this.password);
      if (success) {
        this.closed.emit();
      } else {
        this.error.set(this.translocoService.translate('auth.invalidCredentials'));
      }
    } finally {
      this.loading.set(false);
    }
  }

  close(): void {
    this.closed.emit();
  }
}
