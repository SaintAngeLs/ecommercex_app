"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handler;
exports.config = void 0;

var _mongoose = require("@/lib/mongoose");

var _Order = require("@/models/Order");

var _micro = require("micro");

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var endpointSecret = "whsec_daf727a4afe27afb257b4e213aeaa7fc32547dbcfafaa88ba62b0f62d2070c39";

function handler(req, res) {
  var sig, event, data, orderId, paid;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _mongoose.mongooseConnect)());

        case 2:
          sig = req.headers['stripe-signature'];
          _context.prev = 3;
          _context.t0 = stripe.webhooks;
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _micro.buffer)(req));

        case 7:
          _context.t1 = _context.sent;
          _context.t2 = sig;
          _context.t3 = endpointSecret;
          event = _context.t0.constructEvent.call(_context.t0, _context.t1, _context.t2, _context.t3);
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t4 = _context["catch"](3);
          res.status(400).send("Webhook Error: ".concat(_context.t4.message));
          return _context.abrupt("return");

        case 17:
          _context.t5 = event.type;
          _context.next = _context.t5 === 'checkout.session.completed' ? 20 : 27;
          break;

        case 20:
          data = event.data.object;
          orderId = data.metadata.orderId;
          paid = data.payment_status === 'paid';

          if (!(orderId && paid)) {
            _context.next = 26;
            break;
          }

          _context.next = 26;
          return regeneratorRuntime.awrap(_Order.Order.findByIdAndUpdate(orderId, {
            paid: true
          }));

        case 26:
          return _context.abrupt("break", 27);

        case 27:
          res.status(200).send('ok');

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 13]]);
}

var config = {
  api: {
    bodyParse: false
  }
}; // key:
// cohere-quiet-safely-pardon

exports.config = config;