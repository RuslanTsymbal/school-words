myApp.controller('createDeckCtrl', function ($scope, $timeout, FactoryCreateDeck, Factory_searchUser) {
    $scope.titleDeck = "";
    $scope.showTitleDeck = false;
    $scope.showMyDecks = false;
    var decks = [];

    Factory_searchUser.getUser($scope.nameUserLS)
        .then(function (user) {
            $scope.sendUserLS(user);
        });

    $scope.saveTitleDeck = function (title) {
        if(!isNaN(parseInt(title))){
            alert("Deck name can not be a number.Enter the new name of the deck.");
            $scope.titleDeck = "";
            return;
        }
        if (FactoryCreateDeck.findDeckRepeated(title)) {
            FactoryCreateDeck.createDeck($scope.nameUserLS, title).then(function () {
                $scope.userLS = JSON.parse(localStorage.getItem("user"));
                decks = JSON.parse(localStorage.getItem("decks"));
                $scope.showMyDecks = true;
                $scope.showListDeck = true;
                $scope.sendDecks(decks);
                $scope.showNameDeck = title;
                $scope.titleDeck = "";
                $scope.showTitleDeck = true;
                $scope.showDecks_creareDecks_1 = false;
                $scope.showDecks_creareDecks_2 = true;
            });
            $timeout(function () {
                $scope.showTitleDeck = false;
            }, 900);
        } else {
            alert('Deck with the same name exists. Enter another name for a deck.');
            $scope.titleDeck = "";
        }
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
