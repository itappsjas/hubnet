import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create default roles
  const adminRole = await prisma.tb_role.upsert({
    where: { id_role: 1 },
    update: {},
    create: {
      code_role: 'Admin',
      is_active: 1,
    },
  })

  const managerRole = await prisma.tb_role.upsert({
    where: { id_role: 2 },
    update: {},
    create: {
      code_role: 'Manager',
      is_active: 1,
    },
  })

  const userRole = await prisma.tb_role.upsert({
    where: { id_role: 3 },
    update: {},
    create: {
      code_role: 'User',
      is_active: 1,
    },
  })

  console.log('✅ Roles created:', { adminRole, managerRole, userRole })

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const adminUser = await prisma.tb_user.upsert({
    where: { email: 'admin@jas.com' },
    update: {},
    create: {
      email: 'admin@jas.com',
      password: hashedPassword,
      id_role: adminRole.id_role,
      is_active: 1,
    },
  })

  console.log('✅ Admin user created:', { email: adminUser.email })

  // Create sample users (optional)
  const sampleUsers = [
    {
      email: 'manager@jas.com',
      password: await bcrypt.hash('manager123', 10),
      id_role: managerRole.id_role,
      is_active: 1,
    },
    {
      email: 'user@jas.com',
      password: await bcrypt.hash('user123', 10),
      id_role: userRole.id_role,
      is_active: 1,
    },
    {
      email: 'erva@gmail.com',
      password: await bcrypt.hash('password123', 10),
      id_role: adminRole.id_role,
      is_active: 1,
    },
  ]

  for (const userData of sampleUsers) {
    await prisma.tb_user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    })
    console.log(`✅ Sample user created: ${userData.email}`)
  }

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

