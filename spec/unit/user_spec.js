const sequelize = require('../../db/models/index').sequelize;
const User = require('../../db/models').User;

describe('User', () => {
    beforeEach(async (done) => {
        try {
            await sequelize.sync({ force: true });
            done();
        } catch (err) {
            console.log(err);
            done();
        }
    });
    describe('create user', () => {
        it('should create a User', async (done) => {
            try {
                const user = await User.create({
                    email: 'user@example.com',
                    password: '1234567890',
                    name: 'John',
                });
                expect(user.email).toBe('user@example.com');
                expect(user.id).toBe(1);
                done();
            } catch (err) {
                console.log(err);
                done();
            }
        });
        it('should not create a user with an email already taken', async (done) => {
            try {
                await User.create({
                    email: 'user@example.com',
                    password: '1234567890',
                    name: 'Jack',
                });

                await User.create({
                    email: 'user@example.com',
                    password: 'nananananananananananananananana BATMAN!',
                    name: 'Jim',
                });

                const allUsers = await User.findAll();
                expect(allUsers.length).toBe(1);
                done();
            } catch (err) {
                expect(err.errors[0].message).toBe('email must be unique');
                done();
            }
        });
    });
});
