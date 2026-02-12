const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const generateHash = () => {
    rl.question('Enter password to hash: ', async (password) => {
        if (!password) {
            console.log('Password cannot be empty.');
            rl.close();
            return;
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            console.log('\nCopy this hash and paste it into MongoDB Compass:');
            console.log('--------------------------------------------------');
            console.log(hash);
            console.log('--------------------------------------------------');
        } catch (err) {
            console.error('Error generating hash:', err);
        }

        rl.close();
    });
};

generateHash();
