import { ObjectId } from "mongodb";

export default {
     async createNews(req, res) {
          try {
               const { title, type, subType } = req.body
               await global.con
                    .db('indiaToday')
                    .collection('newsfeed')
                    .insertOne({
                         title,
                         type,
                         subType,
                         author: new ObjectId(req.user.id),
                         createdAt: new Date().getTime()
                    })
               return res.json({ msg: 'News Feed Added Successfully' })
          } catch (er) {
               return res.json({ err: 'Something went wrong' })
          }
     },
     async updateNews(req, res) {
          try {
               const { title, type, subType } = req.body
               await global.con
                    .db('indiaToday')
                    .collection('newsfeed')
                    .updateOne({ _id: req.user.id },
                         {
                              $set: {
                                   title,
                                   type,
                                   subType,
                                   updatedAt: new Date().getTime()
                              }
                         })

               return res.json({ msg: 'News Updated Successfully' })
          } catch (er) {
               return new Error(er)
          }
     },
     async newsFeed(req, res) {
          try {
               const { subType } = req.body
               const $subType = { $or: subType }
               const news = await global.con
                    .db('indiaToday')
                    .collection('newsfeed')
                    .aggregate([
                         { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
                         { $unwind: '$author' },
                         { $match: $subType },
                         {
                              $project: {
                                   'author._id': 0,
                                   'author.password': 0,
                                   'author.userName': 0,
                                   'author.gender': 0,
                                   'author.email': 0,
                                   'author.phone': 0,
                                   'author.address': 0,
                                   'author.role': 0
                              }
                         },
                         { $sort: { createdAt: -1 } },

                    ]).toArray()
               return res.json(news)

          } catch (er) {
               return res.json({ err: 'Something went wrong' })
          }
     },

     async authors(req, res) {
          try {
               const authors = await global.con
                    .db('indiaToday')
                    .collection('newsfeed')
                    .aggregate([
                         { $group: { _id: '$author' } },
                         { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'author' } },
                         { $unwind: '$author' },
                         {
                              $project: {
                                   'author._id': 0,
                                   'author.password': 0,
                                   'author.userName': 0,
                                   'author.gender': 0,
                                   'author.email': 0,
                                   'author.phone': 0,
                                   'author.address': 0,
                                   'author.role': 0
                              }
                         },
                    ]).toArray()
               return res.json(authors)

          } catch (er) {
               res.json({ err: 'Something went wrong' })
          }

     },
     async newsSubTypes(req, res) {
          try {
               const subTypes = await global.con
                    .db('indiaToday')
                    .collection('newsfeed')
                    .aggregate([
                         { $group: { _id: '$subType' } },
                    ]).toArray()
               return res.json(subTypes)

          } catch (er) {
               res.json({ err: 'Something went wrong' })
          }

     },

}