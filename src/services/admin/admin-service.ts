import type { PrismaClient } from '../../generated/prisma/client.js';
import {
  type CreateAdminRequest,
  type LoginAdminRequest,
  type AdminResponse,
  toAdminResponse,
} from '../../models/admin/admin-model.js';
import { adminValidation } from '../../validations/admin/admin-validation.js';
import { HTTPException } from 'hono/http-exception';
import bcrypt from 'bcrypt';
import { generateAdminToken } from '../../utils/jwt.js';

export class AdminService {
  // ===============================
  // CREATE ADMIN
  // ===============================
  static async CreateAdmin(
    prisma: PrismaClient,
    request: CreateAdminRequest,
  ): Promise<AdminResponse> {
    const validatedRequest = adminValidation.CREATE.parse(request);

    const totalAdminWithSameName = await prisma.admin.count({
      where: { name_admin: validatedRequest.name_admin },
    });

    if (totalAdminWithSameName !== 0) {
      throw new HTTPException(400, {
        message: 'Admin with the same name already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(validatedRequest.password, 10);

    const admin = await prisma.admin.create({
      data: {
        ...validatedRequest,
        password: hashedPassword,
      },
    });

    return toAdminResponse(admin, 'Admin created successfully');
  }

  // ===============================
  // LOGIN ADMIN
  // ===============================
  static async loginAdmin(
    prisma: PrismaClient,
    request: LoginAdminRequest,
  ): Promise<AdminResponse> {
    const validatedRequest = adminValidation.LOGIN.parse(request);

    const admin = await prisma.admin.findFirst({
      where: {
        name_admin: validatedRequest.name_admin,
      },
    });

    if (!admin) {
      throw new HTTPException(401, {
        message: 'Invalid name or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      validatedRequest.password,
      admin.password,
    );

    if (!isPasswordValid) {
      throw new HTTPException(401, {
        message: 'Invalid name or password',
      });
    }

  const token = generateAdminToken({
    id: admin.id,
    name_admin: admin.name_admin,
  });

  await prisma.admin.update({
    where: { id: admin.id },
    data: { token },
  });

    return {
      ...toAdminResponse(admin, 'Login successful'),
      token,
    }
  }

  
  // ===============================
  // LOGIN ADMIN
  // ===============================
  static async logoutAdmin(
    prisma: PrismaClient,
    adminId: number,
  ): Promise<AdminResponse> {
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin not found',
      });
    }

    await prisma.admin.update({
      where: { id: adminId },
      data: { token: null },
    });

    return toAdminResponse(admin, 'Logout successful');
  }

  // ===============================
  // DELETE ADMIN
  // ===============================
  static async deleteAdminById(
    prisma: PrismaClient,
    id: number,
  ): Promise<AdminResponse> {
    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin not found',
      });
    }

    await prisma.admin.delete({
      where: { id },
    });

    return toAdminResponse(admin, 'Admin deleted successfully');
  }

  // ===============================
  // GET ALL ADMINS
  // ===============================
  static async GetAllAdmins(
    prisma: PrismaClient,
  ): Promise<AdminResponse[]> {
    const admins = await prisma.admin.findMany();

    return admins.map((admin) =>
      toAdminResponse(admin, 'Admin retrieved successfully'),
    );
  }
}
