module.exports = function(app) {

    var invalidEndpointConfig = {
        type :  "text/plain",
        status : "503",
        response : "Service unavailable"
    };

    var module = {};

    function setHeaders(headers,res){
        headers.forEach(function(header){
            res.append(header.key,header.value);
        });
    }

    function setResponseType(format,res){
        res.type(format);
    }

    function setStatus(status,res){
        res.status(status)
    }

    function setResponse(response,res){
        res.send(response);
    }

    function constructEndpoint(api){
        return function(req,res,next){
            setHeaders(api.headers,res);
            setResponseType(api.format,res);
            setStatus(api.status,res);
            setResponse(api.response,res);
            next();
        }
    }

    function isDefined(o) {
        return typeof o !== 'undefined' && o;
    }

    function isValidApi(api) {
        if (!isDefined(api)) return false;
        return isDefined(api.url) && isDefined(api.method) && isDefined(api.status) && isDefined(api.response) &&  isDefined(api.format)
    }

    function invalidEndpoint(req,res,next){
        setResponseType(invalidEndpointConfig.type,res);
        setStatus(invalidEndpointConfig.status,res);
        setResponse(invalidEndpointConfig.response,res);
        next();
    }

    module.createApi = function(apis){
        apis.forEach(function(api){
            var method = api.method.toLowerCase();
            if (!isValidApi(api)){
                app[method](api.url,invalidEndpoint);
            }
            else {
                app[method](api.url,constructEndpoint(api));
            }
        });
    };

    return module;

};