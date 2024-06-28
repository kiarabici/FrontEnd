import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeveloperService } from '../services/developer.service';
import { Developer } from '../interfaces/developer'; // Ensure this import is correct

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  developers: Developer[] = [];
  filteredDevelopers: Developer[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private developerService: DeveloperService
  ) { }

  ngOnInit(): void {
    this.loadDevelopers();
  }

  loadDevelopers(): void {
    this.developerService.getAllDevelopers().subscribe(
      (data: Developer[]) => {
        this.developers = data;
        this.filteredDevelopers = [...this.developers];
      },
      error => {
        console.error('Error loading developers: ', error);
      }
    );
  }

  showForm(): void {
    this.router.navigate(['new']);
  }

  editDeveloper(id: number): void {
    this.router.navigate(['edit', id]);
  }

  deleteDeveloper(id: number | undefined): void {
    if (id === undefined) {
      console.error('Cannot delete developer: ID is undefined');
      return;
    }

    if (confirm('Are you sure you want to delete this developer?')) {
      this.developerService.deleteDeveloper(id).subscribe(() => {
        this.loadDevelopers(); // Reload the developers list after deletion
      });
    }
  }

  searchDevelopers(): void {
    if (!this.searchTerm) {
      this.filteredDevelopers = [...this.developers]; // Reset filtered list if search term is empty
      return;
    }

    const lowerCaseSearch = this.searchTerm.toLowerCase();
    this.filteredDevelopers = this.developers.filter(developer =>
      developer.name.toLowerCase().includes(lowerCaseSearch) ||
      developer.skills.some(skill => skill.toLowerCase().includes(lowerCaseSearch))
    );
  }
}
