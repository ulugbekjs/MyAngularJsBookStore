angular.module("bookStore.books", ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/books', {
            templateUrl: 'books/books.html',
            controller: 'BooksCtrl'
        })
    .when('/books/:bookId', {
        templateUrl: 'books/book-details.html',
        controller: 'BookDetailsCtrl'
    });
}])

.controller('BooksCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('/json/books.json').success(function(data){
        $scope.books = data;
    });
}])

.controller('BookDetailsCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter){
    
    var bookId = $routeParams.bookId;
    $http.get('/json/books.json').success(function(data){
        $scope.book = $filter('filter')(data, function(d){
            return d.id == bookId;
        })[0];
    });
    
}]);
