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
  })

  .state('workout', {
    url: '/workout',
    templateUrl: '../templates/workout.html',
    controller: 'MainCtrl',
  })

  .state('stats', {
    url: '/stats',
    templateUrl: '../templates/stats.html',
    controller: 'MainCtrl',
  })

  .state('login', {
    url: '/login',
    templateUrl: '../templates/login.html',
    controller: 'MainCtrl',
  })

  .state('dash', {
    url: '/dash',
    templateUrl: '../templates/dash.html',
    controller: 'MainCtrl',
  })

  .state('register', {
    url: '/register',
    templateUrl: '../templates/register.html',
    controller: 'MainCtrl',
  })

  $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', function($scope,$http,$state, $window) {
      // console.log('hi from the controller')

      $scope.email = '';
      $scope.firstName = '';
      $scope.nick = '';
      $scope.userPassword = '';
      $scope.dataBase = [];
      $scope.admin123 = false;
      $scope.tester = 'LOTS OF TEXTS'
      $scope.aSearch = '';
      $scope.puAdder = null;
      $scope.topDemo = [{
          nick: 'Aaron',
          pushUp: 150
        },
         {
          nick: 'Brandon',
          pushUp: 125
        },
         {
          nick: 'Jona',
          pushUp: 112
        }];

        $scope.username = '';
        $scope.password = '';

        $scope.logBtn = function(){

        }

        $scope.registerButton = function(){
          
          var data = {
          username: $scope.nick,
          password: $scope.userPassword

          }
              
          $http({
            method: 'POST',
            url: '/register',
            data: data,
            success: function (token) {
              var token = JSON.stringify(token);
              localStorage['passport-jwt'] = token;
            console.log('Sent to localStorage')
            }
          })
        };

        $scope.gotoDash = function(){
          $state.go('dash')
        }

        $scope.gotoStats = function(){
          $state.go('stats')
      
        }

        $scope.Tregister = function(){
          $state.go('register')
        }


        $scope.logIn = function(){
          var id = $scope.username
          var pass = $scope.password
          if(id.toLowerCase() === 'admin' && pass === 'admin'){
            console.log('Success you are addmin')
            $state.go('dash')

          } else {
            alert('Wrong ID/Password')
          }
          // $scope.adminid = '';
          $scope.adminpass = '';
        }

       $scope.dateTimer = function(){
        if(Date().split(" ")[0] === 'Sun'){
          $scope.DaysLeft = (Math.abs(Date().split(" ")[4].split(":")[0] - 24) +' Hours Remaining')
        } else if (Date().split(" ")[0] === 'Mon'){
          $scope.DaysLeft = ('6 Days '+ Math.abs(Date().split(" ")[4].split(":")[0] - 24) +' Hours Remaining')
        } else if (Date().split(" ")[0] === 'Tue'){
          $scope.DaysLeft = ('5 Days '+ Math.abs(Date().split(" ")[4].split(":")[0] - 24) +' Hours Remaining')
        } else if (Date().split(" ")[0] === 'Wed'){
          $scope.DaysLeft = ('4 Days '+ Math.abs(Date().split(" ")[4].split(":")[0] - 24) +' Hours ' + Math.abs(Date().split(" ")[4].split(":")[2] - 60) + ' Seconds Left' )
        } else if (Date().split(" ")[0] === 'Thu'){
          $scope.DaysLeft = ('3 Days '+ Math.abs(Date().split(" ")[4].split(":")[0] - 24) +' Hours Remaining')
        } else if (Date().split(" ")[0] === 'Fri'){
          $scope.DaysLeft = ('2 Days '+ Math.abs(Date().split(" ")[4].split(":")[0] - 24) +' Hours Remaining')
        } else if (Date().split(" ")[0] === 'Sat'){
          $scope.DaysLeft = ('1 Days '+ Math.abs(Date().split(" ")[4].split(":")[0] - 24) +' Hours Remaining')
        } else {
          $scope.DaysLeft = 'Gal Go Check This'
          console.log(Date().split(" ")[0])
        }
     
       } 
        $scope.dateTimer();


        $scope.maybe = function(){

          // db.forms.update({"nick":"lemon"}, {$inc:{"pushUp": 1}})
        }

        $scope.updatePushUps10 = function(){
          // var theInput = $scope.puAdder

          $http.put('/update10')
          window.location.reload();
        }

        $scope.updatePushUps1 = function(){
          // var theInput = $scope.puAdder

          $http.put('/update1')
          window.location.reload();
        }

        $scope.updatePushUpsJava = function(){
          // var theInput = $scope.puAdder

          $http.put('/updateJava')
          window.location.reload();
        }

        $scope.updatePushUpsAlbert = function(){
          // var theInput = $scope.puAdder

          $http.put('/updateAlbert')
          window.location.reload();
        }
        
        $scope.Rank = '';
        
        $scope.rankPlace = function(){
          if($scope.dataBase[1].pushUp > $scope.dataBase[0].pushUp && $scope.dataBase[1].pushUp > $scope.dataBase[2].pushUp ){
            $scope.Rank = '1'
          } else if($scope.dataBase[1].pushUp > $scope.dataBase[0].pushUp && $scope.dataBase[1].pushUp < $scope.dataBase[2].pushUp){
            $scope.Rank = '2'
          } else if($scope.dataBase[1].pushUp < $scope.dataBase[0].pushUp && $scope.dataBase[1].pushUp > $scope.dataBase[2].pushUp){
            $scope.Rank = '3'
          }

        }

        $scope.rankPlace();

       $scope.addPushTest = function (){
        var noCheat = confirm('Did You Really Do ' + $scope.puAdder + ' Push Ups?');
        if(noCheat == true){
        $scope.dataBase[1].pushUp += Number($scope.puAdder);
        $scope.puAdder = null
        for(var i = 0; i < $scope.dataBase.length ; i++){
        if($scope.dataBase[i].pushUp > $scope.topDemo[i].pushUp && $scope.dataBase[i] !== null){
          $scope.topDemo.push($scope.dataBase[i])
          }
        }
        // console.log()
       } else {
        console.log('Pressed Cancel');
       }
      } 

      $scope.registerForm = function(){
        var name = $scope.firstName;
        var nick = $scope.nick;
        var password = $scope.userPassword;

        if(name !== '' && nick !== '' && password !== '' ){
        var obj = {
          name: name,
          nick: nick,
          password: password,
          pushUp: 0
        }

          $http.post('/admin', obj);
          $state.go('dash')
        
        $scope.nick = '';
        $scope.firstName = '';
        $scope.userPassword = '';
        } else {
          alert('Please Fill all the information')
        }
      }

      $scope.adminLogClick = function() {
        $scope.admin123 = !$scope.admin123
      }

    $scope.searchDB = function() {

      var success = function(data){
        $scope.dataBase = [];
        for(var i = 0; i < data.data.length; i++){
          $scope.dataBase.push(data.data[i])
          }
      }
      var error = function(){
        console.log('Error with Data')
      }
      $http.get('/admin').then(success,error);

    }

    $scope.searchDB()

  });

