myApp.controller('removeCtrl', function ($scope, FactoryRemove, Factory_searchUser) {
    $scope.deckRemove = "";
    $scope.showDecksRemove = true;
    $scope.showElaboration_1 = false;
    $scope.showElaboration_2 = false;
    $scope.ifNoDecks = false;

    Factory_searchUser.getUser($scope.nameUserLS)
        .then(function (user) {
            $scope.sendUserLS(user);
        });

    $scope.questionOnDeck = function (deck) {
        $scope.deckRemove = deck;
        $scope.showDecksRemove = false;
        $scope.showElaboration_1 = true;
    };

    $scope.yesDeleteOneDeck = function (name) {
        var deck = $scope.deckRemove;
        FactoryRemove.deleteOnDeck(name, deck)
            .then(function (user) {
                $scope.sendUserLS(user);
                if (localStorage.getItem("decks")) {
                    $scope.ifNoDecks = false;
                    $scope.showDecksRemove = true;
                    $scope.showElaboration_1 = false;
                    var listDecks = JSON.parse(localStorage.getItem("decks"));
                    $scope.sendDecks(listDecks);
                } else {
                    listDecks = [];
                    $scope.sendDecks(listDecks);
                    $scope.ifNoDecks = true;
                    $scope.showDecksRemove = false;
                    $scope.showElaboration_1 = false;
                }
            })
    };

    $scope.questionAllDecks = function (nameUser) {
        $scope.showDecksRemove = false;
        $scope.showElaboration_2 = true;
    };

    $scope.yesDeleteAllDecks = function (name) {
        FactoryRemove.deleteAllDecks(name)
            .then(function (user) {
                var listDecks = [];
                $scope.sendDecks(listDecks);
                $scope.sendUserLS(user);
                $scope.ifNoDecks = true;
                $scope.showElaboration_1 = false;
                $scope.showElaboration_2 = false;
                $scope.showDecksRemove = false;
            })
    };

    $scope.noDelete = function () {
        $scope.showDecksRemove = true;
        $scope.showElaboration_1 = false;
        $scope.showElaboration_2 = false;
    };

    $scope.sendUserLS = function (user) {
        $scope.$emit("sendUser", {
            message: user
        });
    };

    $scope.sendDecks = function (decks) {
        $scope.$emit("sendDecks", {
            message: decks
        });
    };
});
