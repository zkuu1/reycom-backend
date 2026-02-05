import { Hono } from 'hono';
import withPrisma from '../../lib/prisma.js';
import {safeJson} from '../../helpers/safeJson.js';
import type { ContextWithPrisma } from '../../types/context.js';
import { BranchService } from '../../services/branchCompany/branch-service.js';
import { BranchValidation } from '../../validations/branchCompany/branch-validation.js';    

export const BranchController = new Hono<ContextWithPrisma>();

// ===============================
// CREATE BRANCH
// ===============================
BranchController.post('/branch', withPrisma, async (c) => {
    const prisma = c.get('prisma')
    const raw = await safeJson(c);
    const validated = BranchValidation.CREATE.parse(raw);
    const response = await BranchService.createBranch(prisma, {
        nameBranch: validated.name_branch,
        company: {
            connect: { id: validated.companyId }
        }
    });
    return c.json(response, 201);
}
)

// ===============================
// GET ALL BRANCHES
// ===============================
BranchController.get('/branch', withPrisma, async (c) => {
    const prisma = c.get('prisma')
    const response = await BranchService.getAllBranches(prisma)
    return c.json(response, 200)
}   
)

// ===============================
// GET BRANCH BY ID
// ===============================
BranchController.get('/branch/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma')
    const id = Number(c.req.param('id'));
    const response = await BranchService.getBranchById(prisma, id);
    return c.json(response, 200);
}   
)

// ===============================
// UPDATE BRANCH By ID
// ===============================
BranchController.patch('/branch/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma')
    const id = Number(c.req.param('id'))
    const validated = BranchValidation.UPDATE.parse(await safeJson(c));
    const response = await BranchService.updateBranchById(prisma, id, validated);
    return c.json(response, 200);
})

// ===============================
// DELETE BRANCH By ID
// ===============================
BranchController.delete('/branch/:id', withPrisma, async (c) => {
    const prisma = c.get('prisma')
    const id = Number(c.req.param('id'))
    const response = await BranchService.deleteBranchById(prisma,id)
    return c.json(response, 200);
}
)



