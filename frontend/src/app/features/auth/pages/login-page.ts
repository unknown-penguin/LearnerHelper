import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { provideTranslocoScope, TranslocoDirective } from '@jsverse/transloco';
import { LoginForm } from '../components/login-form';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm, TranslocoDirective],
  templateUrl: './login-page.html',
  providers: [provideTranslocoScope('auth')]
})
export class LoginPage {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  onLoggedIn(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/dictionary';
    this.router.navigateByUrl(returnUrl);
  }
}
