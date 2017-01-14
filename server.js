var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var json = require('json-file');
var file = json.read('./db/data.json');
var usersDb = file.get("users");

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.post('/saveUsers', function (req, res) {
    var iteration = true;

    for (var i = 0; i < usersDb.length; i++) {
        if (usersDb[i].name == req.body.name) {
            iteration = false;
            break;
        } else {
            iteration = true;
        }
    }
    if (iteration) {
        usersDb.push(req.body);
        file.writeSync();
    }
    res.send(iteration);
});


app.post('/getUser', function (req, res) {
    for (var i = 0; i < usersDb.length; i++) {
        if (usersDb[i].name == req.body.name) {
            res.send(usersDb[i]);
            break;
        }
    }
});


app.post('/newDeck', function (req, res) {
    function addNewDeck(name, title) {
        for (var i = 0; i < usersDb.length; i++) {
            if (usersDb[i].name == name) {
                var newNameDeck = title;
                usersDb[i].decks[newNameDeck] = {
                    words: []
                };
                usersDb[i].results.push("0");
                usersDb.splice([i], 1, usersDb[i]);
                file.writeSync();
                res.send(usersDb[i]);
                break;
            }
        }
    }

    addNewDeck(req.body.name, req.body.title);
});


app.post('/addWord', function (req, res) {
    function addNewWord(name, word, translation, deck) {
        for (var i = 0; i < usersDb.length; i++) {
            if (usersDb[i].name == name) {
                var newWords = [];
                newWords.push(word);
                newWords.push(translation);
                var deckUser = deck;
                usersDb[i].decks[deckUser].words.push(newWords);
                res.send(usersDb[i]);
                usersDb.splice([i], 1, usersDb[i]);
                file.writeSync();
                break;
            }
        }
    }

    addNewWord(req.body.name, req.body.word, req.body.translation, req.body.deck);
});


app.post('/deleteWord', function (req, res) {
    function deleteWord(name, word, deck, index, indexDeck) {
        for (var i = 0; i < usersDb.length; i++) {
            if (usersDb[i].name == name) {
                for (var key in usersDb[i].decks) {
                    if (key == deck) {
                        var deckUser = deck;
                        usersDb[i].decks[deckUser].words.splice(index, 1);
                        break;
                    }
                }

                for (var e = 0; e < usersDb[i].resultsWords.length; e++) {
                    if (word == usersDb[i].resultsWords[e]) {
                        var indexWord = usersDb[i].resultsWords.indexOf(word);
                        usersDb[i].resultsWords.splice(indexWord, 1);
                        file.writeSync();
                    }
                }

                var results = usersDb[i].results;
                var num = +results[indexDeck];
                num = num - 1;
                if (num <= 0) {
                    num = 0;
                }
                num = String(num);
                usersDb[i].results.splice(indexDeck, 1, num);
                file.writeSync();
                res.send(usersDb[i]);

            }
        }
    }

    deleteWord(req.body.name, req.body.word, req.body.deck, req.body.index, req.body.indexDeck);
});


app.post('/deleteAllDecks', function (req, res) {
    function deleteDecks(name) {
        for (var i = 0; i < usersDb.length; i++) {
            if (usersDb[i].name == name) {
                usersDb[i].decks = {};
                usersDb[i].resultsWords.length = 0;
                usersDb[i].results.length = 0;
                file.writeSync();
                res.send(usersDb[i]);
                break;
            }
        }
    }

    deleteDecks(req.body.name);
});

app.post('/deleteOnDeck', function (req, res) {
    function deleteOnDeck(name, deck, index) {
        var deckUser = deck;
        for (var i = 0; i < usersDb.length; i++) {
            if (usersDb[i].name == name) {
                usersDb[i].results.splice(index, 1);

                for (var key in usersDb[i].decks) {
                    if (key == deck) {

                        for (var e = 0; e < usersDb[i].decks[deckUser].words.length; e++) {
                            for (var y = 0; y < usersDb[i].resultsWords.length; y++) {
                                if (usersDb[i].resultsWords[y] == usersDb[i].decks[deckUser].words[e][0]) {
                                    var indexWord = usersDb[i].resultsWords.indexOf[y];
                                    usersDb[i].resultsWords.splice(indexWord, 1);
                                }
                            }
                        }

                        delete usersDb[i].decks[deckUser];
                        file.writeSync();
                        res.send(usersDb[i]);
                        break;
                    }
                }
            }
        }
    }

    deleteOnDeck(req.body.name, req.body.deck, req.body.index);
});


app.post('/addResults', function (req, res) {
    var arrResult = [];

    function addResult(name, deck, index, length, word) {
        for (var i = 0; i < usersDb.length; i++) {
            if (usersDb[i].name == name) {
                if (usersDb[i].resultsWords.length == 0) {
                    usersDb[i].resultsWords.push(word);
                    file.writeSync();
                    record();
                } else {
                    var status = true;
                    for (var y = 0; y < usersDb[i].resultsWords.length; y++) {
                        if (word == usersDb[i].resultsWords[y]) {
                            status = false;
                            res.send(usersDb[i]);
                        }
                    }
                    if (status) {
                        usersDb[i].resultsWords.push(word);
                        file.writeSync();
                        record();
                    }
                    function record() {
                        usersDb[i].results.length = length;
                        for (var e = 0; e < usersDb[i].results.length; e++) {
                            var num = usersDb[i].results[e];
                            if (!num) {
                                num = "0";
                                arrResult.push(num);
                            } else {
                                arrResult.push(num);
                            }
                        }
                        usersDb[i].results = arrResult;
                        var resultUser = +usersDb[i].results[index];
                        if (resultUser == 0) {
                            resultUser = "1";
                            usersDb[i].results.splice(index, 1, resultUser);
                        } else {
                            resultUser = resultUser + 1;
                            resultUser = String(resultUser);
                            usersDb[i].results.splice(index, 1, resultUser);
                        }
                        file.writeSync();
                        res.send(usersDb[i]);
                    }
                }
            }
        }
    }

    addResult(req.body.name, req.body.deck, req.body.index, req.body.length, req.body.word);
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});