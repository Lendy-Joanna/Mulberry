const express = require('express');

const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const MujerController = require('../controllers/MujerController.js');

router.get('/welcome', MujerController.welcome);
router.get('/welcomeh', MujerController.welcomeh);

router.post('/checkout', async (req, res)=>{
    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source:req.body.stripeToken
    });
    const charge = await stripe.charges.create({
      amount: '472',
      currency: 'usd',
      customer: customer.id,
    });
    console.log(charge.id);
    res.send('éxito');
  });


module.exports = router;