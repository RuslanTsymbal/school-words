myApp.controller('addWordCtrl', function ($scope, FactoryAddWord, $timeout, Factory_searchUser) {
    $scope.newWord = "";
    $scope.translation = "";
    $scope.titleDeck = "";
    $scope.enterNewWord = "";
    $scope.numberWords = 0;
    $scope.showDecks = false;
    $scope.resultAddWord = false;
    $scope.showButton = true;

    Factory_searchUser.getUser($scope.nameUserLS)
        .then(function (user) {
            $scope.sendUserLS(user);
        });

    if ($scope.newWord && $scope.translation) {
        $scope.rerult = true;
    }

    $scope.selectDeck = function (word, translation) {
        if (!JSON.parse(localStorage.getItem("decks"))) {
            alert("You do not have decks. Create a deck.");
            $scope.newWord = "";
            $scope.translation = "";
            $scope.showDecks = false;
        } else {
            $scope.showButton = false;
            Factory_searchUser.getUser($scope.nameUserLS)
                .then(function (user) {
                    $scope.userLS = user;
                });

            if ($scope.newWord === $scope.translation) {
                alert("Repeat the words. Word may not be the same.");
                $scope.newWord = "";
                $scope.translation = "";
                $scope.showDecks = false;
            } else if (!isNaN(parseInt($scope.newWord)) || !isNaN(parseInt($scope.translation))) {
                alert("You cann't enter digits. Please enter the word.");
                $scope.newWord = "";
                $scope.translation = "";
                $scope.showDecks = false;
            } else if (!$scope.newWord && $scope.translation) {
                alert("You did not enter the word.");
                $scope.newWord = "";
                $scope.translation = "";
            } else if ($scope.newWord && !$scope.translation) {
                alert("You have not entered the translation of the word.");
                $scope.newWord = "";
                $scope.translation = "";
            } else if ($scope.newWord && $scope.translation) {
                $scope.showDecks = true;
            }
        }
    };

    $scope.addWord = function (word, translation, deck) {
        $scope.showButton = true;
        if (FactoryAddWord.findWordsRepeated(word, deck)) {
            FactoryAddWord.addWord(word, translation, deck);
            $scope.enterNewWord = $scope.newWord;
            $scope.newWord = "";
            $scope.translation = "";
            $scope.showDecks = false;
            $scope.resultAddWord = true;
            $scope.titleDeck = deck;

            $timeout(function () {
                $scope.resultAddWord = false;
            }, 1000);
        } else {
            alert("In this deck is the word there. Please enter a different word.");
            $scope.newWord = "";
            $scope.translation = "";
            $scope.showDecks = false;
        }
    };

    $scope.sendUserLS = function (user) {
        $scope.$emit("sendUser", {
            message: user
        });
    };
});
