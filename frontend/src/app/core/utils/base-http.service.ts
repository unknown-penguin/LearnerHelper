import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpRequestBuilder } from './http-request.builder';

export abstract class BaseHttpService<T, ID = string> {
  protected rows = signal<T[]>([]);
  protected loading = signal<boolean>(false);
  protected error = signal<string | null>(null);

  public readonly all = this.rows.asReadonly();
  public readonly isLoading = this.loading.asReadonly();
  public readonly errorMessage = this.error.asReadonly();

  protected abstract endpoint: string;

  constructor(protected readonly http: HttpClient) {}

  /**
   * Creates a fluent request builder scoped to this service's endpoint.
   *
   * Usage:
   *   this.request<User>().path('/login').params({ email }).get()
   *   this.request<User[]>().params({ status: 'active' }).get()
   *   this.request<User>().body(data).post()
   *   this.request<User>().path(`/${id}`).body(data).put()
   *   this.request<void>().path(`/${id}`).delete()
   */
  protected request<R = T>(): HttpRequestBuilder<R> {
    return new HttpRequestBuilder<R>(
      this.http,
      `${environment.apiUrl}/${this.endpoint}`
    );
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const rows = await this.request<T[]>().get();
      this.rows.set(rows);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to load';
      this.error.set(msg);
      this.rows.set([]);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async create(data: Partial<T>): Promise<T> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const row = await this.request<T>().body(data).post();
      await this.load();
      return row;
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to create';
      this.error.set(msg);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async update(id: ID, data: Partial<T>): Promise<T> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const row = await this.request<T>().path(`/${id}`).body(data).put();
      await this.load();
      return row;
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to update';
      this.error.set(msg);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async delete(id: ID): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await this.request<void>().path(`/${id}`).delete();
      await this.load();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to delete';
      this.error.set(msg);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }
}
