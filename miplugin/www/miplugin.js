var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'miplugin', 'coolMethod', [arg0]);
};

exports.calculator = function (arg0, arg1, success, error) {
    exec(success, error, 'miplugin', 'calculator', [arg0, arg1]);
};
