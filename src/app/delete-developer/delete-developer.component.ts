// delete-developer.component.ts

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeveloperService } from '../services/developer.service';

@Component({
  selector: 'app-delete-developer',
  templateUrl: './delete-developer.component.html',
  styleUrls: ['./delete-developer.component.scss']
})
export class DeleteDeveloperComponent {
  @Input() developerId: number | undefined;

  constructor(
    private devService: DeveloperService,
    private router: Router
  ) {}

  confirmDelete(): void {
    if (this.developerId) {
      this.devService.deleteDeveloper(this.developerId).subscribe(() => {
        console.log('Developer deleted successfully');
        this.router.navigate(['/dashboard']); // Redirect to developers list or another page
      }, error => {
        console.error('Failed to delete developer:', error);
        // Handle error, show user-friendly message, etc.
      });
    }
  }

  cancelDelete(): void {
    this.router.navigate(['/dashboard']); // Navigate back to developers list or another page
  }
}
