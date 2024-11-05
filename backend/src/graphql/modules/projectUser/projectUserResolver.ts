import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Project } from '../project/projectType';
import {
  CreateProjectUserInput,
  ProjectUser,
  ProjectUserInput,
} from './projectUserType';
import { User } from '../user/userType';
import { Rate } from '../rate/rateType';
import { Department } from '../department/departmentType';
import { ProjectUserService } from './projectUserService';
import { ProjectService } from '../project/projectService';
import { UserService } from '../user/userService';
import { RateService } from '../rate/rateService';
import { DepartmentService } from '../department/departmentService';
import { CustomContext } from '../../../types/types';
import { GraphQLError } from 'graphql';

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

  @FieldResolver(() => User, { nullable: true })
  async user(
    @Root() projectUser: ProjectUser,
    @Ctx() { db }: CustomContext,
  ): Promise<User | null> {
    const userService = new UserService(db);
    try {
      return await userService.getUserById(projectUser.user_id!);
    } catch (error) {
      if (error instanceof GraphQLError && error.message === 'User not found') {
        return null;
      }
      throw error;
    }
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
    @Arg('userId', { nullable: true, defaultValue: null }) userId: string,
    @Arg('isTeamLeader', { nullable: true, defaultValue: false })
    isTeamLeader: boolean,
    @Arg('rateId', () => String, { nullable: true, defaultValue: null })
    rateId: string | null,
    @Arg('departmentId', () => String, { nullable: true, defaultValue: null })
    departmentId: string | null,
    @Arg('role', () => String, { nullable: true, defaultValue: 'CREW' })
    role: string | null,
    @Arg('invitation', () => String, { nullable: true, defaultValue: null })
    invitation: string | null,
    @Arg('phone_number', () => String, { nullable: true, defaultValue: null })
    phone_number: string | null,
    @Arg('position', () => String, { nullable: true, defaultValue: null })
    position: string | null,
    @Arg('name') name: string,
    @Arg('surname') surname: string,
    @Arg('email') email: string,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser> {
    const projectUserService = new ProjectUserService(db);
    const data: CreateProjectUserInput = {
      project_id: projectId,
      user_id: userId,
      is_team_leader: isTeamLeader,
      rate_id: rateId,
      department_id: departmentId,
      role,
      invitation,
      phone_number,
      name,
      surname,
      email,
      position,
    };
    return projectUserService.createProjectUser(data);
  }

  @Query(() => [Project])
  async userProjects(
    @Arg('userId') userId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Project[]> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.getProjectsByUserId(userId);
  }
  @Query(() => String, { nullable: true })
  async userRoleInProject(
    @Arg('userId') userId: string,
    @Arg('projectId') projectId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<string | null> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.getUserRoleInProject(userId, projectId);
  }
  @Query(() => ProjectUser)
  async projectUsersByToken(
    @Arg('token') token: string,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser | null> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.getProjectUserByToken(token);
  }

  @Mutation(() => Boolean)
  async inviteUser(
    @Arg('projectUserId') projectUserId: string,
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.inviteUserToProject(
      projectUserId,
      name,
      email,
      db,
    );
  }

  @Mutation(() => Boolean)
  async deleteProjectUser(
    @Arg('projectUserId') projectUserId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.deleteProjectUserById(projectUserId);
  }
  @Mutation(() => Boolean)
  async activateProjectUser(
    @Arg('token') token: string,
    @Arg('userId') userId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.activateProjectUserByToken(token, userId);
  }
  @Mutation(() => ProjectUser)
  async updateProjectUser(
    @Arg('id') id: string,
    @Arg('data') data: ProjectUserInput,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser | null> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.updateProjectUser(id, data);
  }
  @Mutation(() => Boolean)
  async deleteInvitation(
    @Arg('projectUserId') projectUserId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.deleteInvitation(projectUserId);
  }
}
