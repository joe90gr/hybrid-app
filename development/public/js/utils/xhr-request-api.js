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
}

function _retrieveResponse() {
    var _arguments = Array.prototype.slice.call(arguments);
    if( this.readyState === 4 && this.status == 200){
        /*DONE*/
        _arguments[0](this, 'success');
    }
}

function _responseError() {
    var _arguments = Array.prototype.slice.call(arguments);
    _arguments[0](this.statusText, 'fail');
}

function isPost(data) {
    return data.type.toLowerCase() === 'post' || data.type.toLowerCase() === 'put' || data.type.toLowerCase() === 'delete';
}

function isFalseOrUndefined(item) {
    return (item === false) ? item : true;
}

function hasQueryParamsAndIsPost(data) {
    return data.params && isPost(data) ? data.params : undefined;
}

function setHeaderParams(xhr, data) {
    for(var val in data){
        if(requestTypes[val]){
            xhr.setRequestHeader(val, data[val]);
        }
    }
}

function isTypeSetReturnElseDefaultToGet(data) {
    return data.type ? data.type.toLowerCase() : 'get' ;
}

function bindXHREvents(xhr, cb) {
    var _retrieveResponseBind = _retrieveResponse.bind(xhr, cb);
    var _responseErrorBind = _responseError.bind(xhr, cb);
    xhr.addEventListener('readystatechange', _retrieveResponseBind, false);
    xhr.addEventListener('error', _responseErrorBind, false);
}

function xhrRequest(url, data, cb) {
    var xhr = new XMLHttpRequest();
    var type = isTypeSetReturnElseDefaultToGet(data);
    var paramsforPost = hasQueryParamsAndIsPost(data);
    var isAsync = isFalseOrUndefined(data.async);
    if(isAsync){
        bindXHREvents(xhr, cb);
    }

    xhr.open(type, url, isAsync);
    setHeaderParams(xhr, data);

    xhr.send(paramsforPost);

    if (xhr.status === 200 && !isAsync) {
        promise.resolve(xhr.responseText, null);
    }
}

function bindPromise(url, data) {
    var _arguments = Array.prototype.slice.call(arguments);
    var xhrRequestBind = xhrRequest.bind(this);
    promise = new Promise();
    if(isFalseOrUndefined(data.async)){
        promise.resolveRecursive(_arguments[0], data, xhrRequestBind);
    }else {
        xhrRequest(url, data);
    }

    return promise;
}

XHRRequestAPI.prototype.post = function(url, data){
    var dataAugment = data || {};
    dataAugment['Content-Type'] = 'application/x-www-form-urlencoded';
    dataAugment.type = 'POST';
    return bindPromise(url, dataAugment);
};

XHRRequestAPI.prototype.get = function(url, data){
    var dataAugment = data || {};
    dataAugment['Accept-Type'] = 'text/html';
    dataAugment['Content-Type'] = 'text/html; charset=utf-8';
    dataAugment.type = 'GET';
    return bindPromise(url, dataAugment);
};

XHRRequestAPI.prototype.put = function(url, data){
    var dataAugment = data || {};
    dataAugment['Content-Type'] = 'application/json';
    dataAugment.type = 'PUT';
    return bindPromise(url, dataAugment);
};

XHRRequestAPI.prototype.delete = function(url, data){
    var dataAugment = data || {};
    dataAugment['Content-Type'] = 'application/json';
    dataAugment.type = 'DELETE'
    return bindPromise(url, dataAugment);
};

module.exports = XHRRequestAPI;