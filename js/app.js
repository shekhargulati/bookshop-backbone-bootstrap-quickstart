// app.js

(function($){

	var Bookshop = {};
	window.Bookshop = Bookshop;

	var template = function(name) {
    	return Mustache.compile($('#'+name+'-template').html());
  	};

  	Bookshop.Book = Backbone.Model.extend({

  	});
  	
  	Bookshop.Books = Backbone.Collection.extend({
  		localStorage : new Store('books')
  	});

	Bookshop.Index = Backbone.View.extend({
		template : template('index'),
		
		initialize : function(){
			this.books = new Bookshop.Books();
			this.books.on('all',this.render,this);
			this.books.fetch();
		},
		
		render : function(){
			this.$el.html(this.template(this));
			this.books.each(this.renderBook,this);
			var form = new Bookshop.Index.Form({collection : this.books});
			this.$el.append(form.render().el);
			return this;
		},

		count : function(){
			return this.books.length;
		},
	
		renderBook : function(book){
			var bookView = new Bookshop.Index.BookView({model : book});
			this.$('.books').append(bookView.render().el);
		}

	});

	Bookshop.Index.BookView = Backbone.View.extend({
		template : template('book'),
		render : function(){
			this.$el.html(this.template(this));
			return this;
		},

		events : {
			'click button' : 'delete'
		},

		delete : function(){
			this.model.destroy();
		},

		title : function(){
			return this.model.get('title');
		},
		author : function(){
			return this.model.get('author');
		},
		releaseDate : function(){
			return this.model.get('releaseDate');
		},
		categories : function(){
			return this.model.get('categories');
		}

	});

	Bookshop.Index.Form = Backbone.View.extend({
		tagName : 'form',
		template : template('form'),
		events : {
			'submit' :'addBook'
		},
		render : function(){
			this.$el.html(this.template(this));
			return this;
		},
		addBook : function(event){
			event.preventDefault();
			this.collection.create({
				title : this.$('#title').val(),
				author : this.$('#author').val(),
				releaseDate : this.$('#releaseDate').val(),
				categories : this.$('#categories').val()
			});

			console.log('title is ... ',this.$('#title').val())
			this.render();
		}

	});

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
			var indexView = new Bookshop.Index();			
			this.el.empty();
			this.el.append(indexView.render().el);
		}
	});

	var router = new Bookshop.Router({el : $($('#main'))});
	Backbone.history.start();
	
})(jQuery);