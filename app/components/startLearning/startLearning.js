myApp.controller('startLearningCtrl', function ($scope, FactoryStartLearning, Factory_searchUser) {
    $scope.word = "";
    $scope.translationWord = "";
    $scope.number = 0;
    $scope.deck = [];
    $scope.wordsUser = [];
    $scope.arrow = true;
    $scope.showWordsUser = false;
    $scope.showlistDecks = true;
    $scope.showTranslationWord = false;

    Factory_searchUser.getUser($scope.nameUserLS)
        .then(function (user) {
            $scope.sendUserLS(user);
        });

    $scope.startLesson = function (words, deck) {
        var userDeck = deck;
        $scope.number = 0;
        if ($scope.userLS.decks[userDeck].words.length == 0) {
            alert("In this deck there are no words. Select another deck.");
        } else {
            $scope.showWordsUser = true;
            $scope.showlistDecks = false;
            $scope.deck = deck;
            $scope.wordsUser = words;
            $scope.word = $scope.wordsUser[$scope.number][0];
            $scope.translationWord = $scope.wordsUser[$scope.number][1];
        }
    };

    $scope.next = function () {
        $scope.showTranslationWord = false;
        var userDeck = $scope.deck;

        if ($scope.number == $scope.userLS.decks[userDeck].words.length - 1) {
            $scope.showTranslationWord = false;
            $scope.number = 0;
            $scope.word = $scope.wordsUser[$scope.number][0];
            $scope.translationWord = $scope.wordsUser[$scope.number][1];
        } else {
            var number = $scope.number;
            $scope.number = number + 1;
            $scope.word = $scope.wordsUser[$scope.number][0];
            $scope.translationWord = $scope.wordsUser[$scope.number][1];
        }
    };

    $scope.back = function () {
        $scope.showTranslationWord = false;
        var number = $scope.number;
        $scope.number = number - 1;
        var userDeck = $scope.deck;

        if ($scope.number < 0) {
            $scope.number = $scope.userLS.decks[userDeck].words.length - 1;
            $scope.word = $scope.wordsUser[$scope.number][0];
            $scope.translationWord = $scope.wordsUser[$scope.number][1];
        } else if ($scope.number == 1 && $scope.userLS.decks[userDeck].words.length == 1) {
            $scope.number = 0;
            $scope.number = $scope.userLS.decks[userDeck].words.length - 1;
            $scope.word = $scope.wordsUser[$scope.number][0];
        }
    };

    $scope.showTranslation = function () {
        $scope.showTranslationWord = true;
    };

    $scope.stopLesson = function () {
        $scope.showlistDecks = true;
        $scope.showWordsUser = false;
    };

    $scope.deleteWord = function (index, word) {
        $scope.showTranslationWord = false;
        FactoryStartLearning.deleteWord($scope.nameUserLS, $scope.deck, index, word)
            .then(function (user) {
                var userDeck = $scope.deck;
                $scope.userLS = user;
                var userDeck = $scope.deck;
                $scope.sendUserLS($scope.userLS);
                if (index == 0 && $scope.userLS.decks[userDeck].words.length == 1) {
                    $scope.wordsUser = $scope.userLS.decks[userDeck].words;
                    $scope.number = 0;
                    $scope.word = $scope.wordsUser[0][0];
                    $scope.translationWord = $scope.wordsUser[0][1];
                } else if (index == 0 && $scope.userLS.decks[userDeck].words.length == 0) {
                    $scope.showlistDecks = true;
                    $scope.showWordsUser = false;
                    $scope.wordsUser = $scope.userLS.decks[userDeck].words;
                } else if (index == 1 && $scope.userLS.decks[userDeck].words.length == 1) {
                    $scope.number = 0;
                    $scope.wordsUser = $scope.userLS.decks[userDeck].words;
                    $scope.word = $scope.wordsUser[0][0];
                    $scope.translationWord = $scope.wordsUser[0][1];
                } else if (index > 1 && $scope.userLS.decks[userDeck].words.length - 1) {
                    $scope.number = 0;
                    $scope.wordsUser = $scope.userLS.decks[userDeck].words;
                    $scope.word = $scope.wordsUser[0][0];
                    $scope.translationWord = $scope.wordsUser[0][1];
                } else {
                    $scope.next();
                }
            });
    };

    $scope.changeNumber = function (index) {
        var userDeck = $scope.deck;
        $scope.number = $scope.userLS.decks[userDeck].words.length - 1;
    };

    $scope.addResult = function (name, deck, word) {
        FactoryStartLearning.addResultUser(name, deck, word)
            .then(function (user) {
                $scope.userLS = user;
            })
    };

    $scope.sendUserLS = function (user) {
        $scope.$emit("sendUser", {
            message: user
        });
    };
});
