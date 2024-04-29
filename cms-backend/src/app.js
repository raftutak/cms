import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { sequelize } from "./config/database.js";
import { testRoutes } from "./routes/test.routes.js";
import { invitationRoutes } from "./routes/invitation.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { siteRoutes } from "./routes/site.routes.js";
import { passwordRoutes } from "./routes/password.routes.js";
import { pageRoutes } from "./routes/page.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { categoriesRoutes } from "./routes/category.routes.js";
import { postRoutes } from "./routes/post.routes.js";
import { searchRoutes } from "./routes/search.routes.js";

import { associateModels } from "./config/associateModels.js";

const port = process.env.PORT || 5001;
const corsOptions = {
  origin: "*",
};

const app = express();

const privateKey = fs.readFileSync("src/certs/localhost-key.pem", "utf8");
const certificate = fs.readFileSync("src/certs/localhost.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${port}` });
});

testRoutes(app);
siteRoutes(app);
invitationRoutes(app);
authRoutes(app);
passwordRoutes(app);
pageRoutes(app);
userRoutes(app);
categoriesRoutes(app);
postRoutes(app);
searchRoutes(app);

associateModels();

const listen = () => {
  httpsServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

sequelize.sync().then(listen);
