
module.exports = function (options) {
    var verifyToken = options && options.verifyToken;
    var enableCookies = options && options.enableCookies;
    var enableCors = !options || options.enableCors == null || options.enableCors;

    if (options && options.monitor) {
      activateMonitoring(options.monitor);
    }

    return function (req, res, next) {
        checkCors({enableCors: enableCors, enableCookies: enableCookies}, req, res, function () {
            return verifyDomain(verifyToken, req, res, next);
        });
    };
};

function activateMonitoring(monitorOptions) {
  if (monitorOptions.enabled == null || monitorOptions.enabled) {
    var loadmillMonitor;

    try {
      loadmillMonitor = require('loadmill-monitor');
    }
    catch (err) {
      console.error("Failed to require optional dependency 'loadmill-monitor' - " +
        "did you remember to add it as a dependency to your package.json file?");
      throw err;
    }

    loadmillMonitor(monitorOptions);
  }
}

function checkCors(corsOptions, req, res, next) {
    if (corsOptions.enableCors) {
        var origin = req.header("Origin");
        var requestMethod = req.header("Access-Control-Request-Method");

        if (origin === "http://www.loadmill.com"
            || origin === "https://www.loadmill.com"
            || origin === "http://app.loadmill.com"
            || origin === "https://app.loadmill.com"
            ) {

            res.header("Access-Control-Allow-Origin", origin);

            if (corsOptions.enableCookies) {
                res.header("Access-Control-Allow-Credentials", 'true');
            }

            if (req.method === 'OPTIONS' && origin && requestMethod) {
                // It's a pre-flight request:
                var requestHeaders = req.header("Access-Control-Request-Headers");
                setPreFlightHeaders(res, requestMethod || "", requestHeaders || "");

                return res.sendStatus(204);
            }
            else {
                var exposedHeaders = req.header("Loadmill-Request-Expose-Headers") || "";
                res.header("Access-Control-Expose-Headers", exposedHeaders);
            }
        }
    }

    return next();
}

function setPreFlightHeaders(res, allowedMethod, allowedHeaders) {
    res.header({
        // This header asks the browser not to pre-flight
        // the same request URL again for the next 24 hours:
        "Access-Control-Max-Age": "86400",
        "Access-Control-Allow-Methods": allowedMethod,
        "Access-Control-Allow-Headers": allowedHeaders
    });
}

function verifyDomain(verifyToken, req, res, next) {
    if (verifyToken && req.url.indexOf("/loadmill-challenge/" + verifyToken + ".txt") === 0) {
        res.send(verifyToken);
    }
    else {
        return next();
    }
}
