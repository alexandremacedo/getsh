import UserPhoto from '../schemas/UserPhoto';
import paginate from '../../utils/paginate'
class UserPhotoController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const userPhoto = await UserPhoto.find({
      user_id: req.params.userId,
    })

    const photos = paginate(userPhoto[0].user_photos, 15, page)

    return res.json(photos)
  }

}
export default new UserPhotoController();
