import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const port = config.port
const main = async () => {
  try {
    await prisma.$connect();
    console.log("prisma database connected");
    app.listen(port, () => {
      console.log(`prisma press is listening on port ${port}`);
    });
  } catch (error) {
    console.log("error happening on server", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
main();
