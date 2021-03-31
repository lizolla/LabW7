/**
 * Created by chaika on 09.02.16.
 */
var LIQPAY_PUBLIC_KEY = "i92257273291";
var LIQPAY_PRIVATE_KEY = "ykUyMGVUu19MwNZJrWLXhxEIYZMYbW4mrDciYRg8";

var crypto = require('crypto');
function sha1(string){
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

function base64(str){
    return new Buffer(str).toString('base64');
}

var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);
    var order =	{
        version: 3,
        public_key:	LIQPAY_PUBLIC_KEY,
        action:	"pay",
        amount: order_info.total_price,
        currency: "UAH",
        description: "Опис транзакції",
        order_id: Math.random(),
        //!!!Важливо щоб було 1, бо інакше візьме гроші!!!
        sandbox: 1
    };
    var data = base64(JSON.stringify(order));
    var signature =	sha1(LIQPAY_PRIVATE_KEY	+ data + LIQPAY_PRIVATE_KEY);

    res.send({
        success: true,
        name: order_info.name,
        pizzas: order_info.order.length,
        data: data,
        signature: signature
    });
};