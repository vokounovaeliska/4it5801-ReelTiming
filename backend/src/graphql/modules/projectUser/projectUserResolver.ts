import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { RateService } from '@backend/graphql/modules/rate/rateService';
import { Rate } from '@backend/graphql/modules/rate/rateType';

import { CustomContext } from '../../../types/types';
import { DepartmentService } from '../department/departmentService';
import { Department } from '../department/departmentType';
import { ProjectService } from '../project/projectService';
import { Project } from '../project/projectType';
import { UserService } from '../user/userService';
import { User } from '../user/userType';

import { ProjectUserService } from './projectUserService';
import { ProjectUser, ProjectUserInput } from './projectUserType';

@Resolver(() => ProjectUser)
export class ProjectUserResolver {
  @Query(() => [ProjectUser])
  async project_users(@Ctx() { db }: CustomContext): Promise<ProjectUser[]> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.getAllProjectUsers();
  }

  @Query(() => ProjectUser, { nullable: true })
  async projectUser(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser | null> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.getProjectUserById(id);
  }

  @Query(() => [ProjectUser])
  async projectUsers(
    @Arg('projectId') projectId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser[]> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.getProjectUsersByProjectId(projectId);
  }

  @FieldResolver(() => Project)
  async project(
    @Root() projectUser: ProjectUser,
    @Ctx() { db }: CustomContext,
  ): Promise<Project | null> {
    const projectService = new ProjectService(db);
    return projectService.getProjectById(projectUser.project_id);
  }

  @FieldResolver(() => User)
  async user(
    @Root() projectUser: ProjectUser,
    @Ctx() { db }: CustomContext,
  ): Promise<User | null> {
    const userService = new UserService(db);
    return userService.getUserById(projectUser.user_id);
  }

  @FieldResolver(() => Rate, { nullable: true })
  async rate(
    @Root() projectUser: ProjectUser,
    @Ctx() { db }: CustomContext,
  ): Promise<Rate | null> {
    const rateService = new RateService(db);
    if (projectUser.rate_id) {
      return rateService.getRateById(projectUser.rate_id);
    }
    return null;
  }

  @FieldResolver(() => Department, { nullable: true })
  async department(
    @Root() projectUser: ProjectUser,
    @Ctx() { db }: CustomContext,
  ): Promise<Department | null> {
    const departmentService = new DepartmentService(db);
    if (projectUser.department_id) {
      return departmentService.getDepartmentById(projectUser.department_id);
    }
    return null;
  }

  @Mutation(() => ProjectUser)
  async addProjectUser(
    @Arg('projectId') projectId: string,
    @Arg('userId') userId: string,
    @Arg('isTeamLeader', { nullable: true, defaultValue: false })
    isTeamLeader: boolean,
    @Arg('rateId', () => String, { nullable: true, defaultValue: null })
    rateId: string | null,
    @Arg('departmentId', () => String, { nullable: true, defaultValue: null })
    departmentId: string | null,
    @Arg('role', () => String, { nullable: true, defaultValue: null })
    role: string | null,
    @Arg('invitation', () => String, { nullable: true, defaultValue: null })
    invitation: string | null,
    @Arg('phone_number', () => String, { nullable: true, defaultValue: null })
    phone_number: string | null,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser> {
    const projectUserService = new ProjectUserService(db);

    const data: ProjectUserInput = {
      project_id: projectId,
      user_id: userId,
      is_team_leader: isTeamLeader,
      rate_id: rateId,
      department_id: departmentId,
      role: role,
      invitation: invitation,
      phone_number: phone_number,
    };
    return projectUserService.createProjectUser(data);
  }

  @Mutation(() => Boolean)
  async deleteProjectUser(
    @Arg('projectUserId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.deleteProjectUser(id);
  }

  @Mutation(() => ProjectUser)
  async updateProjectUser(
    @Arg('projectUserId') id: string,
    @Arg('data') data: ProjectUserInput,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser | null> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.updateProjectUser(id, data);
  }

  @Query(() => Boolean)
  async isUserAdminInProject(
    @Arg('userId') uderId: string,
    @Arg('projectId') projectId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.isUserAdminInProject(uderId, projectId);
  }
}
