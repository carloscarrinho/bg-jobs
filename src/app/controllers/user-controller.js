import Queue from "../lib/queue";

export default {
  async store(req, res) {
    const { name, email, password } = req.body;

    // Create an user
    const user = { name, email, password };

    // Add job to queue
    await Queue.add('registration-mail', { user });
    await Queue.add('users-report', [user, {
      name: 'Emili Vilar',
      email: 'emilivilar@mail.com',
      password: '1234'
    }]);

    return res.json(user);
  },
};
