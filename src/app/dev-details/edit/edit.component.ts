import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeveloperService } from 'src/app/services/developer.service';

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
      console.log(developer)
      this.developerForm = this.fb.group({
        firstName:new FormControl(developer.name),
        lastName: new FormControl(developer.surname),
        skills: new FormControl(developer.skills.join(', ')),
        experience: new FormControl(developer.experience)
      });
    });
  }

  onSubmit(): void {
    if (this.developerForm.valid) {
      const formData = this.developerForm.value;
      formData.skills = formData.skills.split(',').map((skill: string) => skill.trim()); // Convert skills to array
      this.developerService.updateDeveloper(this.personId, formData).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  onClose(): void {
    this.router.navigate(['/dashboard']);
  }
}
