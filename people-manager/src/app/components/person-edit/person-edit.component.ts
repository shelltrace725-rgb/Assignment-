import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService, Person } from '../../services/people.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  person: Person = { name: '', email: '' };
  isNew = true;
  isSaving = false;
  loadError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isNew = false;
      const id = Number(idParam);
      this.peopleService.getPerson(id).subscribe({
        next: (p) => (this.person = p),
        error: () => (this.loadError = 'Failed to load person')
      });
    } else {
      this.isNew = true;
    }
  }

  save(): void {
    this.isSaving = true;
    if (this.isNew) {
      this.peopleService.createPerson(this.person).subscribe({
        next: () => this.navigateToList(),
        error: () => (this.isSaving = false)
      });
    } else if (this.person.id != null) {
      this.peopleService.updatePerson(this.person.id, this.person).subscribe({
        next: () => this.navigateToList(),
        error: () => (this.isSaving = false)
      });
    }
  }

  cancel(): void {
    this.navigateToList();
  }

  private navigateToList(): void {
    this.router.navigate(['/people']);
  }
}
