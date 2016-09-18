var app = angular.module('marsList', ['ui.router']);
// console.log('hi from the app')
app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  // console.log('hi from the config')

  $stateProvider
  .state('home', {
  url: '/home',
  templateUrl: '../templates/home.html',
  controller: 'MainCtrl'
})
  .state('admin', {
    url: '/admin',
    templateUrl: '../templates/admin.html',
    controller: 'MainCtrl',
    // resolve: {
    //   userPromise: ['$state', function($state){
    //     if(document.getElementById("adminid").val() === 'admin' && document.getElementById("adminpass").val() === 'admin'){
    //       $state.go('admin');
    //     } else {
    //       alert('No Go');
    //     }
    //   }]
    // }
  });

  $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', function($scope,$http,$state) {
      // console.log('hi from the controller')

      $scope.email = '';
      $scope.company = '';
      $scope.subject = '';
      $scope.text = '';
      $scope.dataBase = [];
      $scope.admin123 = false;
      $scope.tester = 'LOTS OF TEXTS'
      $scope.aSearch = '';

        $scope.adminid = '';
        $scope.adminpass = '';

        $scope.adminLog = function(){
          var id = $scope.adminid
          var pass = $scope.adminpass
          if(id === 'admin' && pass === 'admin'){
            console.log('Success you are addmin')
            $state.go('admin')

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

        if(email !== '' && company !== '' && text !== '' ){
        var obj = {
          email: email,
          company: company,
          subject: subject,
          text: text
        }
        console.log('Got before Post')
        $http.post('/admin', obj);

        console.log('got after post')
        } 
        $scope.email = '';
        $scope.company = '';
        $scope.subject = '';
        $scope.text = '';
        console.log('Finished everything')
      }

      $scope.test = function() {
        console.log('test is working for click');
      }

      $scope.adminLogClick = function() {
        $scope.admin123 = !$scope.admin123
      }

    $scope.searchDB = function() {
      console.log('this is the searchDB button click')

      var success = function(data){
        console.log('this is the data back from the server' + data)
        $scope.dataBase = [];
      
        for(var i = 0; i < data.data.length; i++){
  
          $scope.dataBase.push(data.data[i])

          }
        console.log($scope.dataBase)
      }
      var error = function(){
        console.log('Error with Data')
      }
      $http.get('/admin').then(success,error);

    }

  });

    
