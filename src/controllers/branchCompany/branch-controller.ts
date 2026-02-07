import { Hono } from 'hono'
import withPrisma from '../../lib/prisma.js'
import { safeJson } from '../../helpers/safeJson.js'
import type { ContextWithPrisma } from '../../types/context.js'

import { BranchService } from '../../services/branchCompany/branch-service.js'
import { BranchValidation } from '../../validations/branchCompany/branch-validation.js'

export const BranchController = new Hono<ContextWithPrisma>()

// ===============================
// CREATE BRANCH
// ===============================
BranchController.post('/branch', withPrisma, async (c) => {
  const prisma = c.get('prisma')

  const raw = await safeJson(c)
  const validated = BranchValidation.CREATE.parse(raw)

  const response = await BranchService.createBranch(prisma, {
    nameBranch: validated.nameBranch,
    companyId: validated.companyId,
    streetAddress: validated.streetAddress,
    phone: validated.phone,
    email: validated.email,
    website: validated.website,
    company: { connect: { id: validated.companyId } }
  })

  return c.json(response, 201)
})


// ===============================
// GET ALL BRANCHES
// ===============================
BranchController.get('/branch', withPrisma, async (c) => {
  const prisma = c.get('prisma')

  const response = await BranchService.getAllBranches(prisma)

  return c.json(response, 200)
})


// ===============================
// GET BRANCH BY ID
// ===============================
BranchController.get('/branch/:id', withPrisma, async (c) => {
  const prisma = c.get('prisma')

  const id = Number(c.req.param('id'))

  if (Number.isNaN(id)) {
    return c.json({
      success: false,
      message: 'Invalid branch id',
      data: null
    }, 400)
  }

  const response = await BranchService.getBranchById(prisma, id)

  return c.json(response, 200)
})


// ===============================
// UPDATE BRANCH BY ID
// ===============================
BranchController.patch('/branch/:id', withPrisma, async (c) => {
  const prisma = c.get('prisma')

  const id = Number(c.req.param('id'))

  if (Number.isNaN(id)) {
    return c.json({
      success: false,
      message: 'Invalid branch id',
      data: null
    }, 400)
  }

  const raw = await safeJson(c)
  const validated = BranchValidation.UPDATE.parse(raw)

  // ✅ camelCase → snake_case mapping
  const prismaData = {
    name_branch: validated.nameBranch,
    street_address: validated.streetAddress,
    phone: validated.phone,
    email: validated.email,
    website: validated.website
  }

  const response = await BranchService.updateBranchById(
    prisma,
    id,
    prismaData
  )

  return c.json(response, 200)
})


// ===============================
// DELETE BRANCH BY ID
// ===============================
BranchController.delete('/branch/:id', withPrisma, async (c) => {
  const prisma = c.get('prisma')

  const id = Number(c.req.param('id'))

  if (Number.isNaN(id)) {
    return c.json({
      success: false,
      message: 'Invalid branch id',
      data: null
    }, 400)
  }

  const response = await BranchService.deleteBranchById(prisma, id)

  return c.json(response, 200)
})