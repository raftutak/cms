import { Auth } from "../middleware/auth.js";
import {
  sendInvitation,
  verifyInvitationToken,
} from "../controllers/invitationController.js";

export const invitationRoutes = (app) => {
  app.post(
    "/api/invitation/send",
    [Auth.verifyToken, Auth.isAdmin, Auth.verifyEmailExists],
    sendInvitation
  );

  app.post("/api/invitation/verifyToken", verifyInvitationToken);
};
