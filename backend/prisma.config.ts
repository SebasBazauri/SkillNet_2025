import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: "file:./prisma/skillnet.db",
    // Si en algún momento necesitas shadowDatabaseUrl, puedes agregarlo:
    // shadowDatabaseUrl: "file:./prisma/skillnet_shadow.db"
  },
});
