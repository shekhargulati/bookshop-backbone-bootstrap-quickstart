// app.js

(function($){

	var Bookshop = {};
	window.Bookshop = Bookshop;

	Bookshop.Router = Backbone.Router.extend({
		initialize : function(options){
			console.log('In initialize()....');
			this.el = options.el;
		},
		routes : {
			"" : "index",
		},
		index : function(){
			console.log('in index()....');
			this.el.empty();
		}
	});

	var router = new Bookshop.Router({el : $($('#main'))});
	Backbone.history.start();
	
})(jQuery);