window.database = {};

function update() {
    var list = document.getElementById("list");
    for (var i = 0; i < database.length; i++) {
        var item = document.createElement("option")
        item.text = "" + i + " : " + database[i].name.en_US;
        item.value=i;
        list.add(item);
    }
}



function loadFromFile(file, cb) {
    "use strict";
    var reader = new FileReader();
    reader.onload = function (e) {
        var text = e.target.result;
        cb(JSON.parse(text).items);
    };
    reader.readAsText(file);
}

function init() {
    var container = document.getElementById("jsoneditor");
    var editor = new JSONEditor(container, {});
    window.e = editor;
    var database;
    var databaseInput = document.getElementById("database");
    databaseInput.addEventListener("change", function (evt) {
        database = evt.target.files[0];
        if (database) {
            document.getElementById("load").disabled = false;
        } else {
            document.getElementById("load").disabled = true;
        }
    }, false);
    var loadButton = document.getElementById("load");
    loadButton.addEventListener("click", function () {
        if (!database) {
            window.alert("You need to choose a file first!");
            return;
        }
        loadFromFile(database, function (db) {
            window.database = db;
            update();
        });
    }, false);
    var sList = document.getElementById('list');
    sList.onchange = function () {
		window.e.set(window.database[this.value]);
    };
}
document.addEventListener("DOMContentLoaded", init);
