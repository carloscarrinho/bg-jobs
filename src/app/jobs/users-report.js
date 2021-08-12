export default {
  key: 'users-report',
  async handle({ data }) {
    // search users on database, for example
    const users = data;

    console.log(users);
  }
}