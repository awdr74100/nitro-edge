import { z } from "zod";
import { users, profiles, roles, usersToRoles } from "../../../db/schema";

export default eventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { email, password, sex } = await z
      .object({
        email: z.string().email(),
        password: z.string().min(6).max(12),
        sex: z.number().min(0),
      })
      .parseAsync(body);

    const db = useDB();

    const user = (
      await db.insert(users).values({ email, password }).returning()
    )[0];

    // console.log(user);

    await db.insert(profiles).values({ sex, userId: user.id });

    const role = (
      await db
        .insert(roles)
        .values({ name: "user" })
        .onConflictDoUpdate({ target: roles.name, set: { name: "user" } })
        .returning()
    )[0];

    // console.log(role);

    await db
      .insert(usersToRoles)
      .values({ userId: user.id, roleId: role.id })
      .onConflictDoNothing();

    return { ok: true, user };
  } catch (error) {
    console.log(error);

    return { ok: false, error };
  }
});
