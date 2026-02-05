import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import { CompanyValidation } from '../../validations/company/company-validation.js';
import {safeJson} from '../../helpers/safeJson.js';
import type { ContextWithPrisma } from '../../types/context.js';
import { CompanyService } from '../../services/company/company-service.js';
import { authAdminMiddleware } from '../../middlewares/middleware.js';


export const CompanyController = new Hono<ContextWithPrisma>();

// ===============================
// GET ALL COMPANY
// ===============================
CompanyController.get('/company', withPrisma, async (c) => {
    const prisma = c.get('prisma')
    const response = await CompanyService.getAllCompanies(prisma)
    return c.json(response, 200)
})

// ===============================
// GET COMPANY BY ID
// ===============================
CompanyController.get('/company/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma')
    const id = Number(c.req.param('id'));
    const response = await CompanyService.getCompanyById(prisma, id);
    return c.json(response, 200);
})

// ===============================
// CREATE COMPANY
// ===============================
CompanyController.post('/company', withPrisma, authAdminMiddleware, async (c) => {
    const prisma = c.get('prisma')
    const raw = await safeJson(c);
    const validated = CompanyValidation.CREATE.parse(raw);
    const response = await CompanyService.createCompany(prisma, validated);
    return c.json(response, 201);
})


// ===============================
// UPDATE COMPANY
// ===============================
CompanyController.patch('/company/:id', withPrisma, authAdminMiddleware,async (c) => {
    const prisma = c.get('prisma')
    const id = Number(c.req.param('id'))
    const validated = CompanyValidation.UPDATE.parse(await safeJson(c));
    const response = await CompanyService.updateCompanyById(prisma, id, validated);
    return c.json(response, 200);
})

// ===============================
// DELETE COMPANY
// ===============================
CompanyController.delete('/company/:id', withPrisma, authAdminMiddleware,async (c) => {
    const prisma = c.get('prisma')
    const id = Number(c.req.param('id'))
    const response = await CompanyService.deleteCompanyById(prisma,id)
    return c.json(response, 200)
})
