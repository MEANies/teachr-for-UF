angular.module('register', [''])
    .controller('RegisterController', ['$scope', '$http',

    function ($scope, $http) {

        $scope.formError = false;
        $scope.inputError = false;
        $scope.newUsername = "";
        $scope.newPassword = "";
        $scope.role = "";
        $scope.email = "";

        $scope.register = function () {

            $scope.formError = false;
            $scope.inputError = false;

            if ($scope.username === undefined || $scope.password === undefined || $scope.email === undefined || $scope.role === undefined ||
                $scope.username == "" || $scope.password == "" || $scope.email == "" || $scope.role == '') {
                $scope.formError = true;
                return;
            }

            $http.post('/api/auth/create', { username: $scope.username, password: $scope.password, email: $scope.email, role: $scope.role })
                .then(function (response) {
                    console.log(response.data);
                    window.location.href = "/login.html";
                },
                    function (response) {
                        if (response.status !== 200) {
                            console.log(response.status);
                            $scope.inputError = true;
                        }
                    });

        };

    }

]);