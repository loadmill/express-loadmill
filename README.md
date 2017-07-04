# Express Loadmill
Users of [Loadmill](https://www.loadmill.com) can use this express middleware for: 
1. Quick and easy [domain verification](https://docs.loadmill.com/domain-verification.html).
2. Enabling CORS **strictly** from [loadmill.com](https://www.loadmill.com) in order to perform [crowdsourced load tests](https://docs.loadmill.com/testing-with-cors.html).

## Installation
Using npm:

`npm install express-loadmill --save`

Using yarn:

`yarn add express-loadmill`

## Usage
Use loadmill middleware before everything else (that should be exposed to testing):
```js
var app = require('express')();
var Loadmill = require('express-loadmill');

app.use(Loadmill({verifyToken: process.env.LOADMILL_VERIFY_TOKEN}));
```

The above code enables both CORS and domain verification. You may optionally disable CORS by setting the `enableCors` option to false, e.g.
```js
app.use(Loadmill({enableCors: false, verifyToken: process.env.LOADMILL_VERIFY_TOKEN}));
```
Note however that you will not be able to perform **high-volume load tests** with loadmill without enabling CORS.

Domain verification will only be enabled if you supply a verification token, thus the following code will only enable CORS:
```js
app.use(Loadmill());
```

## Learn More
- About [Loadmill](https://www.loadmill.com)
- About [domain verification](https://docs.loadmill.com/domain-verification.html)
- About [testing with CORS](https://docs.loadmill.com/testing-with-cors.html)
