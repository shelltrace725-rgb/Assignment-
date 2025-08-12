import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService, Person } from '../../services/people.service';

@Component({
  selector: 'app-person-delete',
  templateUrl: './person-delete.component.html',
  styleUrls: ['./person-delete.component.scss']
})
export class PersonDeleteComponent implements OnInit {
  person: Person | null = null;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.peopleService.getPerson(id).subscribe(p => (this.person = p));
    }
  }

  confirmDelete(): void {
    if (!this.person || this.person.id == null) { return; }
    this.isDeleting = true;
    this.peopleService.deletePerson(this.person.id).subscribe({
      next: () => this.router.navigate(['/people']),
      error: () => (this.isDeleting = false)
    });
  }

  cancel(): void {
    this.router.navigate(['/people']);
  }
}
