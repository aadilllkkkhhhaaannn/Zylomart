const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AXc3xhF9JEm4F3Jy_W5ZwHbeIfFwrrT1LIHN99OO9mYvt1-X2AZA7-iS_iOxRZflEKOONj-k7lC3BVa0",
  client_secret:
    "EOXDf_fF6N66Zfx9V-9DQF7I0BfkUAe3CmgvxRWX6Kn5rr2jcoVtKqYtLBD96WGfFlS4NmJlxaHQKSRz",
});

module.exports = paypal;
