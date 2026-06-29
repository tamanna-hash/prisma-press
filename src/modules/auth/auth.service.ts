import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./authInterface";

const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

const isPasswordMatched = await bcrypt.compare(password, user.password)

if(!isPasswordMatched){
    throw new Error ("Credentials Didn't matched") 
}

return user

};

export const authService = {loginUserIntoDB};
