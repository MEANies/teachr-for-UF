angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
      console.log(response.data);
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });
    $scope.number = 5;
    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
      /**TODO 
      *Save the article using the Listings factory. If the object is successfully 
      saved redirect back to the list page. Otherwise, display the error
      */
      if($scope.entry !== undefined) {
        Listings.create($scope.entry)
        .then(function(res) {
          $scope.listings.push(res.data);
          $scope.entry = undefined;
        })
        .catch(function(err) {
          console.log(err);
        });
      }
      $scope.entry = undefined;
    };

    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
      Listings.delete($scope.listings[index]._id);
      $scope.listings.splice(index,1);
      $scope.detailedInfo = undefined;
    };

    $scope.showDetails = function(index) {
      angular.element('#moreInfo').collapse("show");
      $scope.detailedInfo = $scope.listings[index];
    };

// TODO
    $scope.starListing = function(index) {
      angular.element('#moreInfo').collapse("show");
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);