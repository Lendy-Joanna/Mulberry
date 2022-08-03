const express = require('express');

const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const MujerController = require('../controllers/MujerController');
const HombreController = require('../controllers/HombreController');

router.get('/welcome', MujerController.welcome);
router.get('/welcomeh', HombreController.welcomeh);

router.get('/accesorios', HombreController.accesoriosView);
router.get('/skincareh', HombreController.skincareView);
router.get('/cabello', HombreController.cabelloView);
router.get('/colonias', HombreController.coloniasView);
router.get('/comp', HombreController.comprarView);

router.get('/manos', MujerController.manosView);
router.get('/sombras', MujerController.sombrasView);
router.get('/serums', MujerController.serumsView);
router.get('/compra', MujerController.comprarView);


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