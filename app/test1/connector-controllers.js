(function () {
  'use strict';

  angular.module('myApp.test1')

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

}).call(this);
