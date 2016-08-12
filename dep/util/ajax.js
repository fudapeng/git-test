/**
 * Created by YU on 2016/2/18.
 */
var Q = require('q');
// var $ = require('jquery');
$.ajaxSetup({cache: false});

module.exports = function(opt){
    return Q.promise(function(resolve, reject, notify){
        $.ajax({
            url: opt.url,
            data: opt.data || {},
            dataType: 'json',
            type: opt.type || 'get',
            success: function (data,textStatus,jqXHR) {
                delete jqXHR.then;
                if(data.errorCode == '600000' || data.errorCode == '600001'){
                    location.href = '/diagnosis/public/html/login/index.html';
                    return;
                }
                resolve.apply(null, arguments);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                delete jqXHR.then;
                reject.apply(null, arguments);
            }
        });
    });
};