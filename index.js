var stripe = require('stripe')('sk_test_LCghkIUXKgQ4nPuFDE5SaHJC');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var router = express.Router();
router.get('/', function (req, res, next) {
	res.status(200).send("Hi, It works!")
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

router.post('/processpay', function (request, response) {
    var stripetoken = request.body.stripetoken;
    var amountpayable = request.body.amount;
    var charge = stripe.charge.create({
        amount: amountpayable,
        currency: 'usd',
        description: 'Sample transaction',
        source: stripetoken
    }, function (err, charge) {
        if (err)
            console.log(err);
        else
            response.send({ success: true });
    })
})

app.use(router);
app.listen(process.env.PORT || 5000, function () {
    console.log('Server started');
})