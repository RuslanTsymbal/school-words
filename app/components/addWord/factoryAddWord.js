myApp.factory('FactoryAddWord', function ($http) {
    var words = {};

    words.findWordsRepeated = function (word, deck) {
        var user = JSON.parse(localStorage.getItem("user"));
        var deckUser = deck;
        var wordsUser = user.decks[deckUser].words;
        if (wordsUser.length > 0) {
            for (var i = 0; i < wordsUser.length; i++) {
                if (wordsUser[i][0] == word) {
                    return false;
                }
            }
            return true;
        } else {
            return true;
        }
    };

    words.addWord = function (word, translation, deck) {
        var nameUser = JSON.parse(localStorage.getItem("name"));
        return $http.post('/addWord', {'name': nameUser, 'word': word, 'translation': translation, 'deck': deck})
            .then(function (data) {
                var user = data.data;
                words.saveLS("user", user)
            });
    };

    words.saveLS = function (key, obj) {
        localStorage[key] = angular.toJson(obj);
        var newObj = JSON.parse(localStorage.getItem(key));
        return newObj;
    };
    return words;
});
