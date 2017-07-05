
module.exports = function (options) {
    var token = options && options.verifyToken;
    var enableCookies = options && options.enableCookies;
    var enableCors = !options || options.enableCors == null || options.enableCors;

    return function (req, res, next) {
        checkCors({enableCors: enableCors, enableCookies: enableCookies}, req, res, function () {
            return verifyDomain(token, req, res, next);
        });
    };
};

function checkCors(corsOptions, req, res, next) {
    if (corsOptions.enableCors) {
        var origin = req.header("Origin");
        var requestMethod = req.header("Access-Control-Request-Method");

        if (origin === "http://www.loadmill.com"
            || origin === "https://www.loadmill.com") {

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

function verifyDomain(token, req, res, next) {
    if (token && req.url.indexOf("/loadmill-challenge/" + token + ".txt") === 0) {
        res.send(token);
    }
    else {
        return next();
    }
}
