import jwt from 'jsonwebtoken'

export const generateToken = (id, res) => {
const token = jwt.sign({ id}, process.env.JWT_SECRET, {expiresIn: "15d"})
res.cookie("jwt",token, {maxAge: 1296000000})
}
