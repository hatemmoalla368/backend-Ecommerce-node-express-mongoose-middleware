const express=require('express');
const router = express.Router();
const stripe = require ('stripe');
const Stripe =
stripe('sk_test_51OLA2mAr5IduUJmeJhKbaHhdcUgME2LTNyyi7mGeEGxqVl5XePEYonWp2tz6RXIwEY35LrTNsDWedK0vW8pms46K00siisF8Ot');
router.post('/', async (req, res) => {
let status, error;
const { token, amount } = req.body;
try {
await Stripe.charges.create({
source: token.id,
amount,
currency: 'usd',
});
status = 'success';
} catch (error) {
    console.log(error);
status = 'Failure';
}
res.json({ error, status });
});
module.exports = router;