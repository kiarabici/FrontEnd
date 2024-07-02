import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Developer } from '../interfaces/developer';
import { Projects } from '../interfaces/projects'; // Adjust import path as per your project structure
import { DeveloperService } from '../services/developer.service';

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.scss']
})
export class AddDeveloperComponent implements OnInit {
  developerForm!: FormGroup;
  id: number | undefined;
  editMode = false;
  projects: Projects[] = [];

  constructor(
    private devService: DeveloperService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      this.loadProjects();
    });
  }

  onClose() {
    this.router.navigate(['/dashboard']);
  }


    onSubmit() {
      const formData = this.developerForm.value;
      const developer: Developer = {
        personId: formData.id,
        name: formData.name,
        surname: formData.surname,
        skills: formData.skills.split(',').map((skill: string) => skill.trim()),
        experience: formData.experience,
        projects: this.projects,
        photoUrl: ''
      };

    if (this.editMode) {
      this.devService.updateDeveloper(this.id!, developer).subscribe(() => {
        console.log('Developer updated successfully.');
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error('Failed to update developer:', error);
        // Handle error as needed
      });
    } else {
      this.devService.addDeveloper(developer).subscribe(() => {
        console.log('Developer added successfully.');
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error('Failed to add developer:', error);
        // Handle error as needed
      });
    }
  }

  private initForm() {
    let id = null;
    let name = '';
    let surname = '';
    let skills = '';
    let experience = '';

    if (this.editMode && this.id != null) {
      this.devService.getDeveloper(this.id).subscribe((developer: Developer) => {
        id = developer.personId;
        name = developer.name;
        surname = developer.surname;
        skills = developer.skills.join(', '); // Convert array of strings to comma-separated string
        experience = developer.experience;
        this.projects = developer.projects; // Load existing projects

        this.developerForm.patchValue({
          id: developer.personId,
          name: developer.name,
          surname: developer.surname,
          skills: skills,
          experience: developer.experience
        });
      });
    }

    this.developerForm = new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name),
      surname: new FormControl(surname),
      skills: new FormControl(skills), // Skills as a string
      experience: new FormControl(experience),
      selectedProjects: new FormControl(null) // Control for selecting projects
    });
  }

  loadProjects() {
    // Mock method to load projects
    this.projects = [
      { projectId: 1, projectName: 'Project A', description: 'Description A' },
      { projectId: 2, projectName: 'Project B', description: 'Description B' },
      { projectId: 3, projectName: 'Project C', description: 'Description C' }
    ];
  }
}
