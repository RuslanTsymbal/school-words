myApp.factory('FactoryRegistration_status', function ($http) {
    var user = {};

    user.saveUser = function (name, password) {
        newUser = {};
        newUser.name = name;
        newUser.registration = {};
        newUser.registration.login = name;
        newUser.registration.password = password;
        newUser.decks = {};
        newUser.results = [];
        newUser.resultsWords = [];
        user.saveLS("user", newUser);
        return $http.post('/saveUsers', newUser);
    };

    user.saveLS = function (key, obj) {
        localStorage[key] = angular.toJson(obj);
        var newObj = JSON.parse(localStorage.getItem(key));
        return newObj;
    };
    return user;
});
