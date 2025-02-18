
import connectStatus from "../../../helper/connectStatus";
import User from "../../../models/User";
import UserSchema from "../../../models/UserSchema";


const handler = async (req, res) => {
  const { dbList: id } = req.query;
  const { name, lastName,email } = req.body;
  console.log(email);
  const get = req.method === "GET";
  const put = req.method === "PUT";
  const delete_ = req.method === "DELETE";
  try {

    await connectStatus(res);
  } catch(error) {
    console.log("error for connecting db", error)
    res.status(500).json({status: "Failure", message:"cannot connect to db"})
    return ;
  }
  if (get) {
    try {
      const userData = await User.findById(id);
      res.status(200).json({ status: "success", data: userData });
    } catch (error) {
      console.log(error);
      email;
      res.status(500).json({
        status: "failure",
        message: "error happened",
      });
    }
  } 
  else if(put) {
    try {
      const userData = await UserSchema.findById(id)
      userData.name = name;
      userData.lastName = lastName;
      userData.email = email;
      await userData.save()
      res
      .status(200)
      .json({status:"Success", message:"data(patch) has been saved"})
    } catch(error){
      console.log(error)
      res
      .status(500)
      .json({status:"Failure", message:"data(patch) hasn't been saved"})

    }
  }


  else if(delete_) {
    try {
      await UserSchema.findOneAndDelete({_id: id})
     res
     .status(200)
     .json({status: "Success", message: "data deleted successfully"})

    } catch(error) {
      console.log(error)
      res
        .status(500)
        .json({ status: "failure", message: "deleting data has issue " });
    }
  }
 
};
export default handler;
