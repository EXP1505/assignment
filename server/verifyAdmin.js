const mongoose = require('mongoose');
const dotenv = require('dotenv');
const readline = require('readline');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const verifyAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        rl.question('Enter Admin Username: ', async (username) => {
            rl.question('Enter Admin Password: ', async (password) => {

                const user = await User.findOne({ username });

                if (!user) {
                    console.log(`❌ User '${username}' not found.`);
                    process.exit(1);
                }

                if (user.role !== 'admin') {
                    console.log(`❌ User '${username}' exists but is NOT an Admin (Role: ${user.role}).`);
                    process.exit(1);
                }

                console.log(`✅ User found and is an Admin.`);

                // Check if password matches via bcrypt (normal login)
                const isMatch = await user.matchPassword(password);

                if (isMatch) {
                    console.log(`✅ Password is correct and properly hashed.`);
                } else {
                    // Check if it matches as plain text
                    if (user.password === password) {
                        console.log(`⚠️  Password matches as PLAIN TEXT. Fixing...`);

                        user.password = password;
                        user.markModified('password');
                        await user.save();

                        console.log(`✅ Password has been hashed and saved.`);
                    } else {
                        console.log(`❌ Invalid Password.`);
                    }
                }

                rl.close();
                process.exit(0);
            });
        });

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyAdmin();
