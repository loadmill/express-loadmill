
module.exports = function (options) {
    var enableCors = !options || options.enableCors == null || options.enableCors;
    var token = options && options.verifyToken;

    return function (req, res, next) {
        checkCors(enableCors, req, res, function () {
            return verifyDomain(token, req, res, next);
        });
    };
};

function checkCors(enableCors, req, res, next) {
    if (enableCors) {
        var origin = req.header("Origin");
        var requestMethod = req.header("Access-Control-Request-Method");

        if (origin === "http://www.loadmill.com"
            || origin === "https://www.loadmill.com") {

            res.header("Access-Control-Allow-Origin", origin);

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
    if (token && req.url === "/loadmill-challenge/" + token + ".txt") {
        res.send(token);
    }
    else {
        return next();
    }
}
