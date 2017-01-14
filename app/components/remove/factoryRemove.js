myApp.factory('FactoryRemove', function ($http) {
    var decks = {};

    decks.deleteAllDecks = function (name) {
        return $http.post('/deleteAllDecks', {'name': name})
            .then(function (user) {
                var user = user.data;
                decks.deleteKeyLS("decks");
                user = decks.saveLS("user", user);
                return user;
            });
    };

    decks.deleteOnDeck = function (name, deck) {
        var listDecks = JSON.parse(localStorage.getItem("decks"));
        var indexDeck = listDecks.indexOf(deck);
        var decksUser = [];
        var user;
        return $http.post('/deleteOnDeck', {'name': name, 'deck': deck, 'index': indexDeck})
            .then(function (user) {
                user = user.data;
                user = decks.saveLS("user", user);
                for (var key in user.decks) {
                    decksUser.push(key);
                }
                if (decksUser.length == 0) {
                    decks.deleteKeyLS("decks");
                } else {
                    decks.saveLS("decks", decksUser);
                }
                return user;
            });
    };

    decks.listDecks = function () {
        var listDecks = localStorage.getItem("decks");
        return listDecks;
    };

    decks.deleteKeyLS = function (key) {
        localStorage.removeItem(key);
    };

    decks.saveLS = function (key, obj) {
        localStorage[key] = angular.toJson(obj);
        var newObj = JSON.parse(localStorage.getItem(key));
        return newObj;
    };
    return decks;
});
