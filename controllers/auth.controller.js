import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import User from "../models/user.model.js";  
import {generateToken} from "../generateTokenAndSendCookie.js"


export const signIn = async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).send({ message: "Please fill all fields." });
    }

    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(400).send({ message: "Invalid username or password." });
    }

    // const salt = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //     return res.status(400).send({ message: "Invalid username or password." });
    // }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    generateToken(user._id, res);

    res.status(200).send({ message: "Sign in successful", data: user });
};

export const signUp = async (req, res) => {
    const { fullName, userName, password, confirmPassword } = req.body;

    //check empty fields
    if(!fullName || !userName || !password || !confirmPassword){
        res.status(500).send({ message: "Please fill all fields." }); 
        return;
    }
    //check password length
    if (password.length < 6){
        res.status(500).send({ message: "Password must be at least 6 characters long." }); 
        return;
    }

    //check confirm password and password 
    if(confirmPassword !== password){
        res.status(500).send({ message: "Passwords and confirmPassword do not match." }); 
        return;
    }
    //check user exists

    const existingUser = await User.findOne({userName})
    if(existingUser){
        res.status(400).send({ message: "Username already exists." }); 
        return;
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({fullName, userName, password:hashedPassword})


    //check user successfully created
    if(!newUser) {
        res.status(400).send({ message: "Something went wrong" }); 
        return;
    }

    generateToken(newUser._id ,res)


    //send back created user 
    res.status(201).send({message:"User created successfully ", 
    data:newUser})


   
};


export const logOut = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env === 'production',
        maxAge: 0
    });

    res.status(200).send({ message: "Logged out successfully" });
};
