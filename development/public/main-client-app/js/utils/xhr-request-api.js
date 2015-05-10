var Promise = require('public/main-client-app/js/utils/promise');
var promise;
var REQUEST_TYPES = {
    'Accept': 'Accept',
    'Accept-Charset': 'Accept-Charset',
    'Accept-Type': 'Accept-Type',
    'Accept-Encoding': 'Accept-Encoding',
    'Accept-Language': 'Accept-Language',
    'Accept-Datetime': 'Accept-Datetime',
    'Access-Token': 'Access-Token',
    'Authorization': 'Authorization',
    'Cache-Control': 'Cache-Control',
    'Connection': 'Connection',
    'Cookie': 'Cookie',
    'Content-Length': 'Content-Length',
    'Content-MD5': 'Content-MD5',
    'Content-Type': 'Content-Type',
    'Content-length': 'Content-length',
    'Date': 'Date',
    'Expect': 'Expect',
    'From': 'From',
    'Host': 'Host',
    'Origin': 'Origin',
    'Referer': 'Referer',
    'Transfer-Encoding': 'Transfer-Encoding'
};

function XHRRequestAPI() {
    bindPromise = bindPromise.bind(this);
    xhrRequest = xhrRequest.bind(this);
}

function retrieveResponse() {
    var _arguments = Array.prototype.slice.call(arguments);
    if( this.readyState === 4 && this.status == 200){
        /*DONE*/
        _arguments[0](this, 'success');
    }
}

function responseError() {
    var _arguments = Array.prototype.slice.call(arguments);
    _arguments[0](this.statusText, 'fail');
}

function isGET(requestTypes) {
    return requestTypes.method.toLowerCase() === 'get';
}

function isFalseOrUndefined(item) {
    return (item === false) ? item : true;
}

function hasQueryParamsAndIsNotGet(requestTypes) {
    return requestTypes.params && !isGET(requestTypes) ? requestTypes.params : undefined;
}

function setHeaderParams(xhr, requestTypes) {
    var hasRequestType;
    for(var val in requestTypes){
        hasRequestType = REQUEST_TYPES[val];
        if(hasRequestType){
            xhr.setRequestHeader(val, requestTypes[val]);
        }
    }
}

function isMethodSetReturnElseDefaultToGet(requestTypes) {
    return requestTypes.method ? requestTypes.method.toLowerCase() : 'get' ;
}

function bindXHREvents(xhr, callback) {
    var retrieveResponseBind = retrieveResponse.bind(xhr, callback);
    var responseErrorBind = responseError.bind(xhr, callback);
    xhr.addEventListener('readystatechange', retrieveResponseBind, false);
    xhr.addEventListener('error', responseErrorBind, false);
}

function xhrRequest(url, requestTypes, callback) {
    var xhr = new XMLHttpRequest();
    var error;
    var method = isMethodSetReturnElseDefaultToGet(requestTypes);
    var paramsforPost = hasQueryParamsAndIsNotGet(requestTypes);
    var isAsync = isFalseOrUndefined(requestTypes.async);
    if(isAsync){
        bindXHREvents(xhr, callback);
    }

    xhr.open(method, url, isAsync);
    setHeaderParams(xhr, requestTypes);

    try{
        xhr.send(paramsforPost);
    } catch(e){
        error = e;
    }

    if(!isAsync){
        if (xhr.status === 200) {
            promise.resolve(xhr, null);
        } else {
            promise.reject(error, null);
        }
    }
}

function bindPromise(url, requestTypes) {
    var _arguments = Array.prototype.slice.call(arguments);
    var isAsync = isFalseOrUndefined(requestTypes.async);
    promise = new Promise();
    if(isAsync){
        promise.resolveRecursive(_arguments[0], requestTypes, xhrRequest);
    }else {
        xhrRequest(url, requestTypes);
    }

    return promise;
}

function constructRequest(method, url, requestTypes) {
    var assembledRequestTypes = requestTypes || {};

    switch(method){
        case 'GET_JSON':
            assembledRequestTypes['Accept-Type'] =  assembledRequestTypes['Accept-Type'] || 'application/json';
            assembledRequestTypes['Content-Type'] = assembledRequestTypes['Content-Type'] || 'application/json';
            assembledRequestTypes.method = 'GET';
            break;
        case 'POST':
            assembledRequestTypes['Content-Type'] = assembledRequestTypes['Content-Type'] || 'application/x-www-form-urlencoded';
            assembledRequestTypes.method = 'POST';
            break;
        case 'PUT':
            assembledRequestTypes['Content-Type'] =  assembledRequestTypes['Content-Type'] || 'application/x-www-form-urlencoded';
            assembledRequestTypes.method = 'PUT';
            break;
        case 'DELETE':
            assembledRequestTypes['Content-Type'] =  assembledRequestTypes['Content-Type'] || 'application/x-www-form-urlencoded';
            assembledRequestTypes.method = 'DELETE';
            break;
        default:
            assembledRequestTypes['Accept-Type'] =  assembledRequestTypes['Accept-Type'] || 'text/html';
            assembledRequestTypes['Content-Type'] = assembledRequestTypes['Content-Type'] || 'text/html; charset=utf-8';
            assembledRequestTypes.method = 'GET';
    }
    return bindPromise(url, assembledRequestTypes);
}

XHRRequestAPI.prototype.post = function(url, requestTypes){
    return constructRequest('POST', url, requestTypes);
};

XHRRequestAPI.prototype.get = function(url, requestTypes){
    return constructRequest('GET', url, requestTypes);
};

XHRRequestAPI.prototype.put = function(url, requestTypes){
    return constructRequest('PUT', url, requestTypes);
};

XHRRequestAPI.prototype.del = function(url, requestTypes){
    return constructRequest('DELETE', url, requestTypes);
};

XHRRequestAPI.prototype.getJSON = function(url, requestTypes){
    return constructRequest('GET_JSON', url, requestTypes);
};

module.exports = new XHRRequestAPI();