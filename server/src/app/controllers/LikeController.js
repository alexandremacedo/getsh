import * as Yup from 'yup';
import Photo from '../schemas/Photo';
import mongoose from 'mongoose';

class LikeController {
  async index(req, res) {
    const { photoId } = req.params

    const { likes } = await Photo.findOne(
      { photo_id: photoId },
    );

    return res.status(200).json(likes)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      photo_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { photo_id } = req.body;
    const userId = req.userId;

    const like_id = mongoose.Types.ObjectId();

    Photo.findOne({ 'likes': { $elemMatch: { user_id: userId } } }, async function (err, like) {
      if (err) {
        return res.status(401).json({ error: 'Error like' });
      }

      if (like) {
        await Photo.updateOne(
          {},
          { $pull: { 'likes': { user_id: userId } } }, { 'new': true }, function (err, model) {
            if (err) {
              return res.status(404).json({ "message": "Dislike", "erro": true });;
            }
          }
        );
        return res.status(200).json({ "like": false });

      } else {
        await Photo.findOne(
          { photo_id },
          async function (err, item) {
            if (err) {
              return res.status(401).json({ error: 'Error like' })
            } else {
              await item.likes.push({
                user_id: userId,
                like_id,
                created_at: new Date()
              });
              await item.save().then((result) => {
              }).catch((err) => {
                return res.status(401).json({ error: 'Error like' })
              });
            }
          }
        );
      }
      return res.status(200).json({ "like": true });

    })

  }

}

export default new LikeController();
