// Test script untuk diagnose login error
const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function testLogin() {
  console.log("🔍 Testing Login System...\n");

  try {
    // Test 1: Database Connection
    console.log("1️⃣ Testing Database Connection...");
    await prisma.$connect();
    console.log("✅ Database Connected\n");

    // Test 2: Check Users in Database
    console.log("2️⃣ Fetching Users from Database...");
    const users = await prisma.tb_user.findMany({
      include: {
        role: true,
        airline: true
      }
    });
    console.log(`✅ Found ${users.length} users:\n`);
    
    users.forEach(user => {
      console.log(`   - Email: ${user.email}`);
      console.log(`     Role: ${user.role.code_role}`);
      console.log(`     Active: ${user.is_active === 1 ? 'Yes' : 'No'}`);
      console.log(`     Airline: ${user.airline?.airline_name || 'None'}`);
      console.log();
    });

    // Test 3: Test Password Verification
    console.log("3️⃣ Testing Password Verification...\n");
    
    const testAccounts = [
      { email: 'admin@jas.com', password: 'admin123' },
      { email: 'airline@jas.com', password: 'airline123' },
      { email: 'view@jas.com', password: 'view123' },
      { email: 'erva@gmail.com', password: 'erva123' }
    ];

    for (const account of testAccounts) {
      const user = await prisma.tb_user.findFirst({
        where: { email: account.email, is_active: 1 },
        include: { role: true, airline: true }
      });

      if (user) {
        const isPasswordValid = await bcrypt.compare(account.password, user.password);
        console.log(`   Email: ${account.email}`);
        console.log(`   Password (${account.password}): ${isPasswordValid ? '✅ Valid' : '❌ Invalid'}`);
        console.log(`   User Found: ✅`);
        console.log(`   Active: ${user.is_active === 1 ? '✅' : '❌'}`);
        console.log(`   Role: ${user.role.code_role}`);
        console.log();
      } else {
        console.log(`   Email: ${account.email}`);
        console.log(`   Status: ❌ User not found or inactive\n`);
      }
    }

    // Test 4: Check Role Table
    console.log("4️⃣ Checking Roles Table...");
    const roles = await prisma.tb_role.findMany();
    console.log(`✅ Found ${roles.length} roles:`);
    roles.forEach(role => {
      console.log(`   - ID: ${role.id_role}, Code: ${role.code_role}, Active: ${role.is_active}`);
    });
    console.log();

    console.log("✅ All Tests Completed!\n");
    console.log("📋 SUMMARY:");
    console.log("   If you see '✅ Valid' next to your test password, the login should work.");
    console.log("   If you see '❌ Invalid', use one of the test accounts above.");
    console.log("\n🔑 Default Test Credentials:");
    console.log("   Admin   : admin@jas.com / admin123");
    console.log("   Airline : airline@jas.com / airline123");
    console.log("   View    : view@jas.com / view123");
    console.log("   Custom  : erva@gmail.com / erva123");

  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    console.error("\nFull Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();

