import type { PrismaClient } from '../../generated/prisma/client.js';
import {
  type CreateAdminRequest,
  type LoginAdminRequest,
  type AdminData,
  type ApiResponse,
  toAdminResponse,
  toAdminListResponse,
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
  ): Promise<ApiResponse<AdminData>> {

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

    return toAdminResponse(
      admin,
      'Admin created successfully'
    );
  }

  // ===============================
  // LOGIN ADMIN
  // ===============================
  static async LoginAdmin(
    prisma: PrismaClient,
    request: LoginAdminRequest,
  ): Promise<ApiResponse<AdminData>> {

    const validatedRequest = adminValidation.LOGIN.parse(request);

    const admin = await prisma.admin.findFirst({
      where: { name_admin: validatedRequest.name_admin },
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

    return toAdminResponse(
      admin,
      'Login successful',
      token
    );
  }

  // ===============================
// LOGOUT ADMIN
// ===============================
static async LogoutAdmin(
  prisma: PrismaClient,
  adminId: number,
): Promise<ApiResponse<AdminData>> {

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
  // UPDATE ADMIN
  // ===============================
  static async UpdateAdminById(
    prisma: PrismaClient,
    id: number,
    request: Partial<CreateAdminRequest>,
  ): Promise<ApiResponse<AdminData>> {

    const validatedRequest = adminValidation.UPDATE.parse(request);

    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin not found',
      });
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: validatedRequest,
    });

    return toAdminResponse(
      updatedAdmin,
      'Admin updated successfully'
    );
  }

  // ===============================
  // DELETE ADMIN
  // ===============================
  static async DeleteAdminById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<AdminData>> {

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

    return toAdminResponse(
      admin,
      'Admin deleted successfully'
    );
  }

  // ===============================
  // GET ALL ADMINS
  // ===============================
  static async GetAllAdmins(
    prisma: PrismaClient,
  ): Promise<ApiResponse<AdminData[]>> {

    const admins = await prisma.admin.findMany();

    return toAdminListResponse(
      admins,
      'Get all admins successfully'
    );
  }

  // ===============================
  // GET ADMIN BY ID
  // ===============================
  static async GetAdminById(
    prisma: PrismaClient,
    id: number,
  ): Promise<ApiResponse<AdminData>> {
    const admin = await prisma.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      throw new HTTPException(404, {
        message: 'Admin not found',
      });
    }
    return toAdminResponse(
      admin,
      'Get admin successfully'
    );
  }
}
