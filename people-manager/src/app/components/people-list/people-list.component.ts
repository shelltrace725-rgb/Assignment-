import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService, Person } from '../../services/people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  isLoading = false;
  loadError: string | null = null;

  constructor(private router: Router, private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.isLoading = true;
    this.loadError = null;
    this.peopleService.getPeople().subscribe({
      next: (people) => {
        this.people = people;
        this.isLoading = false;
      },
      error: () => {
        this.loadError = 'Failed to load people';
        this.isLoading = false;
      }
    });
  }

  addPerson(): void {
    this.router.navigate(['/people/new']);
  }

  editPerson(person: Person): void {
    if (!person.id) { return; }
    this.router.navigate([`/people/${person.id}/edit`]);
  }

  deletePerson(person: Person): void {
    if (!person.id) { return; }
    this.router.navigate([`/people/${person.id}/delete`]);
  }

  trackById(index: number, item: Person): number | undefined {
    return item.id;
  }
}
