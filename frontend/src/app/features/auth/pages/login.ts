import { Component, inject, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly userService = inject(UserService);

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
        this.error.set('Invalid email or password.');
      }
    } finally {
      this.loading.set(false);
    }
  }

  close(): void {
    this.closed.emit();
  }
}
