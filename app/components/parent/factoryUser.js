myApp.factory('Factory_searchUser', function ($http) {
    var foundUser = {};

    foundUser.getUser = function (name) {
        return $http.post('/getUser', {"name": name})
            .then(function (user) {
                var myUser = user.data;
                var nameUser = myUser.name;
                foundUser.getUserName(nameUser);
                var user = foundUser.saveLS("user", myUser);
                return user;
            });
    };

    foundUser.getUserName = function (name) {
        var name = foundUser.saveLS("name", name);
        return name;
    };

    foundUser.saveLS = function (key, obj) {
        localStorage[key] = angular.toJson(obj);
        var newObj = JSON.parse(localStorage.getItem(key));
        return newObj;
    };

    if (JSON.parse(localStorage.getItem("user"))) {
        foundUser.getUserLS = JSON.parse(localStorage.getItem("user"));
    }
    return foundUser;
});
