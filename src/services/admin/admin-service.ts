import type { PrismaClient, Prisma } from '../../generated/prisma/client.js';
import {
  type AdminData,
  type ApiResponse,
  toAdminResponse,
  toAdminListResponse,
} from '../../models/admin/admin-model.js';

import { HTTPException } from 'hono/http-exception';
import bcrypt from 'bcrypt';
import { generateAdminToken } from '../../utils/jwt.js';
import { AdminRepository } from '../../repositories/admin/admin-repository.js';

export class AdminService {

  // ===============================
  // CREATE ADMIN
  // ===============================
  static async CreateAdmin(
    prisma: PrismaClient,
    data: Prisma.AdminCreateInput,
  ): Promise<ApiResponse<AdminData>> {

    const total = await AdminRepository.countByNameAdmin(
      prisma,
      data.name_admin,
    );

    if (total > 0) {
      throw new HTTPException(400, {
        message: 'Admin with the same name already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const admin = await AdminRepository.createAdmin(prisma, {
      ...data,
      password: hashedPassword,
    });

    return toAdminResponse(admin, 'Admin created successfully');
  }

  // ===============================
  // LOGIN ADMIN
  // ===============================
  static async LoginAdmin(
    prisma: PrismaClient,
    data: {
      name_admin: string;
      password: string;
    },
  ): Promise<ApiResponse<AdminData>> {

    const admin = await AdminRepository.findByNameAdmin(
      prisma,
      data.name_admin,
    );

    if (!admin) {
      throw new HTTPException(401, {
        message: 'Invalid name or password',
      });
    }

    const isValid = await bcrypt.compare(
      data.password,
      admin.password,
    );

    if (!isValid) {
      throw new HTTPException(401, {
        message: 'Invalid name or password',
      });
    }

    const token = generateAdminToken({
      id: admin.id,
      name_admin: admin.name_admin,
    });

    await AdminRepository.updateByIdAdmin(prisma, admin.id, {
      token,
    });

    return toAdminResponse(admin, 'Login successful', token);
  }

  // ===============================
  // LOGOUT ADMIN
  // ===============================
  static async LogoutAdmin(
    prisma: PrismaClient,
    adminId: number,
  ): Promise<ApiResponse<AdminData>> {

    const admin = await AdminRepository.findByIdAdmin(prisma, adminId);

    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin not found',
      });
    }

    await AdminRepository.updateByIdAdmin(prisma, adminId, {
      token: null,
    });

    return toAdminResponse(admin, 'Logout successful');
  }

  // ===============================
  // UPDATE ADMIN
  // ===============================
  static async UpdateAdminById(
    prisma: PrismaClient,
    id: number,
    data: Prisma.AdminUpdateInput,
  ): Promise<ApiResponse<AdminData>> {

    if (Object.keys(data).length === 0) {
      throw new HTTPException(400, {
        message: 'Minimum one field is required to update admin',
      });
    }

    const admin = await AdminRepository.findByIdAdmin(prisma, id);

    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin not found',
      });
    }

    const updated = await AdminRepository.updateByIdAdmin(
      prisma,
      id,
      data,
    );

    return toAdminResponse(updated, 'Admin updated successfully');
  }

  // ===============================
  // DELETE ADMIN
  // ===============================
  static async DeleteAdminById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<AdminData>> {

    const admin = await AdminRepository.findByIdAdmin(prisma, id);

    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin not found',
      });
    }

    await AdminRepository.deleteByIdAdmin(prisma, id);

    return toAdminResponse(admin, 'Admin deleted successfully');
  }

  // ===============================
  // GET ALL ADMINS
  // ===============================
  static async GetAllAdmins(
    prisma: PrismaClient,
  ): Promise<ApiResponse<AdminData[]>> {

    const admins = await AdminRepository.getAllAdmin(prisma);

    return toAdminListResponse(admins, 'Get all admins successfully');
  }

  // ===============================
  // GET ADMIN BY ID
  // ===============================
  static async GetAdminById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<AdminData>> {

    const admin = await AdminRepository.findByIdAdmin(prisma, id);

    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin with this id not found',
      });
    }

    return toAdminResponse(admin, 'Get admin successfully');
  }
}
