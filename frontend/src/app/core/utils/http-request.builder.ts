import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export class HttpRequestBuilder<R> {
  private _path = '';
  private _params?: Record<string, any>;
  private _body?: any;

  constructor(
    private readonly http: HttpClient,
    private readonly baseUrl: string
  ) {}

  path(path: string): this {
    this._path = path;
    return this;
  }

  params(params: Record<string, any>): this {
    this._params = params;
    return this;
  }

  body(body: any): this {
    this._body = body;
    return this;
  }

  private get url(): string {
    return `${this.baseUrl}${this._path}`;
  }

  private get options(): { params?: Record<string, any> } {
    return this._params ? { params: this._params } : {};
  }

  async get(): Promise<R> {
    return firstValueFrom(this.http.get<R>(this.url, this.options));
  }

  async post(): Promise<R> {
    return firstValueFrom(
      this.http.post<R>(this.url, this._body, this.options)
    );
  }

  async put(): Promise<R> {
    return firstValueFrom(
      this.http.put<R>(this.url, this._body, this.options)
    );
  }

  async patch(): Promise<R> {
    return firstValueFrom(
      this.http.patch<R>(this.url, this._body, this.options)
    );
  }

  async delete(): Promise<R> {
    return firstValueFrom(this.http.delete<R>(this.url, this.options));
  }
}
