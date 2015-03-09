define(['backbone', 'models/person'], function(Backbone, Person) {

  'use strict';

  return Backbone.Collection.extend({

    model: Person

  });

});
