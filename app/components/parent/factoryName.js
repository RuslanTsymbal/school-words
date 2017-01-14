myApp.factory('FactoryRegistration_name', function ($http) {
    var nameUser = {};

    nameUser.getUserName = function (name) {
        return $http.post('/getUser', {"name": name})
            .then(function (userName) {
                var userName = userName.data;
                var name = userName.name;
                name = nameUser.saveLS("name", name);
                return name;
            });
    };

    nameUser.saveLS = function (key, obj) {
        localStorage[key] = angular.toJson(obj);
        var newObj = JSON.parse(localStorage.getItem(key));
        return newObj;
    };

    if (JSON.parse(localStorage.getItem("name"))) {
        nameUser.getUserNameLS = JSON.parse(localStorage.getItem("name"));
    }
    return nameUser;
});
