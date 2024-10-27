import { GraphQLError } from 'graphql';

import { Db } from '@backend/types/types';

import { getDepartmentRepository } from './departamentRepository';

export class DepartmentService {
  constructor(private db: Db) {
    this.departmentRepository = getDepartmentRepository(db);
  }

  private departmentRepository;

  /**
   * Get all departments in the system
   */
  async getAllDepartments() {
    const users = await this.departmentRepository.getAllDepartments();
    return users.map((department) => ({
      ...department,
    }));
  }

  /**
   * Get a department by ID
   * @param id string - department id
   */
  async getDepartmentById(id: string) {
    const department = await this.departmentRepository.getDepartmentById(id);
    if (!department || department.length === 0) {
      throw new GraphQLError('User not found');
    }
    return department[0];
  }

  /**
   * Get a department by name
   * @param name string - department name
   */
  async getDepartmentByEmail(name: string) {
    const department = await this.departmentRepository.geDepartmentByName(name);
    if (!department || department.length === 0) {
      throw new GraphQLError('Department not found');
    }
    return department[0];
  }

  /**
   * Create a new department
   * @param data - object containing department creation data
   */
  async createDepartment(name: string) {
    const departmentData = {
      name: name,
    };

    const departmentId =
      await this.departmentRepository.createDepartment(departmentData);
    const department = await this.getDepartmentById(departmentId);
    if (!department) {
      throw new Error('Department not found after creation');
    }
    return department;
  }

  /**
   * Update a department by ID
   * @param id string - department id
   * @param data - object containing department update data
   */
  async updateDepartment(id: string, name: string) {
    const department = await this.getDepartmentById(id);

    const updatedDepartmentData = {
      ...department,
      name,
    };

    await this.departmentRepository.updateDepartment(id, updatedDepartmentData);
    return updatedDepartmentData;
  }

  /**
   * Delete a user by ID
   * @param id string - user id
   */
  async deleteDepartment(id: string) {
    await this.departmentRepository.deleteDepartment(id);
    return true;
  }
}
