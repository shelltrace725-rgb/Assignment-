import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  id?: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class PeopleService {
  private readonly baseUrl = '/api/people';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl);
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.baseUrl}/${id}`);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrl, person);
  }

  updatePerson(id: number, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.baseUrl}/${id}`, person);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
