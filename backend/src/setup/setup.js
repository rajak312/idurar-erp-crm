require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
const { globSync } = require('glob');
const fs = require('fs');
const { generate: uniqueId } = require('shortid');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE);

async function setupApp() {
  try {
    const Admin = require('../models/coreModels/Admin');
    const AdminPassword = require('../models/coreModels/AdminPassword');
    const Setting = require('../models/coreModels/Setting');
    const PaymentMode = require('../models/appModels/PaymentMode');
    const Taxes = require('../models/appModels/Taxes');

    const existingAdmin = await Admin.findOne({ email: 'admin@demo.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists. Skipping setup.');
      process.exit(0);
    }

    const salt = uniqueId();
    const newAdminPassword = new AdminPassword();
    const passwordHash = newAdminPassword.generateHash(salt, 'admin123');

    const demoAdmin = {
      email: 'admin@demo.com',
      name: 'IDURAR',
      surname: 'Admin',
      enabled: true,
      role: 'owner',
    };

    const createdAdmin = await new Admin(demoAdmin).save();

    const adminPasswordData = {
      password: passwordHash,
      emailVerified: true,
      salt: salt,
      user: createdAdmin._id,
    };
    await new AdminPassword(adminPasswordData).save();
    console.log('✅ Admin created');

    const settingsFiles = globSync('./src/setup/defaultSettings/**/*.json');
    const settingData = [];

    for (const filePath of settingsFiles) {
      const file = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      settingData.push(...file);
    }

    if (settingData.length) {
      await Setting.insertMany(settingData);
      console.log('✅ Settings inserted');
    }

    const existingTax = await Taxes.findOne({ taxName: 'Tax 0%' });
    if (!existingTax) {
      await Taxes.insertMany([{ taxName: 'Tax 0%', taxValue: '0', isDefault: true }]);
      console.log('✅ Taxes created');
    }

    const existingPayment = await PaymentMode.findOne({ name: 'Default Payment' });
    if (!existingPayment) {
      await PaymentMode.insertMany([
        {
          name: 'Default Payment',
          description: 'Default Payment Mode (Cash , Wire Transfert)',
          isDefault: true,
        },
      ]);
      console.log('✅ PaymentMode created');
    }

    console.log('🎉 Initial Setup Completed!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Setup failed:', err);
    process.exit(1);
  }
}

setupApp();
