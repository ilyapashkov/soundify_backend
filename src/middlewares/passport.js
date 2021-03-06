import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "@/models/user";
import dotenv from "dotenv";
dotenv.load();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY
};

export default passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        done(null, user);
      } catch (err) {
        done(null, false);
      }
    })
  );
};
