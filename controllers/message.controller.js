import Message from "../models/message.model.js"

export const sendMessage = async(req,res) => {
    const senderId = req.id
    const {talkingToId: receiverId} = req.params
    const {content} = req.body

    //check empty fields

    if(!senderId || !content || !receiverId) {

        res.status(500).send({message: "Please fill all fields."})
        return
    }

    //send messages
    const newMessage = await Message.create({content ,senderId, receiverId})

    if (!newMessage){
        res.status(400).send({message: "Something went wrong"})
        return
    }

    //send back created message 
    res.status(201).send({message:"Message sent successfully ", 
    data:newMessage})
    


}



// import Message from "../models/message.model.js"

export const getMessages = async (req, res) => {
    const senderId = req.id
    const { talkingToId: receiverId } = req.params

    if (!senderId || !receiverId) {
        res.status(500).send({ message: "Please fill in all fields." })
        return
    }

    try {
        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },  
                { senderId: receiverId, receiverId: senderId }   
            ]
        }).sort({ createdAt: 1 }) 

        
        res.status(200).send({ message: "Messages received successfully", data: messages })
    } catch (error) {

        res.status(500).send({ message: "An error occurred while retrieving messages" })
    }
}
