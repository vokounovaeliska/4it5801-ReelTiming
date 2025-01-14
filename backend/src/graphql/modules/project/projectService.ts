import { Db } from '@backend/types/types';

import { getProjectRepository } from './projectRepository';
import { Project, ProjectInput } from './projectType';

export class ProjectService {
  private projectRepository: ReturnType<typeof getProjectRepository>;

  constructor(db: Db) {
    this.projectRepository = getProjectRepository(db);
  }

  async getAllProjects(): Promise<Project[]> {
    const projects = await this.projectRepository.getAllProjects();
    return projects.map((proj) => ({
      ...proj,
      create_date: new Date(proj.create_date),
      start_date: proj.start_date ? new Date(proj.start_date) : new Date(0),
      end_date: proj.end_date ? new Date(proj.end_date) : new Date(0),
      is_active: !!proj.is_active,
    }));
  }

  async getProjectById(id: string | null): Promise<Project | null> {
    if (!id) {
      return null;
    }
    const project = await this.projectRepository.getProjectById(id);
    if (!project) {
      return null;
    }

    return {
      ...project,
      is_active: project.is_active ?? true,
    };
  }

  async createProject(data: ProjectInput): Promise<Project> {
    const createdAt = new Date();
    const projectId = await this.projectRepository.createProject({
      name: data.name!,
      production_company: data.production_company!,
      description: data.description ?? undefined,
      start_date: data.start_date ?? undefined,
      end_date: data.end_date ?? undefined,
      create_date: createdAt,
      last_update_date: createdAt,
      is_active: true,
      create_user_id: data.create_user_id ?? '',
      last_update_user_id: data.create_user_id ?? '',
      currency: data.currency,
      logo: data.logo ?? null,
    });
    const project = await this.getProjectById(projectId);
    if (!project) {
      throw new Error('Project not found after creation');
    }
    return project;
  }

  async updateProject(id: string, data: ProjectInput): Promise<Project | null> {
    const updateData = {
      ...data,
      description: data.description ?? undefined,
      start_date: data.start_date ?? undefined,
      end_date: data.end_date ?? undefined,
      last_update_date: new Date(),
      logo: data.logo ?? null,
    };
    await this.projectRepository.updateProject(id, updateData);
    return this.getProjectById(id);
  }

  async deleteProject(id: string): Promise<boolean> {
    await this.projectRepository.deleteProject(id);
    return true;
  }
}
