

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import db from "./../modules/db.module"
import dotenv from "dotenv";

import { createUser } from '../services/user.service';

dotenv.config();


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userData } = req.body;
    const { username, email, password } = userData

    // Check if the user already exists
    const existingUser: User | null = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const hashedPassword: string = await bcrypt.hash(password, 10);


    // Creating a new user
    let user = await createUser({
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: username,
      password: hashedPassword,
      email: email
    })

    if(!user){
      res.status(301).json({ message: 'Failed to create user' });
      return;
    }

  
    // const newUser: User = await db.user.create({
    //   data: {
    //     username,
    //     email,
    //     password: hashedPassword,
  
    // });

    res.status(201).json({ message: 'User registered successfully' });



  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user: User | null = await db.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Validate the password
    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate a JWT
    const token: string = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
