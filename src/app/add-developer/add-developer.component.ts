// add-developer.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeveloperService } from '../services/developer.service';
import { Developer } from '../interfaces/developer'; // Adjust import path as per your project structure

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.scss']
})
export class AddDeveloperComponent implements OnInit {
  developerForm!: FormGroup;
  id: number | undefined;
  editMode = false;

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
    });
  }

  onClose() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    const formData = this.developerForm.value;
    const developer: Developer = {
      personId: formData.id,
      name: formData.firstName,
      surname: formData.lastName,
// Adjusting map function to specify 'skill' as type string explicitly
      skills: formData.skills.split(',').map((skill: string) => skill.trim()),
      experience: formData.experience,
      photoUrl: '' // Adjust as per your form or leave empty if not provided
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
    let firstName = '';
    let lastName = '';
    let skills = '';
    let experience = '';

    if (this.editMode && this.id != null) {
      this.devService.getDeveloper(this.id).subscribe((developer: Developer) => {
        id = developer.personId;
        firstName = developer.name;
        lastName = developer.surname;
        skills = developer.skills.join(', '); // Convert array of strings to comma-separated string
        experience = developer.experience;

        this.developerForm.patchValue({
          id: developer.personId,
          firstName: developer.name,
          lastName: developer.surname,
          skills: skills,
          experience: developer.experience
        });
      });
    }

    this.developerForm = new FormGroup({
      id: new FormControl(id),
      firstName: new FormControl(firstName, Validators.required),
      lastName: new FormControl(lastName, Validators.required),
      skills: new FormControl(skills, Validators.required), // Skills as a string
      experience: new FormControl(experience, Validators.required)
    });
  }
}
