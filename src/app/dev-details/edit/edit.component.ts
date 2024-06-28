import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeveloperService } from 'src/app/services/developer.service';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  developerForm!: FormGroup;
  personId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private developerService: DeveloperService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.personId = +params['id']; // Get id from route parameter
      this.initForm();
    });
  }

  initForm(): void {
    this.developerService.getDeveloper(this.personId).subscribe(developer => {
      this.developerForm = this.fb.group({
        firstName: [developer.name],
        lastName: [developer.surname],
        skills: [developer.skills.join(', ')],
        experience: [developer.experience]
      });
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
    doc.text(`First Name: ${formData.firstName}`, 10, 20);
    doc.text(`Last Name: ${formData.lastName}`, 10, 30);
    doc.text(`Skills: ${formData.skills}`, 10, 40);
    doc.text(`Experience: ${formData.experience}`, 10, 50);
    doc.save('developer_details.pdf');
  }
}
