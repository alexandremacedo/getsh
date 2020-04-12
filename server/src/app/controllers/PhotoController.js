import * as Yup from 'yup';
import Photo from '../schemas/Photo';
import UserPhoto from '../schemas/UserPhoto';

class PhotoController {
  async index(req, res) {
    const { page = 1 } = req.query;

  }

  async store(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
      photo_id: Yup.number().required(),
      city: Yup.string().required(),
      country: Yup.string().required(),
      district: Yup.string().required(),
      state: Yup.string().required(),
      description: Yup.string().required(),
      lat_long: Yup.string().required(),
      materials: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { user_id, photo_id, city, country, district, state, description, lat_long, materials } = req.body;

    const photo = await Photo.create({
      user_id,
      photo_id,
      city,
      country,
      district,
      state,
      description,
      lat_long,
      materials,
    });

    await UserPhoto.findOne(
      { user_id },
      async function (err, item) {
        if (err) {
          console.log('Sem')
        } else {
          if (item !== null) {
            item.user_photos.push({ photo });
            item.save().then((result) => {
            }).catch((err) => {
              return res.status(401).json({ error: 'Error userphoto' })
            });
          } else {
            await UserPhoto.create(
              { user_id, user_photos: [{ photo }] },
              function (err, person) {
                if (err) return handleError(err);
              });
          }
        }
      }
    );

    return res.json(photo);
  }

}

export default new PhotoController();
