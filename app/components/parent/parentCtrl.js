myApp.controller('parentCtrl', function ($scope, $http, $state, FactoryRegistration_status, FactoryRegistration_name, Factory_searchUser, FactoryCreateDeck) {
    $scope.listDecks = [];
    $scope.userLS = {};
    $scope.nameUser = "";
    $scope.nameUserLS = "";
    $scope.passwordUser = "";
    $scope.showUser = false;
    $scope.showExit = false;
    $scope.showForm = true;
    $scope.showPage = false;
    $scope.showApplication = false;
    $scope.showHaveDecks = false;
    $scope.showNoDecks = false;
    $scope.showDecks_creareDecks_1 = false;
    $scope.showDecks_creareDecks_2 = false;

    /*-------  from localStorage  --------*/

    if (localStorage.getItem("user")) {
        $scope.nameUserLS = FactoryRegistration_name.getUserNameLS;
        $scope.listDecks = FactoryCreateDeck.getDecksLS;
        $scope.userLS = Factory_searchUser.getUserLS;
        $scope.showApplication = true;
        $scope.showForm = false;
        $scope.showUser = true;
        $scope.showExit = true;
        if ($scope.listDecks) {
            $scope.showDecks_creareDecks_1 = false;
            $scope.showDecks_creareDecks_2 = true;
        } else {
            $scope.showDecks_creareDecks_1 = true;
            $scope.showDecks_creareDecks_2 = false;
        }
    }

    /*-------------------------------------*/

    $scope.saveUser = function (name, password, remember) {
        if (name && password) {
            if (name == password) {
                alert("Name and passport must be different");
                $scope.nameUser = "";
                $scope.passwordUser = "";
            } else {
                $scope.recordUser(name, password);
                $scope.showDecks_creareDecks_1 = true;
            }
        }
    };

    $scope.recordUser = function (name, password) {
        $scope.nameUser = "";
        $scope.passwordUser = "";
        FactoryRegistration_status.saveUser(name, password)
            .then(function (data) {
                if (data.data) {
                    $scope.nameUserLS = name;
                    $scope.showUser = true;
                    $scope.showUser = true;
                    $scope.showForm = false;
                    $scope.showExit = true;
                    $scope.showApplication = true;
                    $scope.getUserName(name);
                } else {
                    alert("User with the same name already exists. Еnter another name.");
                    $scope.showApplication = false;
                    localStorage.clear();
                }
            });
    };

    $scope.getUserName = function (name) {
        FactoryRegistration_name.getUserName(name)
            .then(function (nameUser) {
                $scope.nameUserLS = nameUser;
            });
    };

    $scope.searchUser = function (name, password) {
        FactoryRegistration_status.saveUser(name, password)
            .then(function (status) {
                if (status.data) {
                    localStorage.clear();
                    $scope.nameUser = "";
                    $scope.passwordUser = "";
                    alert("This user name is not, please register.");
                } else {
                    Factory_searchUser.getUser(name)
                        .then(function (user) {
                            $scope.nameUser = "";
                            $scope.passwordUser = "";
                            $scope.showApplication = true;
                            $scope.nameUserLS = user.name;
                            var decksUser = [];

                            for (var key in user.decks) {
                                decksUser.push(key);
                            }

                            FactoryCreateDeck.saveLS("decks", decksUser);
                            $scope.listDecks = decksUser;
                            $scope.showUser = true;
                            $scope.showForm = false;
                            $scope.showExit = true;
                            $scope.foundUser = user;
                            Factory_searchUser.getUser($scope.nameUserLS)
                                .then(function (user) {
                                    $scope.userLS = user;
                                });

                            if ($scope.listDecks.length > 0) {
                                $scope.showDecks_creareDecks_1 = false;
                                $scope.showDecks_creareDecks_2 = true;
                            } else {
                                $scope.showDecks_creareDecks_1 = true;
                                $scope.showDecks_creareDecks_2 = false;
                            }
                        });
                }
            });
    };

    $scope.showPageCreateDeck = function () {
        $scope.showPage = true;
        if (JSON.parse(localStorage.getItem("decks"))) {
            $scope.showDecks_creareDecks_1 = false;
            $scope.showDecks_creareDecks_2 = true;
        }
    };

    $scope.showPageAddWord = function () {
        $scope.showPage = true;
    };

    $scope.showPageStartLearning = function () {
        $scope.showPage = true;
        if (!localStorage.getItem("decks")) {
            $scope.showHaveDecks = false;
            $scope.showNoDecks = true;
        } else {
            $scope.showHaveDecks = true;
            $scope.showNoDecks = false;
        }
    };

    $scope.showPageMyResults = function () {
        $scope.showPage = true;
    };

    $scope.showPageRemove = function () {
        $scope.showPage = true;
        if (!localStorage.getItem("decks")) {
            $scope.showHaveDecks = false;
            $scope.showNoDecks = true;
        } else {
            $scope.showHaveDecks = true;
            $scope.showNoDecks = false;
        }
    };

    $scope.addClass1 = function () {
        $scope.classNames1 = "background-button";
        $scope.classNames2 = "";
        $scope.classNames3 = "";
        $scope.classNames4 = "";
        $scope.classNames5 = "";
    };

    $scope.addClass2 = function () {
        $scope.classNames1 = "";
        $scope.classNames2 = "background-button";
        $scope.classNames3 = "";
        $scope.classNames4 = "";
        $scope.classNames5 = "";
    };

    $scope.addClass3 = function () {
        $scope.classNames1 = "";
        $scope.classNames2 = "";
        $scope.classNames3 = "background-button";
        $scope.classNames4 = "";
        $scope.classNames5 = "";
    };

    $scope.addClass4 = function () {
        $scope.classNames1 = "";
        $scope.classNames2 = "";
        $scope.classNames3 = "";
        $scope.classNames4 = "background-button";
        $scope.classNames5 = "";
    };

    $scope.addClass5 = function () {
        $scope.classNames1 = "";
        $scope.classNames2 = "";
        $scope.classNames3 = "";
        $scope.classNames4 = "";
        $scope.classNames5 = "background-button";
    };

    $scope.exit = function () {
        localStorage.clear();
        $scope.showApplication = false;
        $scope.showUser = false;
        $scope.showExit = false;
        $scope.showForm = true;
        $scope.listDecks = [];
    };

    $scope.$on("sendDecks", function (event, args) {
        $scope.listDecks = args.message;
    });

    $scope.$on("sendUser", function (event, args) {
        $scope.userLS = args.message;
    });
});
