import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import path from 'path'
import * as fs from 'fs'
import { ObjectId } from "mongodb";

const privateKey = fs.readFileSync(path.resolve('./private.key'), 'utf-8');

export default {
  async login(req, res) {
    try {
      const { userName, password } = req.body
      const user = await global.con
        .db('indiaToday')
        .collection('users')
        .findOne({ userName })

      if (!user) {
        return res.json({ warn: "User not found or wrong password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const payload = { id: user._id, role: user.role };
        let token = await jwt.sign(payload, privateKey, { algorithm: 'RS256' });
        return res.json({ token })
      } else {
        return res.json({ warn: "User not found or wrong password" });
      }
    } catch (er) {
      return new Error(er);
    }
  },
  async addUser(req, res) {
    try {
      const { name, phone, address, userName, email, gender, password } = req.body
      const isAvailable = await global.con
        .db('indiaToday')
        .collection('users')
        .findOne({ userName })

      if (isAvailable) {
        return res.json({ warn: 'Username Already exists' })
      }
      await global.con
        .db('indiaToday')
        .collection('users')
        .insertOne({
          name,
          phone,
          address,
          userName,
          email,
          gender,
          password,
          createdBy: new ObjectId(req.user.id),
          createdAt: new Date().getTime(),
        });

      return res.json({ msg: 'Profile Updated Successfully' })
    } catch (er) {
      return new Error(er)
    }

  },
  async profile(req, res) {
    try {
      const user = await global.con
        .db('indiaToday')
        .collection('users')
        .aggregate([
          { $match: { _id: new ObjectId(req.user.id) } },
          { $project: { password: 0 } }
        ]).toArray()
      return res.json(user[0])
    } catch (er) {
      return new Error(er)
    }
  },

  async updateProfile(req, res) {
    try {
      const { name, phone, address } = req.body
      await global.con
        .db('indiaToday')
        .collection('users')
        .updateOne({ _id: req.user.id },
          {
            $set: {
              name,
              address,
              phone
            }
          })

      return res.json({ msg: 'Profile Updated Successfully' })
    } catch (er) {
      return new Error(er)
    }

  }
}