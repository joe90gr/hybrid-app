var Promise = require('../../js/utils/promise');
var promise;
var requestTypes = {
    'Accept': true,
    'Accept-Charset': true,
    'Accept-Type': true,
    'Accept-Encoding': true,
    'Accept-Language': true,
    'Accept-Datetime': true,
    'Authorization': true,
    'Cache-Control': true,
    'Connection': true,
    'Cookie': true,
    'Content-Length': true,
    'Content-MD5': true,
    'Content-Type': true,
    'Content-length': true,
    'Date': true,
    'Expect': true,
    'From': true,
    'Host':true,
    'Origin': true,
    'Referer': true,
    'Transfer-Encoding': true
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

function isGET(data) {
    return data.method.toLowerCase() === 'get';
}

function isFalseOrUndefined(item) {
    return (item === false) ? item : true;
}

function hasQueryParamsAndIsNotGet(data) {
    return data.params && !isGET(data) ? data.params : undefined;
}

function setHeaderParams(xhr, data) {
    for(var val in data){
        if(requestTypes[val]){
            xhr.setRequestHeader(val, data[val]);
        }
    }
}

function isMethodSetReturnElseDefaultToGet(data) {
    return data.method ? data.method.toLowerCase() : 'get' ;
}

function bindXHREvents(xhr, cb) {
    var retrieveResponseBind = retrieveResponse.bind(xhr, cb);
    var responseErrorBind = responseError.bind(xhr, cb);
    xhr.addEventListener('readystatechange', retrieveResponseBind, false);
    xhr.addEventListener('error', responseErrorBind, false);
}

function xhrRequest(url, data, cb) {
    var xhr = new XMLHttpRequest();
    var error;
    var method = isMethodSetReturnElseDefaultToGet(data);
    var paramsforPost = hasQueryParamsAndIsNotGet(data);
    var isAsync = isFalseOrUndefined(data.async);
    if(isAsync){
        bindXHREvents(xhr, cb);
    }

    xhr.open(method, url, isAsync);
    setHeaderParams(xhr, data);

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

function bindPromise(url, data) {
    var _arguments = Array.prototype.slice.call(arguments);
    var isAsync = isFalseOrUndefined(data.async);
    promise = new Promise();
    if(isAsync){
        promise.resolveRecursive(_arguments[0], data, xhrRequest);
    }else {
        xhrRequest(url, data);
    }

    return promise;
}

function constructRequest(method, url, data) {
    var dataAugment = data || {};

    switch(method){
        case 'GET':
            dataAugment['Accept-Type'] =  dataAugment['Accept-Type'] || 'text/html';
            dataAugment['Content-Type'] = dataAugment['Content-Type'] || 'text/html; charset=utf-8';
            dataAugment.method = 'GET';
            break;
        case 'POST':
            dataAugment['Content-Type'] = dataAugment['Content-Type'] || 'application/x-www-form-urlencoded';
            dataAugment.method = 'POST';
            break;
        case 'PUT':
            dataAugment['Content-Type'] =  dataAugment['Content-Type'] || 'application/x-www-form-urlencoded';
            dataAugment.method = 'PUT';
            break;
        case 'DELETE':
            dataAugment['Content-Type'] =  dataAugment['Content-Type'] || 'application/x-www-form-urlencoded';
            dataAugment.method = 'DELETE';
            break;
        default:
            dataAugment['Accept-Type'] =  dataAugment['Accept-Type'] || 'text/html';
            dataAugment['Content-Type'] = dataAugment['Content-Type'] || 'text/html; charset=utf-8';
            dataAugment.method = 'GET';
    }
    return bindPromise(url, dataAugment);
}

XHRRequestAPI.prototype.post = function(url, data){
    return constructRequest('POST', url, data);
};

XHRRequestAPI.prototype.get = function(url, data){
    return constructRequest('GET', url, data);
};

XHRRequestAPI.prototype.put = function(url, data){
    return constructRequest('PUT', url, data);
};

XHRRequestAPI.prototype.del = function(url, data){
    return constructRequest('DELETE', url, data);
};

module.exports = XHRRequestAPI;