import { NextFunction, Request, Response, Router } from "express";
import ROUTES from "./ROUTES";
import mongoose from "mongoose";
import { User } from "../models/user";

const apiRouter = Router();

apiRouter.post(
  ROUTES.api.add,
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, phoneNumber } = req.body;
    let user = new User({
      name,
      email,
      phoneNumber,
    });
    try {
      await user.save();
      res.status(200).json({ message: "User added successfully!", user: user });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Something went wrong, Please try again later!" });
    }
  }
);

apiRouter.patch(
  ROUTES.api.update,
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, phoneNumber, userId } = req.body;
    try {
      const count = (await User.findById(userId)).count;
      await User.updateOne(
        { _id: userId },
        {
          $set: {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            count: count + 1,
          },
        }
      );
      const user = await User.findById(userId);
      res
        .status(200)
        .json({ message: "User updated successfully!", data: user });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Something went wrong, Please try again later!" });
    }
  }
);

apiRouter.get(
  ROUTES.api.count,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const add = await User.find({});
      let updatedCount = 0;
      add.map((user) => {
        updatedCount += user.count;
      });
      const count = add.length;
      res.status(200).json({
        message: "User updated successfully!",
        count: {
          addedCount: count,
          updatedCount: updatedCount,
        },
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Something went wrong, Please try again later!" });
    }
  }
);

apiRouter.get(
  ROUTES.api.getUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query._id;
    try {
      const data = await User.findById(id);
      res.status(200).json({
        data: data,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Something went wrong, Please try again later!" });
    }
  }
);

export default apiRouter;
