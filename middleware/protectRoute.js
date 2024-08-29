import jwt from 'jsonwebtoken'

export const protectRoute = (request, response, next) => {
	const token = request.cookies.jwt
	
	if (!token) return response.status(500).send({message: "No token provided. Authorization failed"})

	const {id} = jwt.verify(token, process.env.JWT_SECRET)
	
	if (!id) return response.status(403).send('Invalid token') 

	request.id = id
	// console.log(id);
	next()
}
