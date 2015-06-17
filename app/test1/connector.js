'use strict';

angular.module('myApp.test1', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/test1', {
    templateUrl: 'test1/connector.html',
    controller: 'ConnectorCtrl'
  });
}])

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
}])

.controller('ConnectorCtrl', ['$scope', 'Connectors', 'CombinedData', function ($scope, Connectors, CombinedData) {
  // Populate 'List of Connectors' from DB
  $scope.connectors = Connectors.items;
  // Load Configurations from the selected connector
  $scope.loadConfigs = function (connector) {
    // Set selectedConnector value to the selected connector
    $scope.selectedConnector = connector;
    // Pull in promise values containing combined data for
    // the selected connector and fields
    CombinedData.allData(connector.id).then(function (data) {
      $scope.fields = _.map(data[1], function (fieldData) {
        return fieldData;
      });
      $scope.configurations = data[0].configurations;
    });
  };
  // Submit/Save changes to connector configuration to the DB
  $scope.submit = function (configurations) {
    // only populate id for each configuration.mappingField
    _.forEach(configurations, function (configuration){
      configuration.mappingField = configuration.mappingField.id;
    });
    var connectorToUpdate = $scope.selectedConnector;
    connectorToUpdate.configurations = configurations;
    // Save updated connector to DB
    connectorToUpdate.$update({id: connectorToUpdate.id});
  };
}]);
