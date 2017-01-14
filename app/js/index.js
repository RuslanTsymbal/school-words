var hellopreloader = document.getElementById("hellopreloader_preload");

var myApp = angular.module('myApp', ['ui.router', 'chart.js']);

myApp.run(function ($window, $timeout) {
    $window.onload = function () {
       $timeout(function () {
            fadeOutnojquery(hellopreloader);
        }, 500);
    };

    function fadeOutnojquery(el) {
        el.style.opacity = 1;
        var interhellopreloader = $window.setInterval(function () {
                el.style.opacity = el.style.opacity - 0.05;
                if (el.style.opacity <= 0.05) {
                    $window.clearInterval(interhellopreloader);
                    hellopreloader.style.display = "none";
                }
            }, 16);
    }
});

myApp.config(function ($stateProvider) {
    $stateProvider
        .state('index', {
            url: ''
        })
        .state('create-deck', {
            url: '/create-deck',
            templateUrl: 'components/createDeck/createDeck.html'
        })
        .state('add-word', {
            url: '/add-word',
            templateUrl: 'components/addWord/addWord.html'
        })
        .state('start-learning', {
            url: '/start-learning',
            templateUrl: 'components/startLearning/startLearning.html'
        })
        .state('my-results', {
            url: '/my-results',
            templateUrl: 'components/myResults/myResults.html'
        })
        .state('remove', {
            url: '/remove-decks',
            templateUrl: 'components/remove/remove.html'
        });
});
