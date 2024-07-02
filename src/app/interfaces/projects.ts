// Projects interface with description optional
export interface Projects {
  projectId: number;
  projectName: string;
  description?: string; // Make description optional
}

// Example of creating projects
const projectNames: string[] = ['Project A', 'Project B'];

const projects: Projects[] = projectNames.map(projectName => ({
  projectId: 0, // Adjust projectId as per your data structure
  projectName: projectName
}));
