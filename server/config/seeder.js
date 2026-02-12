const User = require('../models/User');

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            console.log('Admin already exists');
            return;
        }

        const adminUser = await User.create({
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'admin'
        });

        console.log(`Admin created: ${adminUser.username}`);
    } catch (error) {
        console.error(`Error seeding admin: ${error.message}`);
    }
};

module.exports = seedAdmin;
