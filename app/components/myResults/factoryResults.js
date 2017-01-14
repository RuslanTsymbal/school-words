myApp.factory('FactoryResults', function () {
    var result = {};
    var user;

    result.getQuantityWords = function () {
        user = JSON.parse(localStorage.getItem("user"));
        var arrWords = [];
        for(var key in user.decks){
            var num = user.decks[key].words.length;
            num = String(num);
            arrWords.push(num);
        }
        return arrWords;
    };

    result.getResults = function(){
        user = JSON.parse(localStorage.getItem("user"));
        var resultWords = user.results;
        return resultWords;
    };
    return result;
});
