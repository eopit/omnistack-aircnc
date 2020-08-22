const Spot = require('../model/Spot');
const User = require('../model/User');

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json({ spots });
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      console.log(user);
      console.log('caiu aqui');
      return res.status(404).json({
        error: 'User not found.',
      });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(',').map((tech) => tech.trim()),
      price,
    });

    return res.status(201).json({
      spot,
    });
  },
};
