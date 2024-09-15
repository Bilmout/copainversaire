import express from 'express';
import Amis, { MonAmi } from '../models/amis';
import moment from 'moment';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const friends = await Amis.find().sort('birthdate');
    const today = moment();
    const friendsWithDays = friends.map(friend => {
      const nextBirthday = moment(friend.birthdate).year(today.year());
      if (nextBirthday.isBefore(today)) {
        nextBirthday.add(1, 'year');
      }
      const daysUntilBirthday = nextBirthday.diff(today, 'days');
      return {
        ...friend.toObject(),
        daysUntilBirthday
      };
    });
    res.render('index', { friends: friendsWithDays });
  } catch (error) {
    console.error('Erreur lors de la récupération des amis:', error);
    res.status(500).send('Erreur serveur');
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name, birthdate } = req.body;
    const newFriend = new Amis({ name, birthdate });
    await newFriend.save();
    res.redirect('/');
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un ami:', error);
    res.status(400).send('Erreur lors de l\'ajout d\'un ami');
  }
});

export default router;