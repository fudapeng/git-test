
module.exports = {
	initLine:function (_cb, _scope) {
		require.ensure(['test/test'], function (require) {
			var test = require('test/test');

			var user = test.user({
				name: "Bob",
			    age: 44
			})
			console.log( user.getname());
			console.log( user.getage());

			user.setname("Mike");
			console.log( user.getname());
			console.log( user.getage());

			user.setage( 22 );
			console.log( user.getname());
			console.log( user.getage());
            // var echarts = require('echarts/src/echarts');
            // require('../echarts/src/chart/line');
            console.log($('div'))
            document.write(11)
            _cb.call(_scope || null);
        });
	}

}