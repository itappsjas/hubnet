// Script untuk reset password semua user ke default password
const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function resetPasswords() {
  console.log("🔄 Resetting Passwords...\n");

  const defaultPasswords = [
    { email: 'admin@jas.com', password: 'admin123' },
    { email: 'airline@jas.com', password: 'airline123' },
    { email: 'view@jas.com', password: 'view123' },
    { email: 'ervayd2004@gmail.com', password: 'admin123' },
    { email: 'angga@jas.com', password: 'airline123' },
    { email: 'erva@jas.com', password: 'airline123' }
  ];

  try {
    await prisma.$connect();
    console.log("✅ Connected to database\n");

    for (const account of defaultPasswords) {
      const user = await prisma.tb_user.findFirst({
        where: { email: account.email }
      });

      if (user) {
        // Hash password dengan bcrypt (sama seperti di login route)
        const hashedPassword = await bcrypt.hash(account.password, 10);
        
        await prisma.tb_user.update({
          where: { id_usr: user.id_usr },
          data: { password: hashedPassword }
        });

        console.log(`✅ Reset password for: ${account.email}`);
        console.log(`   New password: ${account.password}\n`);
      } else {
        console.log(`❌ User not found: ${account.email}\n`);
      }
    }

    console.log("✅ All passwords have been reset!\n");
    console.log("📋 LOGIN CREDENTIALS:");
    console.log("=" .repeat(50));
    console.log("\n👤 ADMIN ACCOUNTS:");
    console.log("   Email: admin@jas.com");
    console.log("   Password: admin123\n");
    console.log("   Email: ervayd2004@gmail.com");
    console.log("   Password: admin123\n");
    
    console.log("✈️ AIRLINE ACCOUNTS:");
    console.log("   Email: airline@jas.com");
    console.log("   Password: airline123\n");
    console.log("   Email: angga@jas.com");
    console.log("   Password: airline123\n");
    console.log("   Email: erva@jas.com");
    console.log("   Password: airline123\n");
    
    console.log("👁️ VIEW ACCOUNT:");
    console.log("   Email: view@jas.com");
    console.log("   Password: view123\n");
    console.log("=" .repeat(50));
    console.log("\n✅ You can now login with these credentials!");

  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPasswords();

