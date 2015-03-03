/**
 * Created by merten on 30.10.14.
 *  Module -> Configs -> Routes -> (View (Directives) || SCOPE || Controller (Factory))
 */
var antonModule = angular.module('anton', []);

/**
 * The Controller for Schlag.
 * @param $scope
 * @param schlagFactory
 */
function schlagController($scope, schlagFactory) {

    $scope.schlagArray = [];
    $scope.neuerSchlag = null;

    /**
     * Get the values for SchlagArray from database.
     */
    schlagFactory.getDatabase(successFkt, failureFkt);

    function successFkt(data) {
        $scope.schlagArray = data;
        console.log(data);
    };

    function failureFkt (data) {
        console.log('Error' + data);
    };

    /**
     * Add a new Schlag to array.
     */
    $scope.addSchlag = function () {
        $scope.schlagArray.push({id: $scope.schlagArray.length + 1, name: $scope.neuerSchlag.name});
        $scope.neuerSchlag.name = null;

    }

}


/**
 * The factory which delivers SchlagArray.
 * @param $http
 * @returns {{getDatabase: getDatabase}}
 */
function schlagFactory($http) {

    return {

        getDatabase: function (onSuccess, onFailure) {

            var database = {};

            $http.get('http://localhost:8182/json/').
                success(onSuccess).
                error(onFailure);
        }
    }
}

// Create the controller and factory.
antonModule.controller('SchlagCtrl', schlagController);
antonModule.factory('schlagFactory', schlagFactory);