/*
Autor: Petr Borisenko [borisenko.petr.a@gmail.com]
jnumbers.js - Java Scrypt library for project reshaem.pro.
*/
var arr = {
    int: [],
    simple_int: [],
    composite_int: [],
    decimal_int: [],
    exp_int: [],
    cache: []
};
var count = 0;

arr.decimal_int = [10, 100, 1000, 10000, 100000, 1000000];

arr.exp_int = [2, 3, 4, 5, 6, 7, 8];

arr.simple_int = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37,
    41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89,
    97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
    157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223,
    227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281,
    283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359,
    367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433,
    439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
    509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593,
    599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659,
    661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743,
    751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827,
    829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911,
    919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997
];
arr.decimal_denom = [1, 2, 4, 5, 8, 10, 16, 20, 25, 32, 40, 50,
  64, 80,  100,  125,  160,  200,  250,  320,  400,  500,  625,
  800, 000, 1250, 1600, 2000, 2500, 3125, 4000, 5000, 6250, 8000,
  10000, 12500, 15625, 20000, 25000, 31250, 40000, 50000, 62500,
  100000,  125000,  200000,  250000,  500000, 1000000];

for (var i = 0; i <= 1000; i++) {
    arr.int[i] = i;
    if (arr.simple_int.indexOf(i) != -1) {
        continue;
    } else {
        arr.composite_int[count] = i;
        count++;
    }
}

