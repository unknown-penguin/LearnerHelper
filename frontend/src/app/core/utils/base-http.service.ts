import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export abstract class BaseHttpService<T, ID = string> {
  protected rows = signal<T[]>([]);
  protected loading = signal<boolean>(false);
  protected error = signal<string | null>(null);

  public readonly all = this.rows.asReadonly();
  public readonly isLoading = this.loading.asReadonly();
  public readonly errorMessage = this.error.asReadonly();

  protected abstract endpoint: string;

  constructor(protected readonly http: HttpClient) {}

  protected buildUrl(path: string = ''): string {
    return `${environment.apiUrl}/${this.endpoint}${path}`;
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const rows = await firstValueFrom(
        this.http.get<T[]>(this.buildUrl())
      );
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
      const row = await firstValueFrom(
        this.http.post<T>(this.buildUrl(), data)
      );
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
      const row = await firstValueFrom(
        this.http.put<T>(this.buildUrl(`/${id}`), data)
      );
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
      await firstValueFrom(
        this.http.delete(this.buildUrl(`/${id}`))
      );
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
