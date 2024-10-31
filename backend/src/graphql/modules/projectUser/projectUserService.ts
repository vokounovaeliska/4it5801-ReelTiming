import { Db } from '@backend/types/types';
import { getProjectUserRepository } from './projectUserRepository';
import {
  CreateProjectUserInput,
  ProjectUser,
  ProjectUserInput,
} from './projectUserType';
import { Project } from '../project/projectType';
import { UserService } from '../user/userService';
import { GraphQLError } from 'graphql';
import { randomBytes } from 'crypto';
import { APP_LINK } from '@backend/config';
import path from 'path';

import { promises as fs } from 'fs';
import { sendMail } from '@backend/mailer/mailer';
import { ProjectService } from '../project/projectService';
import { getUserRepository } from '../user/userRepository';

const ADMIN = 'ADMIN';

export class ProjectUserService {
  private projectUserRepository: ReturnType<typeof getProjectUserRepository>;
  private userRepository: ReturnType<typeof getUserRepository>;

  constructor(db: Db) {
    this.projectUserRepository = getProjectUserRepository(db);
    this.userRepository = getUserRepository(db);
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

  async createProjectUser(data: CreateProjectUserInput): Promise<ProjectUser> {
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
      phone_number: data.phone_number ?? null,
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
  async getUserRoleInProject(
    userId: string,
    projectId: string,
  ): Promise<string | null> {
    const projectUser =
      await this.projectUserRepository.getProjectUserByUserIdAndProjectId(
        userId,
        projectId,
      );
    return projectUser ? projectUser.role : null;
  }
  async getProjectUserByToken(token: string): Promise<ProjectUser | null> {
    const projectUser =
      await this.projectUserRepository.getProjectUserByToken(token);
    if (!projectUser) {
      return null;
    }
    return projectUser;
  }
  async handleToken(token: string, db: Db) {
    const projectUserService = new ProjectUserService(db);
    const projectUser = await projectUserService.getProjectUserByToken(token);

    if (projectUser) {
      // user is already registered, join the project
      console.log('User is already registered, joining the project...');
      // Implement logic to join the project
    } else {
      // user is not registered, allow registration
      console.log('User is not registered, allow registration...');
      // implement logic to register the user and join the project
    }
  }

  async inviteUserToProject(
    projectId: string,
    userId: string,
    db: Db,
  ): Promise<boolean> {
    const userService = new UserService(db);
    const userById = await userService.getUserById(userId);

    if (userById === null) {
      throw new GraphQLError('User not found');
    }

    const projectService = new ProjectService(db);
    const projectById = await projectService.getProjectById(projectId);

    if (projectById === null) {
      throw new GraphQLError('Project not found');
    }

    const token = randomBytes(32).toString('hex'); // Generate token

    this.projectUserRepository.inviteUserToProject(projectId, userId, token);

    const resetLink = APP_LINK + `/accept-invitation?token=${token}`;
    try {
      const templatePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'mailer',
        'invite-to-project-email.html',
      );

      let htmlContent = await fs.readFile(templatePath, 'utf-8');
      htmlContent = htmlContent.replace('{{invitationLink}}', resetLink);
      htmlContent = htmlContent.replace('{{projectName}}', projectById.name);
      htmlContent = htmlContent.replace('{{name}}', userById.name);

      await sendMail(userById.email, 'Invitation to project', htmlContent);
    } catch (error) {
      console.error('Error sending invitation email:', error);
      throw new GraphQLError('Failed to send invtiation email.');
    }

    return true;
  }

  async deleteProjectUserByUserIdAndProjectId(
    userId: string,
    projectId: string,
  ): Promise<boolean> {
    const projectUser =
      await this.projectUserRepository.getProjectUserByUserIdAndProjectId(
        userId,
        projectId,
      );
    if (!projectUser) {
      throw new Error('Project user not found');
    }
    await this.projectUserRepository.deleteProjectUser(projectUser.id);
    return true;
  }
  async activateProjectUserByToken(
    token: string,
    userId: string,
  ): Promise<boolean> {
    const projectUser =
      await this.projectUserRepository.getProjectUserByToken(token);
    if (!projectUser) {
      throw new Error('Project user not found');
    }
    if (projectUser.is_active) {
      throw new Error('Project user is already active');
    }
    await this.projectUserRepository.updateProjectUser(projectUser.id, {
      is_active: true,
      user_id: userId,
    });
    this.userRepository.deleteUser(projectUser.user_id);
    return true;
  }
}
