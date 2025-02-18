import mongooseHandler2 from "../utils/utility_2";

const ConnectionDb = async (res) => {
  try {
    await mongooseHandler2();
  } catch (error) {
    console.log("error for connecting to db");

    res.status(500).json({ status: "failure", message: "error connect to db", error });
  }
};

export default ConnectionDb;
