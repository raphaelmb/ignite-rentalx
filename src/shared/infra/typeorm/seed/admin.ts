import { getConnection } from "typeorm";
import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";
import createConnection from "../index";

create().then(() => console.log("Admin user created."));

async function create() {
  const id = randomUUID();
  const password = await hash("admin", 8);
  const connection = await createConnection("localhost");
  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) VALUES('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'xxx')`
  );
  await connection.close();
}
