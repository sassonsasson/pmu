var app = angular.module('marsList', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
  url: '/home',
  templateUrl: '/index.html',
  controller: 'MainCtrl'
})
  .state('admin', {
    url: '/admin',
    templateUrl: '/templates/admin.html',
    controller: 'MainCtrl'
  });

  $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', function($scope) {

      $scope.email = '';
      $scope.company = '';
      $scope.subject = '';
      $scope.text = '';
      $scope.List = [];

      $scope.SendData = function ($scope,$http) {
          console.log("working senddata")

            var data = /*$.param*/{
                email: $scope.email,
                company: $scope.company,
                subject: $scope.subject,
                text: $scope.text
            };
        
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('/http://localhost:9000/', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
        };

        $scope.adminid = '';
        $scope.adminpass = '';

        $scope.adminLog = function(){
          var id = $scope.adminid
          var pass = $scope.adminpass
          if(id === 'admin' && pass === 'admin'){
            console.log('Success you are addmin')
            
          } else {
            alert('Wrong ID/Password Admin access')
          }
          $scope.adminid = '';
          $scope.adminpass = '';
        }

      $scope.addForm = function(){
        var email = $scope.email;
        var company = $scope.company;
        var subject = $scope.subject;
        var text = $scope.text;
        var list = $scope.List;

        if(email !== '' && company !== '' && text !== '' ){
        list.push(
          {email: email,
           company: company,
           subject: subject,
           text: text
          })
        } 
        console.log(list)
        $scope.email = '';
        $scope.company = '';
        $scope.subject = '';
        $scope.text = '';

      }

      $scope.test = function() {
        console.log('test is working for click');
      }

      $scope.submit = function() {
        console.log('it is working');
        if ($scope.email) {
          $scope.List.push(this.email);
          $scope.email = '';
        }
        console.log($scope.List);
      };

    });
