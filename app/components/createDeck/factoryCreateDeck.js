myApp.factory('FactoryCreateDeck', function ($http) {
    var decksUser = {};

    decksUser.createDeck = function (nameUser, titleDeck) {
        return $http.post('/newDeck', {'name': nameUser, 'title': titleDeck})
            .then(function (user) {
                var oldUser = user.data;
                decksUser.saveLS("user", oldUser);
                var decksOldUser = [];

                for (var key in oldUser.decks) {
                    decksOldUser.push(key);
                }

                var result = decksUser.saveLS("decks", decksOldUser);
                decksUser.getDecks(result);
            });
    };

    decksUser.findDeckRepeated = function (titleDeck) {
        if (JSON.parse(localStorage.getItem("decks"))) {
            var getDecksLS = JSON.parse(localStorage.getItem("decks"));

            for (var i = 0; i < getDecksLS.length; i++) {
                if (getDecksLS[i] == titleDeck) {
                    return false
                }
            }
            return true;
        } else {
            return true;
        }
    };

    decksUser.getDecks = function (decks) {
        return decks;
    };

    decksUser.saveLS = function (key, obj) {
        localStorage[key] = angular.toJson(obj);
        var newObj = JSON.parse(localStorage.getItem(key));
        return newObj;
    };

    if (JSON.parse(localStorage.getItem("decks"))) {
        decksUser.getDecksLS = JSON.parse(localStorage.getItem("decks"));
    }
    return decksUser;
});
