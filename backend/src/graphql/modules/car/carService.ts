import { Db } from '@backend/types/types';

import { getCarRepository } from './carRepository';
import { Car, CarInput } from './carType';

export class CarService {
  private carRepository: ReturnType<typeof getCarRepository>;

  constructor(db: Db) {
    this.carRepository = getCarRepository(db);
  }

  async getAllCars(): Promise<Car[]> {
    const cars = await this.carRepository.getAllCars();
    return cars;
  }

  async getCarById(id: string): Promise<Car | null> {
    const carRecord = await this.carRepository.getCarById(id);
    if (!carRecord) {
      return null;
    }
    return carRecord;
  }

  async getCarsByProjectUserId(projectUserId: string) {
    return this.carRepository.getCarsByProjectUserId(projectUserId);
  }

  async createCar(data: CarInput): Promise<Car> {
    const createdAt = new Date();
    const userId = 'user-id';
    const carId = await this.carRepository.createCar({
      ...data,
      create_date: createdAt,
      last_update_date: createdAt,
      create_user_id: userId,
      last_update_user_id: userId,
    });
    const car = await this.getCarById(carId);
    if (!car) {
      throw new Error('Failed to create car');
    }
    return car;
  }

  async updateCar(id: string, data: CarInput): Promise<Car | null> {
    await this.carRepository.updateCar(id, {
      name: data.name,
      kilometer_allow: data.kilometer_allow,
      kilometer_rate: data.kilometer_rate,
      last_update_date: data.last_update_date,
      last_update_user_id: data.last_update_user_id,
    });
    return this.getCarById(id);
  }

  async deleteCarById(id: string): Promise<boolean> {
    const car = await this.getCarById(id);
    if (!car) {
      throw new Error('Car not found');
    }
    await this.carRepository.deleteCar(car.id);
    return true;
  }
}
