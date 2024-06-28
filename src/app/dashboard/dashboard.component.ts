import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeveloperService } from '../services/developer.service';
;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  developers: any[] = [];

  constructor(
    private router: Router,
    private developerService: DeveloperService
  ) { }

  ngOnInit(): void {
    this.loadDevelopers();
  }

  loadDevelopers(): void {
    this.developerService.getDevelopers()
      .subscribe(
        (data: any[]) => {
          this.developers = data;
        },
        error => {
          console.error('Error loading developers: ', error);
        }
      );
  }

  goToAddDeveloper(): void {
    this.router.navigate(['/app-add-developer']);
  }
}
