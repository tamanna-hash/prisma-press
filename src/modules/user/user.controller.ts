import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import httpStatus, { status } from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
// const registerUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;
//     const user = await userService.registerUserIntoDB(payload);
//     res.status(httpStatus.CREATED).json({
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: "User registered successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//       message: "Failed to register user",
//       error: (error as Error).message,
//     });
//   }
// };

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user registered successfully.",
      data: { user },
    });
  },
);

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUserFromDB();
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to retrieved users",
      error: (error as Error).message,
    });
  }
};

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const {accessToken} = req.cookies;
    // console.log(req.user, "user request");

    // const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)

    // if(typeof verifiedToken === "string"){
    //     throw new Error(verifiedToken);
    // }

    const profile = await userService.getMyProfileFromDB(
      req.user?.id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile fetched successfully",
      data: { profile },
    });
  },
);

const updateMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;

    const payload = req.body;

    const updatedProfile = await userService.updateMyProfileInDB(
      userId,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile updated successfully",
      data: { updatedProfile },
    });
  },
);

export const userController = {
  registerUser,
  getAllUser,
  getMyProfile,
  updateMyProfile
};
