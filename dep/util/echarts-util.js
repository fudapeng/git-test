/**
 * Created by admin on 16-3-3.
 */
var config = require('config');
var theme = require('theme');
module.exports = {
    initLine: function(_cb,_scope){
        require.ensure(['../echarts/src/echarts', '../echarts/src/chart/line'], function (require) {
            var echarts = require('../echarts/src/echarts');
            require('../echarts/src/chart/line');
            _cb.call(_scope || null, echarts, theme);
        }, 'echarts-trunk-line');
    },
    initBar: function(_cb,_scope){
        require.ensure(['../echarts/src/echarts', '../echarts/src/chart/bar'], function (require) {
           var echarts = require('../echarts/src/echarts');
           require('../echarts/src/chart/bar');
            _cb.call(_scope || null, echarts, theme);
        }, 'echarts-trunk-bar');
    },
    initPie: function(_cb,_scope){
        require.ensure(['../echarts/src/echarts', '../echarts/src/chart/pie'], function (require) {
            var echarts = require('../echarts/src/echarts');
            require('../echarts/src/chart/pie');
            _cb.call(_scope || null,  echarts, theme);
        }, 'echarts-trunk-pie');
    },
    initK: function(_cb,_scope){
        require.ensure(['../echarts/src/echarts', '../echarts/src/chart/k'], function (require) {
            var echarts = require('../echarts/src/echarts');
            require('../echarts/src/chart/k');
            _cb.call(_scope || null,  echarts, theme);
        }, 'echarts-trunk-k');
    },
    initRadar: function(_cb,_scope){
        require.ensure(['../echarts/src/echarts', '../echarts/src/chart/radar'], function (require) {
            var echarts = require('../echarts/src/echarts');
            require('../echarts/src/chart/radar');
            _cb.call(_scope || null,  echarts, theme);
        }, 'echarts-trunk-radar');
    },
    initGauge: function(_cb,_scope){
        require.ensure(['../echarts/src/echarts', '../echarts/src/chart/gauge'], function (require) {
            var echarts = require('../echarts/src/echarts');
            require('../echarts/src/chart/gauge');
            _cb.call(_scope || null,  echarts, theme);
        }, 'echarts-trunk-gauge');
    },
    initFunnel: function(_cb,_scope){
        require.ensure(['../echarts/src/echarts', '../echarts/src/chart/funnel'], function (require) {
            var echarts = require('../echarts/src/echarts');
            require('../echarts/src/chart/funnel');
            _cb.call(_scope || null,  echarts, theme);
        }, 'echarts-trunk-funnel');
    },
    initScatter: function(_cb,_scope){
        require.ensure(['../echarts/src/echarts', '../echarts/src/chart/scatter'], function (require) {
            var echarts = require('../echarts/src/echarts');
            require('../echarts/src/chart/scatter');
            _cb.call(_scope || null,  echarts, theme);
        }, 'echarts-trunk-scatter');
    },
    initLineBar:function(_cb,_scope){
        require.ensure(['../echarts/src/echarts', '../echarts/src/chart/line','../echarts/src/chart/bar'], function (require) {
            var echarts = require('../echarts/src/echarts');
            require('../echarts/src/chart/line');
            require('../echarts/src/chart/bar');
            _cb.call(_scope || null,  echarts, theme);
        }, 'echarts-trunk-line-bar');
    },
    initMix:function(_cb,_scope){
        require.ensure(['../echarts/src/echarts', '../echarts/src/chart/line',
            '../echarts/src/chart/bar','../echarts/src/chart/pie',
            '../echarts/src/chart/k', '../echarts/src/chart/radar',
            '../echarts/src/chart/gauge', '../echarts/src/chart/funnel'],
            function (require) {
            var echarts = require('../echarts/src/echarts');
            require('../echarts/src/chart/line');
            require('../echarts/src/chart/bar');
            require('../echarts/src/chart/pie');
            require('../echarts/src/chart/k');
            require('../echarts/src/chart/radar');
            require('../echarts/src/chart/gauge');
            require('../echarts/src/chart/funnel');
            _cb.call(_scope || null, echarts, theme);
        }, 'echarts-trunk-mix');
    }
};