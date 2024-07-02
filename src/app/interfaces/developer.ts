import { Projects } from './projects';

export interface Developer {
  personId: number;
  name: string;
  surname: string;
  skills: string[];
  experience: string;
  photoUrl: string;
  projects: Projects[];
}
