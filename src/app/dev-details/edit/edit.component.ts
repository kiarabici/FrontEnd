import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as jspdf from 'jspdf';
import { Projects } from 'src/app/interfaces/projects';
import { DeveloperService } from 'src/app/services/developer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  developerForm!: FormGroup;
  personId!: number;
  projects: Projects[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private developerService: DeveloperService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.personId = +params['id'];
      this.initForm();
      this.loadProjects();
    });
  }

  initForm(): void {
    this.developerService.getDeveloper(this.personId).subscribe(developer => {
      this.developerForm = this.fb.group({
        name: [developer.name, Validators.required],
        surname: [developer.surname, Validators.required],
        skills: [developer.skills.join(', ')],
        experience: [developer.experience, Validators.required]
      });
      this.projects = developer.projects; // Assuming projects are loaded with developer
    });
  }

  loadProjects(): void {
    this.developerService.getProjectsByDeveloper(this.personId).subscribe(projects => {
      this.projects = projects;
    });
  }

  onSubmit(): void {
    if (this.developerForm.valid) {
      const formData = this.developerForm.value;
      formData.skills = formData.skills.split(',').map((skill: string) => skill.trim());
      this.developerService.updateDeveloper(this.personId, formData).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  onClose(): void {
    this.router.navigate(['/dashboard']);
  }

  downloadPDF(): void {
    const formData = this.developerForm.value;
    const doc = new jspdf.jsPDF();
    doc.text('Developer Details', 10, 10);
    doc.text(`First Name: ${formData.name}`, 10, 20);
    doc.text(`Last Name: ${formData.surname}`, 10, 30);
    doc.text(`Skills: ${formData.skills}`, 10, 40);
    doc.text(`Experience: ${formData.experience}`, 10, 50);

    // Add projects to the PDF
    doc.text('Projects:', 10, 60);
    let y = 70;
    this.projects.forEach((project, index) => {
      doc.text(`${index + 1}. ${project.projectName}`, 15, y);
      y += 10;
    });

    doc.save('developer_details.pdf');
  }
}
