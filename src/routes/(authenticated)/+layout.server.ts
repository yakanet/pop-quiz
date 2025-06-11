export async function load({ locals }) {
  const user = locals.user;
  return {
    user,
  };
}
