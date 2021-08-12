import Mail from '../lib/mail';

export default {
  key: 'registration-mail',
  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: "Background Jobs Tester <tester@test.com>",
      to: `${user.name} < ${user.email} >`,
      subject: "Backgound Jobs Email Test 2",
      html: `<h2>Background Jobs 2</h2>
              <h3>Olá ${user.name}!</h3>
                <p>Seu e-mail chegou com sucesso através de uma fila.</p>`,
    });
  }
}