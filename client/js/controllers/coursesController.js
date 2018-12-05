angular.module('listings').controller('CoursesController', ['$scope', 'Courses', 'Locations','$uibModalInstance',
  function($scope, Courses, Locations, $uibModalInstance) {

    $scope.cancel = function () {
      console.log("Debug: Search Modal Canceled");
      $uibModalInstance.dismiss('home');
    };

    /* Get all the Courses, then bind it to the scope */
    Courses.getAll().then(function(response) {
      console.log("debug");
      $scope.courses = response.data.courses;
      console.log(response.data);
    }, function(error) {
      console.log('Unable to retrieve Courses:', error);
    });
    $scope.number = 5;
    $scope.detailedInfo = undefined;
    // Centered at UF
    $scope.mapLat = 29.651634;
    $scope.mapLong = -82.324829;

    $scope.addListing = function() {
      /**TODO 
      *Save the article using the Courses factory. If the object is successfully 
      saved redirect back to the list page. Otherwise, display the error
      */
      if($scope.entry !== undefined) {
        Courses.create($scope.entry)
        .then(function(res) {
          $scope.Courses.push(res.data);
          $scope.entry = undefined;
        })
        .catch(function(err) {
          console.log(err);
        });
      }
      $scope.entry = undefined;
    };

    $scope.updateListing = function(index) {
      Courses.put($scope.entry)
      .then(function(res){
        $scope.Courses[index] = (res.data);
        $scope.entry = undefined;
      })
      .catch(function(err){
        console.log(err);
      })
    }

    $scope.deleteListing = function(listing) {
	   /**
        Delete the article using the Courses factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
      var index = $scope.Courses.indexOf(listing);
      if (index != -1) {
          Courses.delete($scope.Courses[index]._id);
          $scope.Courses.splice(index, 1);
          $scope.detailedInfo = undefined;
      }
      else{
        throw err;
      }
    };

    $scope.showDetails = function(listing) {
      var index = $scope.Courses.indexOf(listing);
      if (index != -1) {
          $scope.detailedInfo = $scope.Courses[index];
          // Use {{detailedInfo.description}} on index.html once more detail interface is made
      }
      else{
        throw err;
      }
    };

    $scope.findLocation = function(listing){
      var index = $scope.Courses.indexOf(listing);
      var bcode = $scope.Courses[index].building_code;
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
      var index_previous = $scope.Courses.indexOf(listing);

      if(index != -1){
        //TODO: WIP
        $scope.Courses.splice(index_previous, 1); // remove the listing being passed in
        $scope.Courses.splice(0, 1, listing); // put the listing being passed in at the beginning
        $scope.Courses.splice(index_previous);
      }
      else{
        throw err;
      }
    };
  }
]);