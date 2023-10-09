import { z } from "zod";

export default eventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { email, password } = await z
      .object({
        email: z.string().email(),
        password: z.string().min(6).max(12),
      })
      .parseAsync(body);

    const db = useDB();

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
      with: {
        profiles: true,
        usersToRoles: {
          with: {
            // user: true,
            role: true,
          },
        },
      },
    });

    if (!user) throw new Error("user not found");

    if (user.password !== password) throw new Error("password not correct")

    if (typeof globalThis.EdgeRuntime !== "string") {
      console.log(globalThis.EdgeRuntime);

      // dead-code elimination is enabled for the code inside this block
    }

    // console.log(user);

    return { ok: true, user };
  } catch (error) {
    // console.log(error);

    return { ok: false, error: error.message };
  }
});
