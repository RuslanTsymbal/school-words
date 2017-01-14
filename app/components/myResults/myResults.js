myApp.controller('myResultsCtrl', function ($scope, FactoryResults, Factory_searchUser) {
    $scope.showResult = false;
    $scope.showNoResult = false;
    var user = JSON.parse(localStorage.getItem("user"));

    if (user.resultsWords.length > 0){
        $scope.showResult = true;
        var wordsInDecks = FactoryResults.getQuantityWords();
        $scope.labels = JSON.parse(localStorage.getItem("decks"));
        $scope.series = ['Series A', 'Series B'];
        var learnedWords = FactoryResults.getResults();
        $scope.data = [wordsInDecks, learnedWords];
    } else {
        $scope.showNoResult = true;
    }
});
