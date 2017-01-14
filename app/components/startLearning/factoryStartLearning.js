myApp.factory('FactoryStartLearning', function ($http) {
    var lesson = {};

    lesson.deleteWord = function (name, deck, index, word) {
        var listDecks = JSON.parse(localStorage.getItem("decks"));
        var length = listDecks.length;
        var indexDeck = listDecks.indexOf(deck);
        return $http.post('/deleteWord', {
                'name': name,
                'word': word,
                'deck': deck,
                'index': index,
                'indexDeck': indexDeck
            })
            .then(function (user) {
                var user = user.data;
                user = lesson.saveLS("user", user);
                return user;
            });
    };

    lesson.saveLS = function (key, obj) {
        localStorage[key] = angular.toJson(obj);
        var newObj = JSON.parse(localStorage.getItem(key));
        return newObj;
    };

    lesson.addResultUser = function (name, deck, word) {
        var listDecks = JSON.parse(localStorage.getItem("decks"));
        var length = listDecks.length;
        var index = listDecks.indexOf(deck);
        return $http.post('/addResults', {'name': name, 'deck': deck, 'index': index, 'length': length, 'word': word})
            .then(function (user) {
                var user = user.data;
                user = lesson.saveLS("user", user);
                return user;
            });
    };
    return lesson;
});
