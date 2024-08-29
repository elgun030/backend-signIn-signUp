import User from "../models/user.model.js"

export const getAllUsers =  async (req,res) => {
    const id = req.id
const allUsers = await User.find({ _id:{$ne: id}})

res.status(200).send({data:allUsers})
}
