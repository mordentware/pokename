define([
	'jquery',
	'./base',
	'config'
], function ($, BaseModel, config) {

	var Pokemon = BaseModel.extend({

		defaults: function () {
			return {
				uri: null,
				fullName: null,
				pokedexName: null
			};
		},

		getFullName: function () {
			var deferred = $.Deferred();
			var self = this;
			setTimeout(function () {
				if (self.has('fullName')) {
					deferred.resolve(self.get('fullName'));
				}
				else {
					if (self.has('uri')) {
						// request full name
						if (!config.mockData) {
							$.ajax({
								url: config.pokemonApi.root + self.get('uri')
							}).then(function (response) {
								if (response.name != null) {
									self.set('fullName', response.name);
									deferred.resolve(self.get('fullName'));
								}
							}, function (response) {
								// error
								deferred.reject('Unable to retrieve information from server.');
							});
						}
						else {
							// mock data
							var pokedexName = self.get('pokedexName');
							self.set('fullName', pokedexName.charAt(0).toUpperCase() + pokedexName.slice(1));
							deferred.resolve(self.get('fullName'));
						}
					}
					else {
						deferred.reject('No URI available for Pokemon.');
					}
				}
			}, 0);
			return deferred.promise();
		}

	});

	return Pokemon;

});
