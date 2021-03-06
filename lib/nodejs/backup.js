function log() {
    mainWindow.loadURL('file://' + __dirname + '/Table.html');
}

function addClass(semester, className, section, startTime, endTime, day, color) {
    var newData = {
        "className": className,
        "section": section,
        "startTime": startTime,
        "endTime": endTime,
        "day": day,
        "color": color,
        "note": []
    };

    //读取文档找到正确位置插入
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var hasSameClass = false;

        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(semester) == 0) {
                var numClass = Object.size(obj[sem]);
                for (var j = 1; j < numClass; j++) {
                    var checkClass = "class" + j;
                    if ((obj[sem][checkClass].className.localeCompare(className) == 0) &&
                        (obj[sem][checkClass].section.localeCompare(section) == 0)) {
                        hasSameClass = true;
                        return -1;
                    }
                }
                if (!hasSameClass) {
                    var newClass = "class" + numClass;
                    //obj[sem][newClass] = JSON.parse(newData);
                    obj[sem][newClass] = newData;
                }
            }
        }

        fs.writeFile('./source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (hasSameClass) return -1;
        else return 0;
    });
}

function deleteClass(semester, className, section) {
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var deleted = false;

        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(semester) == 0) {
                var numClass = Object.size(obj[sem]);
                //console.log(numClass);
                for (var j = 1; j < numClass; j++) {
                    var newClass = "class" + j;

                    if ((obj[sem][newClass].className.localeCompare(className) == 0) &&
                        (obj[sem][newClass].section.localeCompare(section) == 0)) {
                        delete obj[sem][newClass];
                        deleted = true;
                        console.log("find equal");
                    }
                    if (deleted && j != (numClass - 1)) {
                        var succ = j + 1;
                        var temp = "class" + succ;
                        obj[sem][newClass] = obj[sem][temp];
                        //console.log("shift " + newClass);
                    }
                    if (j = (length - 1)) {
                        var lastClass = "class" + j;
                        delete obj[sem][lastClass];
                        //console.log("delelte last element " + newClass + " " + j + " " + lastClass);
                    }

                }
            }
        }


        fs.writeFile('./source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (deleted) return 0;
        else return -1;
    });


}
//dsfdsad
function addSemester(id) {
    var flag = true;
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
            // return;
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var newSem = "semester" + length;
        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(id) == 0) {
                console.log("check");
                //return -1;
                flag = false;
            }
            //console.log(obj[sem].id.localeCompare(id));
        }
        if (flag) {
            obj[newSem] = {
                "id": id
            };
            //console.log(obj);
            fs.writeFile('./source/class.json', JSON.stringify(obj), function (err) {
                if (err) {
                    return console.error(err);
                    // return;
                }
            });
            //return 0;
        }
    });
    return flag;
}

//删除学期，id是“Fall 2016”这样的形式
function deleteSemester(id) {
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var hasElement = false;

        //找名字和id一样的学期 然后删掉
        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(id) == 0) {
                delete obj[sem];
                hasElement = true;
            }
            if (hasElement && i != length) {
                var succ = i + 1;
                var temp = "semester" + succ;
                obj[sem] = obj[temp];
            }
            if (i == length) {
                delete obj[sem];
            }
        }


        fs.writeFile('./source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (hasElement) return 0;
        else return -1;
    });
}

function listsemester(pointer) {
    var semesters = [];
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;

        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            semesters.push(obj[sem].id);
        }
        return pointer(semesters);
    });
    fs.close;
}

function addClassSync(classes) {
    // var newData = {
    //     "className": className,
    //     "section": section,
    //     "startTime": startTime,
    //     "endTime": endTime,
    //     "day": day,
    //     "color": color,
    //     "note": []
    // };

    //读取文档找到正确位置插入
    //var data = fs.readFileSync('../class.json');
    fs.readFile('./source/class.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var obj = JSON.parse(data);
        var length = Object.size(obj) + 1;
        var hasSameClass = false;
        var hasSemester = false

        for (var i = 1; i < length; i++) {
            var sem = "semester" + i;
            if (obj[sem].id.localeCompare(classes.class1.semester) == 0) {
                var numClass = Object.size(obj[sem]);

                var size = Object.size(classes);
                //var size = classes.length
                for (var k = 0; k < size; k++) {
                    var newClass = "class" + (numClass + k);
                    var temp = "class" + (k + 1);
                    console.log("class " + temp);
                    var newData = {
                        "className": classes[temp].className,
                        "section": classes[temp].section,
                        "startTime": classes[temp].startTime,
                        "endTime": classes[temp].endTime,
                        "day": classes[temp].day,
                        "color": classes[temp].color,
                        "note": []
                    };
                    obj[sem][newClass] = newData;
                    console.log(newData);
                }
            }
        }

        fs.writeFile('./source/class.json', JSON.stringify(obj), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        if (hasSameClass) return -1;
        else return 0;
        fs.close;
    });
}

var fs = require("fs");
Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};