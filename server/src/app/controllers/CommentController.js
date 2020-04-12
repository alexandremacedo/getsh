import * as Yup from 'yup';
import Photo from '../schemas/Photo';
import mongoose from 'mongoose';
import paginate from '../../utils/paginate'

class CommentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { comments } = await Photo.findOne({
      photo_id: req.params.photoId,
    })

    if (comments) {
      const paginatedComments = paginate(comments.reverse(), 2, page)
      return res.json(paginatedComments)
    }

    return res.json({ "Comments": "none" })

  }
  async store(req, res) {
    const schema = Yup.object().shape({
      photo_id: Yup.number().required(),
      content: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { photo_id, content } = req.body;

    const comment_id = mongoose.Types.ObjectId();

    const comment = {
      user_id: req.userId,
      comment_id,
      content,
      created_at: new Date()
    };

    await Photo.findOne(
      { photo_id },
      async function (err, item) {
        if (err) {
          return res.status(401).json({ error: 'Error comment' })
        } else {
          if (item !== null) {
            await item.comments.push({
              user_id: req.userId,
              comment_id,
              content,
              created_at: new Date()
            });
            await item.save().then((result) => {
            }).catch((err) => {
              return res.status(401).json({ error: 'Error comment' })
            });
          }
        }
      }
    );

    return res.json(comment);
  }

  async update(req, res) {
    const { commentId } = req.params

    await Photo.updateOne(
      {},
      { $pull: { 'comments': { comment_id: mongoose.Types.ObjectId(commentId) } } },
      { 'new': true },
      function (err, model) {
        if (err) {
          return res.status(404).json({ "message": "Error on delete comment", "erro": true });;
        }
      }
    );

    return res.status(200).json({ "message": "Deleted comment", "erro": false });
  }

}

export default new CommentController();
