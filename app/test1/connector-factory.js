(function () {
  'use strict';

  angular.module('myApp.test1')

  .factory('Connectors', ['$resource', function ($resource) {
    // API url to retrieve connectors
    var connectorsUrl = 'http://localhost:3000/connectors';
    // HTTP operations
    var model = $resource(connectorsUrl + '/:id', {}, {
      update: { method: 'PUT', params: {id: '@id'} }
    });
    return {
      model: model,
      items: model.query()
    };
  }])

  .factory('Fields', ['$resource', function ($resource) {
    var fieldsUrl = 'http://localhost:3000/fields';
    return $resource(fieldsUrl);
  }])

  .factory('CombinedData', ['$q', 'Connectors', 'Fields', function ($q, Connectors, Fields) {
    // This factory provides access to promise value data from both Connectors
    // and Fields combined.
    return {
      allData: function (id) {
        return $q.all([
          Connectors.model.get({id: id}).$promise,
          Fields.query().$promise
        ]);
      }
    };
  }]);

}).call(this);
