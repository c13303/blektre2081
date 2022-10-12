/* 
 * 
 * TOOLS SHARED FOR CLIENT AND SERVER !
 * 
 * 
 * 
 * */


function calculateDistance(x, y, tX, tY) {
    return Math.sqrt(Math.pow((x - tX), 2) + Math.pow((y - tY), 2));
}

function lineOnGrid(x0, y0, x1, y1, distMax = 8) {
    //Bresenham 
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx - dy;
    var returnArray = [];
    var curDist = 0;

    while (true) {
        var curPoint = [x0, y0];
        curDist++;
        if (curDist >= distMax)
            break;

        if ((x0 === x1) && (y0 === y1))
            break;
        var e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
    return (curPoint);
}

function getDirection(x, y, caseX, caseY, dist = 1) {
    /* direction selection */
    var dir = -1;
    var dirsx = null;
    var dirsy = null;


    if (caseX > x && caseY === y)
        dir = 0;
    if (caseX > x && caseY > y)
        dir = 1;
    if (caseX === x && caseY > y)
        dir = 2;
    if (caseX < x && caseY > y)
        dir = 3;
    if (caseX < x && caseY === y)
        dir = 4;
    if (caseX < x && caseY < y)
        dir = 5;
    if (caseX === x && caseY < y)
        dir = 6;
    if (caseX > x && caseY < y)
        dir = 7;


    return (dir);
}

function memorySizeOf(obj) {
    var bytes = 0;

    function sizeOf(obj) {
        if (obj !== null && obj !== undefined) {
            switch (typeof obj) {
                case 'number':
                    bytes += 8;
                    break;
                case 'string':
                    bytes += obj.length * 2;
                    break;
                case 'boolean':
                    bytes += 4;
                    break;
                case 'object':
                    var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                    if (objClass === 'Object' || objClass === 'Array') {
                        for (var key in obj) {
                            if (!obj.hasOwnProperty(key))
                                continue;
                            sizeOf(obj[key]);
                        }
                    } else
                        bytes += obj.toString().length * 2;
                    break;
            }
        }



        return bytes;
    }
    ;

    function formatByteSize(bytes) {
        if (bytes) {
            // console.log(parseInt(bytes));
        }
        return bytes;

        if (bytes < 1024)
            return bytes;
        else if (bytes < 1048576)
            return (bytes / 1024).toFixed(3);
        else if (bytes < 1073741824)
            return (bytes / 1048576).toFixed(3) + " MiB";
        else
            return (bytes / 1073741824).toFixed(3) + " GiB";
    }
    ;

    return formatByteSize(sizeOf(obj));
}
;










function matrix(rows, cols, defaultValue = null, nullvalue = false) {
    var arr = [];
    for (var matrixi = 0; matrixi < rows; matrixi++) {
        arr.push([]);
        arr[matrixi].push(new Array(cols));
        for (var matrixj = 0; matrixj < cols; matrixj++) {
            if (!defaultValue) {
                daval = null;
            } else {
                daval = defaultValue;
                if (defaultValue === "random") {
                    daval = getRandomInt(3);
                }
            }
            if (nullvalue)
                daval = 0;
            arr[matrixi][matrixj] = daval;
        }
    }
    return arr;
}
function matrix3D(size, defaultValue = null, nullvalue = false) {
    var arr = new Array(size);

    for (var z = 0; z < size; z++) {
        arr[z] = new Array(size);
        for (var x = 0; x < size; x++) {
            arr[z][x] = new Array(size);
            for (var y = 0; y < size; y++) {
                arr[z][x][y] = defaultValue;
            }
        }
    }
    return arr;
}




function rotate(tablo) {
    Array.prototype.rotate = (function () {
        var unshift = Array.prototype.unshift,
                splice = Array.prototype.splice;

        return function (count) {
            var len = this.length >>> 0,
                    count = count >> 0;

            unshift.apply(this, splice.call(this, count % len, len));
            return this;
        };
    })();
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function dump(obj) {
    return (JSON.stringify(obj));
}

function removeFromArray(tablo, value) {
    var pos = tablo.indexOf(value);
    tablo.splice(pos, 1);

}


function getZone(x, y, range, maxX, maxY) {

    var startX = x - range;
    var startY = y - range;
    var endX = x + range;
    var endY = y + range;

    if (startX < 0)
        startX = 0;
    if (startY < 0)
        startY = 0;
    if (endX > maxX)
        endX = maxX;
    if (endY > maxY)
        endY = maxY;

    return ([startX, startY, endX, endY]);
}

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] == needle)
            return true;
    }
    return false;
}

function nl2br(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br /><br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function slugify(str) {

    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/-,:;";
    var to = "aaaaeeeeiiiioooouuuunc______";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '_') // collapse whitespace and replace by -
            .replace(/-+/g, '_'); // collapse dashes

    return str;

}

