import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../utils/base-http.service';
import { UpdateUserSettings, UserSettings } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends BaseHttpService<UserSettings> {
  protected endpoint = 'settings';

  constructor(http: HttpClient) {
    super(http);
  }

  getByUserId(userId: string): Promise<UserSettings> {
    return this.request<UserSettings>().path(`/user/${userId}`).get();
  }

  updateSettings(settingsId: string, data: UpdateUserSettings): Promise<UserSettings> {
    return this.request<UserSettings>().path(`/${settingsId}`).body(data).put();
  }
}
