import { Db } from '@backend/types/types';
import { getProjectUserRepository } from './projectUserRepository';
import { ProjectUser, ProjectUserInput } from './projectUserType';
import { Project } from '../project/projectType';

const ADMIN = 'ADMIN';

export class ProjectUserService {
  private projectUserRepository: ReturnType<typeof getProjectUserRepository>;

  constructor(db: Db) {
    this.projectUserRepository = getProjectUserRepository(db);
  }

  async getAllProjectUsers(): Promise<ProjectUser[]> {
    const projectUsers = await this.projectUserRepository.getAllProjectUsers();
    return projectUsers.map((projUser) => ({
      ...projUser,
      create_date: new Date(projUser.create_date),
    }));
  }

  async getProjectUsersByProjectId(projectId: string) {
    return this.projectUserRepository.getProjectUsersByProjectId(projectId);
  }

  async getProjectUserById(id: string): Promise<ProjectUser | null> {
    const projectUser = await this.projectUserRepository.getProjectUserById(id);
    if (!projectUser) {
      return null;
    }
    return projectUser;
  }

  async createProjectUser(data: ProjectUserInput): Promise<ProjectUser> {
    const createdAt = new Date();
    const userId = 'user-id'; // actual user id
    const projectUserId = await this.projectUserRepository.createProjectUser({
      ...data,
      project_id: data.project_id,
      user_id: data.user_id,
      is_team_leader: data.is_team_leader ?? false, // always needs to be defined
      create_date: createdAt,
      last_update_date: createdAt,
      create_user_id: userId,
      last_update_user_id: userId,
      is_active: false,
    });
    const projectUser = await this.getProjectUserById(projectUserId);
    if (!projectUser) {
      throw new Error('Failed to create project user');
    }
    return projectUser;
  }

  async updateProjectUser(
    id: string,
    data: ProjectUserInput,
  ): Promise<ProjectUser | null> {
    await this.projectUserRepository.updateProjectUser(id, {
      ...data,
      last_update_date: new Date(),
    });
    return this.getProjectUserById(id);
  }

  async deleteProjectUser(id: string): Promise<boolean> {
    await this.projectUserRepository.deleteProjectUser(id);
    return true;
  }

  async getProjectUserByUserIdAndProjectId(userId: string, projectId: string) {
    const projectUser =
      await this.projectUserRepository.getProjectUserByUserIdAndProjectId(
        userId,
        projectId,
      );
    if (!projectUser) {
      return null;
    }
    return projectUser;
  }

  async isUserAdminInProject(userId: string, projectId: string) {
    const projectUser =
      await this.projectUserRepository.getProjectUserByUserIdAndProjectId(
        userId,
        projectId,
      );
    if (!projectUser) {
      return false;
    }
    if (projectUser && projectUser.role !== ADMIN) {
      return true;
    } else {
      return false;
    }
  }

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    const projectRecords =
      await this.projectUserRepository.getProjectsByUserId(userId);
    return projectRecords.map((record) => ({
      ...record.project,
      create_date: new Date(record.project.create_date),
      start_date: record.project.start_date
        ? new Date(record.project.start_date)
        : null,
      end_date: record.project.end_date
        ? new Date(record.project.end_date)
        : null,
      is_active: !!record.project.is_active,
    }));
  }
}
