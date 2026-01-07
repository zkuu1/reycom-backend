import type { PrismaClient } from '../../generated/prisma/client.js';
import {
  type CreateCarrerRequest,
  type CarrerResponse,
} from '../../models/carrer/carrer-model.js';
import { carrerValidation } from '../../validations/carrer/carrer-validation.js';
import { HTTPException } from 'hono/http-exception';

export class CarrerService {

// / ===============================
  // CREATE CARRER
  // ===============================

    static async CreateCarrer(
        prisma: PrismaClient,
        request: CreateCarrerRequest,
    ): Promise<CarrerResponse> {
        const validatedRequest = carrerValidation.CREATE.parse(request);    
        const carrer =  await prisma.careers.create({
            data: {
                ...validatedRequest,
            },
        });
        return {
            id_career: carrer.id,
            job_date: carrer.job_date,
            job_name: carrer.job_name,
        };
    }   

  // ===============================
  // GET ALL CARRER
  // ===============================

    static async GetAllCarrer(
    prisma: PrismaClient,
  ): Promise<CarrerResponse[]> {
    const careers = await prisma.careers.findMany();
    return careers.map((carrer) => ({
        id_career: carrer.id,
        job_date: carrer.job_date,
        job_name: carrer.job_name,
    }));}


  }



  