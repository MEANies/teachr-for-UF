angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 'Locations','$uibModalInstance',
  function($scope, Listings, $uibModalInstance) {

    $scope.cancel = function () {
      console.log("Debug: Search Modal Canceled");
      $uibModalInstance.dismiss('cancel');
    };

    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
      console.log(response.data);
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });
    $scope.number = 5;
    $scope.detailedInfo = undefined;
    // Centered at UF
    $scope.mapLat = 29.651634;
    $scope.mapLong = -82.324829;

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

    $scope.updateListing = function(index) {
      Listings.put($scope.entry)
      .then(function(res){
        $scope.listings[index] = (res.data);
        $scope.entry = undefined;
      })
      .catch(function(err){
        console.log(err);
      })
    }

    $scope.deleteListing = function(listing) {
	   /**
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
      var index = $scope.listings.indexOf(listing);
      if (index != -1) {
          Listings.delete($scope.listings[index]._id);
          $scope.listings.splice(index, 1);
          $scope.detailedInfo = undefined;
      }
      else{
        throw err;
      }
    };

    $scope.showDetails = function(listing) {
      var index = $scope.listings.indexOf(listing);
      if (index != -1) {
          $scope.detailedInfo = $scope.listings[index];
          // Use {{detailedInfo.description}} on index.html once more detail interface is made
      }
      else{
        throw err;
      }
    };

    $scope.findLocation = function(listing){
      var index = $scope.listings.indexOf(listing);
      var bcode = $scope.listings[index].building_code;
      if (index != -1 && bcode != "")
      {
          for (var i = 0; i < Locations.data; i++) {
            if(bcode == Locations.data[i].ID){
              $scope.mapLat = Locations.data[i].LAT;
              $scope.mapLong = Locations.data[i].LON;
              console.log(Locations.data[i].LAT);
              console.log(Locations.data[i].LON);
            }
          }
      }
      else{
        throw err;
      }
      
    }

// TODO
    $scope.starListing = function(listing) {
      var index_previous = $scope.listings.indexOf(listing);

      if(index != -1){
        //TODO: WIP
        $scope.listings.splice(index_previous, 1); // remove the listing being passed in
        $scope.listings.splice(0, 1, listing); // put the listing being passed in at the beginning
        $scope.listings.splice(index_previous);
      }
      else{
        throw err;
      }
    };
  }
]);