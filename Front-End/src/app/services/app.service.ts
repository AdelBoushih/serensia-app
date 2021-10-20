import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8100';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getEmails(data: { url: string; maxDepth: number }): Observable<string[]> {
    return this.http.post<string[]>(`${baseUrl}/test2`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  getSuggestions(data: {
    term: string;
    number_suggestions: number;
    choices: string[];
  }): Observable<string[]> {
    return this.http.post<string[]>(`${baseUrl}/test1`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
}
