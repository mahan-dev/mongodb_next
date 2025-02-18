import ConnectionDb from "../../../helper/ConnectionDb";
import UserSchema from "../../../models/UserSchema";

const handler = async (req, res) => {
  const get = req.method === "GET";
  const post = req.method === "POST";
  const delete_ = req.method === "DELETE";
  const { name, lastName, email } = req.body;

  try {
    await ConnectionDb(res);
  } catch (error) {
    console.log("error connect to db", error);
    return;
  }
  if (get) {
    try {
      const userData = await UserSchema.find();
      res
        .status(200)
        .json({ status: "Success", message: "data fetched", data: userData });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          status: "Failure",
          message: "has been error for fetching data",
        });
    }
  } else if (post) {
    if (!name || name.length < 4) {
      res
        .status(422)
        .json({ status: "Failure", message: "name len should be > 4" });
      return;
    }

    try {
      const user = await UserSchema.create({ name, lastName, email });
      res
        .status(200)
        .json({
          status: "Success",
          message: "data has been created",
          data: { user },
        });
    } catch (error) {
      console.log("error happened", error);
      res
        .status(500)
        .json({
          status: "Failure",
          message: "error has been occurred for creating data",
          error: { error },
        });
    }
  } else if (delete_) {
    try {
      await UserSchema.collection.drop();
      res
        .status(200)
        .json({ status: "Success", message: "db data has been deleted" });
    } catch (error) {
      console.log("error happened", error);
      res
        .status(500)
        .json({ status: "Failure", message: "db data hasn't been deleted" });
    }
  }
};
export default handler;