var $M;
$M = {
    isNumber(obj){
      if(typeof obj.int != 'undefined' &&
          typeof obj.num != 'undefined' &&
          typeof obj.denom != 'undefined' &&
          typeof obj.exp != 'undefined' &&
          typeof obj.attribute != 'undefined'){
        return true;
      }else{
        return false;
      }
    },
    isDecimal(denom){
      if (arr.decimal_denom.indexOf(denom) != -1 ){
        return true;
      }else{
        return false;
      };
    },
    decimal: function(nom, denom) {
        var str = '';

        if (nom >= denom) {
            if (nom % denom == 0) {
                str = nom / denom;
            } else {
                str = Math.floor(nom / denom) + ',';
                nom = nom % denom;
            }
        } else {
            str = '0,';
        }

        switch (denom.toString().length - 1 - nom.toString().length) {
            case 0:
                str = str + nom;
                break;

            case 1:
                str = str + '0' + nom;
                break;

            case 2:
                str = str + '00' + nom;
                break;

            case 3:
                str = str + '000' + nom;
                break;

            case 4:
                str = str + '0000' + nom;
                break;

            case 5:
                str = str + '00000' + nom;
                break;

            case 6:
                str = str + '000000' + nom;
                break;

            case 7:
                str = str + '0000000' + nom;
                break;

            case 8:
                str = str + '0000000' + nom;
                break;

            case 9:
                str = str + '00000000' + nom;
                break;

        }

        if (str[str.length - 1] == '0') {
            do {
                str = str.slice(0, -1);
            } while (str[str.length - 1] == '0');
        }

        return str;
    },
    decToFloat: function(decimal) {
        var float = 0.0;

        float = Number(decimal.toString().replace(',', '.'));

        return float;
    },
    floatToDec: function(float) {
        var dec = 0.0;

        dec = float.toString().replace('.', ',');

        return dec;
    },
    degreeNumber: function(base, rate) {
        var str = '';

        if (base >= 0 || base[0] != '-') {
            str = base + '<sup style="font-size: 65%">' + rate + '</sup> = ';
        } else {
            str = '(' + base + ')<sup style="font-size: 65%">' + rate + '</sup> = ';
        }

        return str;
    },
    fraction: function(nom, denom) {
        var str = '';
        str = '<span class="fraction"><sup>' + nom + '</sup><hr><sub>' + denom + '</sub></span>';
        return str;
    },
    nod: function(A) {
        var n = A.length,
            x = Math.abs(A[0]);
        for (var i = 1; i < n; i++) {
            var y = Math.abs(A[i]);
            while (x && y) {
                x > y ? x %= y : y %= x;
            }
            x += y;
        }
        return x;
    },
    nok: function(A) {
        var n = A.length,
            a = Math.abs(A[0]);
        for (var i = 1; i < n; i++) {
            var b = Math.abs(A[i]),
                c = a;
            while (a && b) {
                a > b ? a %= b : b %= a;
            }
            a = Math.abs(c * A[i]) / (a + b);
        }
        return a;
    },
    getSimpleNumbers: function(x) {
        var arr = [];
        var num = 2;

        function getNum(x) {
            if (x === '1') {
                arr.push(1);
            }
            if (x % num === 0) {
                arr.push(num);
                x = x / num;

                getNum(x);

            } else if (x % num !== 0) {
                if (!(x <= num)) {
                    num++;
                    getNum(x);
                }
            }
            return arr;
        }
        return getNum(x);
    },
    countDigit: function(number, digit) {
        var count = 0;
        number = String(number);
        switch (digit) {
            case 'единиц':
                if (number.length < 1) {
                    count = 0;
                } else {
                    count = number.substr(number.length - 1, 1);
                }
                break;

            case 'десятков':
                if (number.length < 2) {
                    count = 0;
                } else {
                    count = number.substr(number.length - 2, 1);
                }
                break;

            case 'сотен':
                if (number.length < 3) {
                    count = 0;
                } else {
                    count = number.substr(number.length - 3, 1);
                }
                break;

            case 'тысяч':
                if (number.length < 4) {
                    count = 0;
                } else {
                    count = number.substr(number.length - 4, 1);
                }
                break;

            case 'десятков тысяч':
                if (number.length < 5) {
                    count = 0;
                } else {
                    count = number.substr(number.length - 5, 1);
                }
                break;

            case 'сотен тысяч':
                if (number.length < 6) {
                    count = 0;
                } else {
                    count = number.substr(number.length - 6, 1);
                }
                break;

            case 'миллионов':
                if (number.length < 7) {
                    count = 0;
                } else {
                    count = number.substr(number.length - 7, 1);
                }
                break;

            case 'десятков миллионов':
                if (number.length < 8) {
                    count = 0;
                } else {
                    count = number.substr(number.length - 8, 1);
                }
                break;

            case 'десятых':
                if (number.length < 1) {
                    count = 0;
                } else {
                    count = number.substr(0, 1);
                }
                break;

            case 'сотых':
                if (number.length < 2) {
                    count = 0;
                } else {
                    count = number.substr(1, 1);
                }
                break;

            case 'тысячных':
                if (number.length < 3) {
                    count = 0;
                } else {
                    count = number.substr(2, 1);
                }
                break;

            case 'десятитысячных':
                if (number.length < 4) {
                    count = 0;
                } else {
                    count = number.substr(3, 1);
                }
                break;

            case 'стотысячных':
                if (number.length < 5) {
                    count = 0;
                } else {
                    count = number.substr(4, 1);
                }
                break;

            case 'миллионных':
                if (number.length < 6) {
                    count = 0;
                } else {
                    count = number.substr(5, 1);
                }
                break;

        }
        return count;
    },
    getNumber: function(range_int, range_num, range_denom, range_exp, decimal, minus) {
        var obj = {
            int: 0,
            num: 0,
            denom: 0,
            exp: 0,
            conf: {
                whole: null,
                fraction: null,
                decimal: null,
                degree: null,
                minus: null
            },
            html: []
        };

        if (range_int == 0 && range_num == 0 && range_denom == 0 && range_exp == 0 && decimal == 0 && minus == 0) {
            obj.int = 0;
            obj.num = 0;
            obj.denom = 1;
            obj.exp = 1;
            obj.conf.whole = false;
            obj.conf.fraction = false;
            obj.conf.decimal = false;
            obj.conf.degree = false;
            obj.conf.minus = false;
        } else {
            if (range_int == 0) {
                obj.conf.whole = false;
                obj.int = 0;
            } else {
                obj.conf.whole = true;
                arr.cache = arr.int.slice(range_int.slice(range_int[1], range_int.search('-')), parseInt(range_int.slice(range_int.search('-') + 1)) + 1);
                //arr.cache = arr.int.slice(range_int[0], range_int[1] + 1);
                obj.int = arr.cache[Math.floor(Math.random() * arr.cache.length)];
                // obj.int = arr.int[Math.floor(Math.random() * arr.int.length)];
            }

            if (range_num == 0 || range_denom == 0) {
                obj.conf.fraction = false;
                obj.conf.decimal = false;
                obj.num = 0;
                obj.denom = 1;
            } else {
                obj.conf.fraction = true;
                obj.conf.decimal = false;
                if (obj.conf.whole == true) {
                    do {
                        arr.cache = arr.int.slice(range_num.slice(range_num[1], range_num.search('-')), parseInt(range_num.slice(range_num.search('-') + 1)) + 1);
                        //arr.cache = arr.int.slice(range_num[0], range_num[1] + 1);
                        obj.num = arr.cache[Math.floor(Math.random() * arr.cache.length)];
                        // obj.num = arr.int[Math.floor(Math.random() * arr.int.length)];
                        arr.cache = arr.int.slice(range_denom.slice(range_denom[1], range_denom.search('-')), parseInt(range_denom.slice(range_denom.search('-') + 1)) + 1);
                        //arr.cache = arr.int.slice(range_denom[0], range_denom[1] + 1);
                        obj.denom = arr.cache[Math.floor(Math.random() * arr.cache.length)];
                        // obj.denom = arr.int[Math.floor(Math.random() * arr.int.length)];
                        if (decimal != 0) {
                            obj.conf.decimal = true;
                            arr.cache = arr.decimal_int.slice(range_denom.slice(range_denom[1], range_denom.search('-')), parseInt(range_denom.slice(range_denom.search('-') + 1)) + 1);
                            //arr.cache = arr.decimal_int.slice(range_denom[0], range_denom[1]);
                            obj.denom = arr.cache[Math.floor(Math.random() * arr.cache.length)];
                            // obj.denom = arr.decimal_int[Math.floor(Math.random() * arr.decimal_int.length)];
                        }
                    } while (obj.num >= obj.denom);
                } else {
                    do {
                        arr.cache = arr.int.slice(range_num.slice(range_num[1], range_num.search('-')), parseInt(range_num.slice(range_num.search('-') + 1)) + 1);
                        //arr.cache = arr.int.slice(range_num[0], range_num[1] + 1);
                        obj.num = arr.cache[Math.floor(Math.random() * arr.cache.length)];
                        // obj.num = arr.int[Math.floor(Math.random() * arr.int.length)];
                        arr.cache = arr.int.slice(range_denom.slice(range_denom[1], range_denom.search('-')), parseInt(range_denom.slice(range_denom.search('-') + 1)) + 1);
                        //arr.cache = arr.int.slice(range_denom[0], range_denom[1] + 1);
                        obj.denom = arr.cache[Math.floor(Math.random() * arr.cache.length)];
                        // obj.denom = arr.int[Math.floor(Math.random() * arr.int.length)];
                        if (decimal != 0) {
                            obj.conf.decimal = true;
                            arr.cache = arr.decimal_int.slice(range_denom.slice(range_denom[1], range_denom.search('-')), parseInt(range_denom.slice(range_denom.search('-') + 1)) + 1);
                            //arr.cache = arr.decimal_int.slice(range_denom[0], range_denom[1]);
                            obj.denom = arr.cache[Math.floor(Math.random() * arr.cache.length)];
                            // obj.denom = arr.decimal_int[Math.floor(Math.random() * arr.decimal_int.length)];
                        }
                    } while (obj.num >= obj.denom);
                }
            }

            if (range_exp == 0) {
                obj.conf.degree = false;
                obj.exp = 1;
            } else {
                obj.conf.degree = true;
                arr.cache = arr.int.slice(range_exp.slice(range_exp[1], range_exp.search('-')), parseInt(range_exp.slice(range_exp.search('-') + 1)) + 1);
                //arr.cache = arr.int.slice(range_exp[0], range_exp[1] + 1);
                obj.exp = arr.cache[Math.floor(Math.random() * arr.cache.length)];
                // obj.exp = arr.exp_int[Math.floor(Math.random() * arr.exp_int.length)];
            }

            if (minus == 0) {
                obj.conf.minus = false;
            } else {
                obj.conf.minus = true;
            }

            if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == false && obj.conf.minus == false) {
                obj.html[0] = ' ' + obj.int + '  ';
            }

            if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == true && obj.conf.minus == false) {
                obj.html[0] = ' ' + obj.int + '<sup><sup style="font-size: 45%">' + obj.exp + '</sup></sup> ';
            }

            if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == false && obj.conf.minus == true) {
                obj.html[0] = ' ' + obj.int * -1 + ' ';
                obj.html[1] = ' (' + obj.int * -1 + ') ';
            }

            if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == true && obj.conf.minus == true) {
                obj.html[0] = ' (' + obj.int * -1 + ')<sup><sup style="font-size: 45%">' + obj.exp + '</sup></sup> ';
            }

            if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == false) {
                obj.html[0] = ' <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> ';
                obj.html[10] = '\\frac{'+obj.num+'}{'+obj.denom+'}'
            }

            if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == false) {
                obj.html[0] = ' <sup style="font-size: 120%">(</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup> <sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup>';
            }

            if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == true) {
                obj.html[0] = ' <sup>-</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span>';
                obj.html[1] = ' <sup style="font-size: 120%">(</sup> <sup>-</sup><span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup> ';
            }

            if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == true) {
                obj.html[0] = ' <sup style="font-size: 120%">(</sup>  <sup>-</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
            }

            if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == false) {
                obj.html[0] = ' <sup>' + obj.int + '</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span>';
                obj.html[1] = ' <span class="fraction"><sup>' + parseInt(obj.denom * obj.int + obj.num) + '</sup><hr><sub>' + obj.denom + '</sub></span>';
            }

            if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == false) {
                obj.html[0] = ' <sup style="font-size: 120%">(</sup> <sup>' + obj.int + '</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
                obj.html[1] = ' <sup style="font-size: 120%">(</sup><span class="fraction"><sup>' + parseInt(obj.denom * obj.int + obj.num) + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
            }

            if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == true) {
                obj.html[0] = ' <sup>-' + obj.int + '</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span>';
                obj.html[1] = ' <sup style="font-size: 120%">(</sup> <sup>-' + obj.int + '</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup> ';
                obj.html[2] = ' <sup>-</sup> <span class="fraction"><sup>' + parseInt(obj.denom * obj.int + obj.num) + '</sup><hr><sub>' + obj.denom + '</sub></span>';
                obj.html[3] = ' <sup style="font-size: 120%">(</sup> <sup>-</sup> <span class="fraction"><sup>' + parseInt(obj.denom * obj.int + obj.num) + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup> ';
            }

            if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == true) {
                obj.html[0] = ' <sup style="font-size: 120%">(</sup> <sup>-' + obj.int + '</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
                obj.html[1] = ' <sup style="font-size: 120%">(</sup> <sup>-</sup> <span class="fraction"><sup>' + parseInt(obj.denom * obj.int + obj.num) + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
            }

            if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == false && obj.conf.minus == false) {
                obj.html[0] = ' ' + $M.decimal(parseInt(obj.denom * obj.int + obj.num), obj.denom) + ' ';
                obj.html[1] = ' <span class="fraction"><sup>' + parseInt(obj.denom * obj.int + obj.num) + '</sup><hr><sub>' + obj.denom + '</sub></span> ';
            }

            if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == true && obj.conf.minus == false) {
                obj.html[0] = ' ' + $M.decimal(parseInt(obj.denom * obj.int + obj.num), obj.denom) + '<sup><sup style="font-size: 45%">' + obj.exp + '</sup></sup> ';
                obj.html[1] = ' <sup style="font-size: 120%">(</sup><span class="fraction"><sup>' + parseInt(obj.denom * obj.int + obj.num) + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
            }

            if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == false && obj.conf.minus == true) {
                obj.html[0] = ' <sup>-</sup>' + $M.decimal(parseInt(obj.denom * obj.int + obj.num), obj.denom) + ' ';
                obj.html[1] = ' (<sup>-</sup>' + $M.decimal(parseInt(obj.denom * obj.int + obj.num), obj.denom) + ') ';
                obj.html[2] = ' <sup>-</sup><span class="fraction"><sup>' + parseInt(obj.denom * obj.int + obj.num) + '</sup><hr><sub>' + obj.denom + '</sub></span> ';
                obj.html[3] = ' (<sup>-</sup><span class="fraction"><sup>' + parseInt(obj.denom * obj.int + obj.num) + '</sup><hr><sub>' + obj.denom + '</sub></span>) ';
            }

            if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == true && obj.conf.minus == true) {
                obj.html[0] = ' <sup style="font-size: 120%">(</sup><sup>- ' + $M.decimal(parseInt(obj.denom * obj.int + obj.num), obj.denom) + '</sup><sup style="font-size: 120%">)</sup<sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup>';
                obj.html[1] = ' <sup style="font-size: 120%">(</sup> <sup>-</sup> <span class="fraction"><sup>' + parseInt(obj.denom * obj.int + obj.num) + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
            }

        }

        return obj;
    },
    setNumber: function(range_int, range_num, range_denom, range_exp, decimal, minus) {
        var obj = {
            int: 0,
            num: 0,
            denom: 0,
            exp: 0,
            conf: {
                whole: null,
                fraction: null,
                decimal: null,
                degree: null,
                minus: null
            },
            html: []
        };

        obj.int = 0;
        obj.num = 0;
        obj.denom = 1;
        obj.exp = 1;


        if (range_int == 0) {
            obj.conf.whole = false;
        } else {
            obj.conf.whole = true;
        }

        if (range_num == 0 || range_denom == 0) {
            obj.conf.fraction = false;
            obj.conf.decimal = false;
        } else {
            obj.conf.fraction = true;
            obj.conf.decimal = false;
            if (obj.conf.whole == true) {
                if (decimal != 0) {
                    obj.conf.decimal = true;
                } else {
                    if (decimal != 0) {
                        obj.conf.decimal = true;
                    }
                }
            }
        }

        if (range_exp == 0) {
            obj.conf.degree = false;;
        } else {
            obj.conf.degree = true;
        }

        if (minus == 0) {
            obj.conf.minus = false;
        } else {
            obj.conf.minus = true;
        }

        if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == false && obj.conf.minus == false) {
            obj.html[0] = ' <sup><input id="int"></sup> ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == true && obj.conf.minus == false) {
            obj.html[0] = ' <sup><input id="int"></sup><sup><sup style="font-size: 45%"><input id="exp"></sup></sup> ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == false && obj.conf.minus == true) {
            obj.html[0] = ' <sup><input id="int"></sup> ';
            obj.html[1] = ' (<sup><input id="int"></sup>) ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == true && obj.conf.minus == true) {
            obj.html[0] = ' (<sup><input id="int"></sup>)<sup><sup style="font-size: 45%"><input id="exp"></sup></sup> ';
        }

        if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == false) {
            obj.html[0] = ' <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> ';
        }

        if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == false) {
            obj.html[0] = ' <sup style="font-size: 120%">(</sup> <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> <sup style="font-size: 120%">)</sup> <sup><sup><sup style="font-size: 55%"><input id="exp"></sup></sup></sup>';
        }

        if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == true) {
            obj.html[0] = ' <sup><input id="int"></sup><span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span>';
            obj.html[1] = ' <sup style="font-size: 120%">(</sup> <sup><input id="int"></sup><span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> <sup style="font-size: 120%">)</sup> ';
        }

        if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == true) {
            obj.html[0] = ' <sup style="font-size: 120%">(</sup>  <sup><input id="int"></sup> <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%"><input id="exp"></sup></sup></sup> ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == false) {
            obj.html[0] = ' <sup><input id="int"></sup> <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span>';
            obj.html[1] = ' <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span>';
        }

        if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == false) {
            obj.html[0] = ' <sup style="font-size: 120%">(</sup> <sup><input id="int"></sup> <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%"><input id="exp"></sup></sup></sup> ';
            obj.html[1] = ' <sup style="font-size: 120%">(</sup><span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%"><input id="exp"></sup></sup></sup> ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == true) {
            obj.html[0] = ' <sup><input id="int"></sup> <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span>';
            obj.html[1] = ' <sup style="font-size: 120%">(</sup> <sup><input id="int"></sup> <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> <sup style="font-size: 120%">)</sup> ';
            obj.html[2] = ' <sup><input id="int"></sup> <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span>';
            obj.html[3] = ' <sup style="font-size: 120%">(</sup> <sup><input id="int"></sup> <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> <sup style="font-size: 120%">)</sup> ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == true) {
            obj.html[0] = ' <sup style="font-size: 120%">(</sup> <sup><input id="int"></sup> <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%"><input id="exp"></sup></sup></sup> ';
            obj.html[1] = ' <sup style="font-size: 120%">(</sup> <sup><input id="int"></sup> <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%"><input id="exp"></sup></sup></sup> ';
        }

        if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == false && obj.conf.minus == false) {
            obj.html[0] = ' <sup><input id="dec"></sup> ';
            obj.html[1] = ' <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> ';
        }

        if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == true && obj.conf.minus == false) {
            obj.html[0] = ' <sup><input id="dec"></sup><sup><sup style="font-size: 45%"><input id="exp"></sup></sup> ';
            obj.html[1] = ' <span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span><sup style="font-size: 45%"><input id="exp"></sup></sup> ';
        }

        if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == false && obj.conf.minus == true) {
            obj.html[0] = ' <sup><input id="dec"></sup> ';
            obj.html[1] = ' (<sup><input id="dec"></sup>) ';
            obj.html[2] = ' <sup><input id="int"></sup><span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span> ';
            obj.html[3] = ' (<sup><input id="int"></sup><span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span>) ';
        }

        if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == true && obj.conf.minus == true) {
            obj.html[0] = ' (<sup><input id="dec">)</sup><sup><sup style="font-size: 45%"><input id="exp"></sup></sup> ';
            obj.html[1] = ' (<sup><input id="int"></sup><span class="fraction"><sup><input id="num"></sup><hr><sub><input id="denom"></sub></span>)<sup><sup style="font-size: 45%"><input id="exp"></sup></sup> ';
        }

        return obj;
    },
    enterNumber: function(num, int_val, num_val, denom_val, exp_val, dec_val) {
        var obj = {
            int: 0,
            num: 0,
            denom: 0,
            exp: 0,
            conf: {
                whole: null,
                fraction: null,
                decimal: null,
                degree: null,
                minus: null
            },
            html: []
        };
        var cache = null;

        obj.conf.whole = num.conf.whole;
        obj.conf.fraction = num.conf.fraction;
        obj.conf.degree = num.conf.degree;
        obj.conf.decimal = num.conf.decimal;
        obj.conf.minus = false;

        if (typeof int_val != 'undefined') {
            if (int_val.indexOf('-') == -1) {
                obj.conf.minus = false;
                obj.int = Number(int_val);
            } else {
                obj.conf.minus = true;
                cache = int_val.slice(1);
                obj.int = Number(cache);
            }
        } else { obj.int = Number(num.int) }
        if (typeof num_val != 'undefined') { obj.num = Number(num_val) } else { obj.num = num.num }
        if (typeof denom_val != 'undefined') { obj.denom = Number(denom_val) } else { obj.denom = num.denom }
        if (typeof exp_val != 'undefined') { obj.exp = Number(exp_val) } else { obj.exp = num.exp }
        if (typeof dec_val != 'undefined') {
            if (dec_val.indexOf('-') == -1) {
                obj.conf.minus = false;
                cache = dec_val.slice(0, dec_val.indexOf(','));
                obj.int = Number(cache);
                cache = dec_val.slice(dec_val.indexOf(',') + 1);
                obj.num = Number(cache);
                obj.denom = arr.decimal_int[cache.length - 1];
            } else {
                obj.conf.minus = true;
                cache = dec_val.slice(1, dec_val.indexOf(','));
                obj.int = Number(cache);
                cache = dec_val.slice(dec_val.indexOf(',') + 1);
                obj.num = Number(cache);
                obj.denom = arr.decimal_int[cache.length - 1];
            }
        }


        if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == false && obj.conf.minus == false) {
            obj.html[0] = ' <sup>' + obj.int + '</sup>  ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == true && obj.conf.minus == false) {
            obj.html[0] = ' <sup>' + obj.int + '</sup><sup><sup style="font-size: 45%">' + obj.exp + '</sup></sup> ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == false && obj.conf.minus == true) {
            obj.html[0] = ' <sup>' + obj.int * -1 + '</sup> ';
            obj.html[1] = ' (<sup>' + obj.int * -1 + '</sup>) ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == false && obj.conf.degree == true && obj.conf.minus == true) {
            obj.html[0] = ' (<sup>' + obj.int * -1 + '</sup>)<sup><sup style="font-size: 45%">' + obj.exp + '</sup></sup> ';
        }

        if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == false) {
            obj.html[0] = ' <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> ';
        }

        if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == false) {
            obj.html[0] = ' <sup style="font-size: 120%">(</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup> <sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup>';
        }

        if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == true) {
            obj.html[0] = ' <sup>-</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span>';
            obj.html[1] = ' <sup style="font-size: 120%">(</sup> <sup>-</sup><span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup> ';
        }

        if (obj.conf.whole == false && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == true) {
            obj.html[0] = ' <sup style="font-size: 120%">(</sup>  <sup>-</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == false) {
            obj.html[0] = ' <sup>' + obj.int + '</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span>';
            obj.html[1] = ' <span class="fraction"><sup>' + obj.denom * obj.int + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span>';
        }

        if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == false) {
            obj.html[0] = ' <sup style="font-size: 120%">(</sup> <sup>' + obj.int + '</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
            obj.html[1] = ' <sup style="font-size: 120%">(</sup><span class="fraction"><sup>' + obj.denom * obj.int + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == false && obj.conf.minus == true) {
            obj.html[0] = ' <sup>-' + obj.int + '</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span>';
            obj.html[1] = ' <sup style="font-size: 120%">(</sup> <sup>-' + obj.int + '</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup> ';
            obj.html[2] = ' <sup>-</sup> <span class="fraction"><sup>' + obj.denom * obj.int + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span>';
            obj.html[3] = ' <sup style="font-size: 120%">(</sup> <sup>-</sup> <span class="fraction"><sup>' + obj.denom * obj.int + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup> ';
        }

        if (obj.conf.whole == true && obj.conf.fraction == true && obj.conf.decimal == false && obj.conf.degree == true && obj.conf.minus == true) {
            obj.html[0] = ' <sup style="font-size: 120%">(</sup> <sup>-' + obj.int + '</sup> <span class="fraction"><sup>' + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
            obj.html[1] = ' <sup style="font-size: 120%">(</sup> <sup>-</sup> <span class="fraction"><sup>' + obj.denom * obj.int + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> <sup style="font-size: 120%">)</sup><sup><sup><sup style="font-size: 55%">' + obj.exp + '</sup></sup></sup> ';
        }

        if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == false && obj.conf.minus == false) {
            obj.html[0] = ' <sup>' + $M.decimal(obj.int * obj.denom + obj.num, obj.denom) + '</sup> ';
            obj.html[1] = ' <span class="fraction"><sup>' + obj.int * obj.denom + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> ';
        }

        if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == true && obj.conf.minus == false) {
            obj.html[0] = ' <sup>' + $M.decimal(obj.int * obj.denom + obj.num, obj.denom) + '</sup><sup><sup style="font-size: 45%">' + obj.exp + '</sup></sup> ';
            obj.html[1] = ' <span class="fraction"><sup>' + obj.int * obj.denom + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span><sup style="font-size: 45%">' + obj.exp + '</sup></sup> ';
        }

        if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == false && obj.conf.minus == true) {
            obj.html[0] = ' <sup>-</sup>' + $M.decimal(obj.int * obj.denom + obj.num, obj.denom) + ' ';
            obj.html[1] = ' (<sup>-</sup>' + $M.decimal(obj.int * obj.denom + obj.num, obj.denom) + ') ';
            obj.html[2] = ' <sup>-</sup><span class="fraction"><sup>' + obj.int * obj.denom + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span> ';
            obj.html[3] = ' (<sup>-</sup><span class="fraction"><sup>' + obj.int * obj.denom + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span>) ';
        }

        if (obj.conf.fraction == true && obj.conf.decimal == true && obj.conf.degree == true && obj.conf.minus == true) {
            obj.html[0] = ' (<sup>-</sup>' + $M.decimal(obj.int * obj.denom + obj.num, obj.denom) + ')<sup><sup style="font-size: 45%">' + obj.exp + '</sup></sup> ';
            obj.html[1] = ' (<sup>-</sup><span class="fraction"><sup>' + obj.int * obj.denom + obj.num + '</sup><hr><sub>' + obj.denom + '</sub></span>)<sup><sup style="font-size: 45%">' + obj.exp + '</sup></sup> ';
        }

        return obj;
    },
    calcNumbers: function(n1, n2, calc_code, decimal) {
        var obj = {
            int: 0,
            num: 0,
            denom: 0,
            exp: 0,
            conf: {
                whole: null,
                fraction: null,
                decimal: null,
                degree: null,
                minus: null
            },
            html: []
        };
        var num1 = {
            int: n1.int,
            num: n1.num,
            denom: n1.denom,
            exp: n1.exp,
            conf: {
                whole: n1.conf.whole,
                fraction: n1.conf.fraction,
                decimal: n1.conf.decimal,
                degree: n1.conf.degree,
                minus: n1.conf.minus
            },
            html: n1.html
        };
        var num2 = {
            int: n2.int,
            num: n2.num,
            denom: n2.denom,
            exp: n2.exp,
            conf: {
                whole: n2.conf.whole,
                fraction: n2.conf.fraction,
                decimal: n2.conf.decimal,
                degree: n2.conf.degree,
                minus: n2.conf.minus
            },
            html: n2.html
        };
        var cache = null;
        var cache2 = null;

        if (num1.conf.minus == true) {
            if (num1.exp % 2 == 0) { num1.conf.minus == false; } else { num1.conf.minus == true; }
        }
        if (num2.conf.minus == true) {
            if (num2.exp % 2 == 0) { num2.conf.minus == false; } else { num2.conf.minus == true; }
        }

        cache = num1.denom * num1.int + num1.num;
        num1.int = 0;
        num1.num = cache;
        cache = num2.denom * num2.int + num2.num;
        num2.int = 0;
        num2.num = cache;

        cache = Math.pow(num1.num, num1.exp);
        num1.num = cache;
        cache = Math.pow(num1.denom, num1.exp);
        num1.denom = cache;
        cache = Math.pow(num2.num, num2.exp);
        num2.num = cache;
        cache = Math.pow(num2.denom, num2.exp);
        num2.denom = cache;

        switch (calc_code) {
            case 0:
                if (num1.conf.minus != num2.conf.minus) {
                    if (num1.conf.minus == true) {
                        obj = '<';
                    } else {
                        obj = '>';
                    }
                } else {
                    if (num1.conf.minus == false && num2.conf.minus == false) {
                        if (num1.num * num2.denom - num2.num * num1.denom == 0) {
                            obj = '=';
                            break;
                        }
                        if (num1.num * num2.denom - num2.num * num1.denom > 0) {
                            obj = '>';
                            break;
                        }
                        if (num1.num * num2.denom - num2.num * num1.denom < 0) {
                            obj = '<';
                            break;
                        }
                    }
                    if (num1.conf.minus == true && num2.conf.minus == true) {
                        if (num1.num * num2.denom - num2.num * num1.denom == 0) {
                            obj = '=';
                            break;
                        }
                        if (num1.num * num2.denom - num2.num * num1.denom > 0) {
                            obj = '<';
                            break;
                        }
                        if (num1.num * num2.denom - num2.num * num1.denom < 0) {
                            obj = '>';
                            break;
                        }
                    }
                }
                break;
            case 1:
                if (num1.conf.minus != num2.conf.minus) {
                    if (num1.num * num2.denom - num2.num * num1.denom == 0) {
                        obj.conf.minus = false;
                        obj.num = 0;
                        obj.denom = num1.denom * num2.denom;
                        break;
                    }
                    if (num1.num * num2.denom - num2.num * num1.denom > 0) {
                        obj.conf.minus = num1.conf.minus;
                        obj.num = num1.num * num2.denom - num2.num * num1.denom;
                        obj.denom = num1.denom * num2.denom;
                        break;
                    }
                    if (num1.num * num2.denom - num2.num * num1.denom < 0) {
                        obj.conf.minus = num2.conf.minus;
                        obj.num = num2.num * num1.denom - num1.num * num2.denom;
                        obj.denom = num1.denom * num2.denom;
                        break;
                    }
                } else {
                    if (num1.conf.minus == false && num2.conf.minus == false) {
                        obj.conf.minus = false;
                        obj.num = num1.num * num2.denom + num2.num * num1.denom;
                        obj.denom = num1.denom * num2.denom;
                        break;
                    }
                    if (num1.conf.minus == true && num2.conf.minus == true) {
                        obj.conf.minus = true;
                        obj.num = num1.num * num2.denom + num2.num * num1.denom;
                        obj.denom = num1.denom * num2.denom;
                        break;
                    }
                }
                break;
            case 2:
                if (num1.conf.minus != num2.conf.minus) {
                    obj.conf.minus = true;
                    obj.num = num1.num * num2.num;
                    obj.denom = num1.denom * num2.denom;
                } else {
                    obj.conf.minus = false;
                    obj.num = num1.num * num2.num;
                    obj.denom = num1.denom * num2.denom;
                }
                break;
            case 3:
                if (num1.conf.minus != num2.conf.minus) {
                    obj.conf.minus = true;
                    obj.num = num1.num * num2.denom;
                    obj.denom = num1.denom * num2.num;
                } else {
                    obj.conf.minus = false;
                    obj.num = num1.num * num2.denom;
                    obj.denom = num1.denom * num2.num;
                }
                break;
        }

        if (calc_code != 0) {
            obj.conf.degree = false;
            obj.exp = 1;

            cache = $M.nod([obj.num, obj.denom]);
            cache2 = obj.num / cache;
            obj.num = cache2;
            cache2 = obj.denom / cache;
            obj.denom = cache2;

            if (obj.denom == 1) {
                obj.conf.fraction = false;
                obj.conf.whole = true;
                obj.int = obj.num;
                obj.num = 0;
            } else if (obj.num >= obj.denom) {
                if (obj.num % obj.denom == 0) {
                    obj.conf.fraction = false;
                    obj.conf.whole = true;
                    obj.int = obj.num / obj.denom;
                    obj.num = 0;
                    obj.denom = 1;
                } else {
                    obj.conf.fraction = true;
                    obj.conf.whole = true;
                    obj.int = Math.floor(obj.num / obj.denom);
                    cache2 = obj.num - obj.int * obj.denom;
                    obj.num = cache2;
                    if (decimal == true) {
                        cache = $M.getSimpleNumbers(obj.denom);
                        cache2 = true;
                        for (var i = 0; i < cache.length; i++) {
                            if (arr.simple_int.indexOf(cache[i]) != -1 && cache[i] != 2 && cache[i] != 5) {
                                cache2 = false;
                                break;
                            }
                        }
                        if (cache2 == true) {
                            for (var i = 0; i < arr.decimal_int.length; i++) {
                                if (arr.decimal_int[i] % obj.denom == 0) {
                                    cache = obj.num * arr.decimal_int[i] / obj.denom;
                                    obj.num = cache;
                                    obj.denom = arr.decimal_int[i];
                                    break;
                                }
                            }
                        }
                        if (arr.decimal_int.indexOf(obj.denom) != -1) {
                            obj.conf.decimal = true;
                        } else {
                            obj.conf.decimal = false;
                        }
                    } else { obj.conf.decimal = false; }
                }
            } else {
                obj.conf.fraction = true;
                obj.conf.whole = false;
                obj.int = 0;
            }
        }

        return obj;
    },
    typeset: function(){
      MathJax.typesetClear();
      MathJax.typesetPromise();
    }
};
