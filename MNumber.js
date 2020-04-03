/*
Autor: Petr Borisenko [borisenko.petr.a@gmail.com]
MNumber - класс объекта числа.
*/
class MNumber{
  /*
  Конструктор объекта.
  */
  constructor(){
    this.integer = 0;                 //целая часть
    this.numerator = 0;               //числитель
    this.denominator = 1;             //знаменатель
    this.exponent =  1;               //показатель степени
    this.attribute = new MAttribute;  //колелкция свойств
    this.form = [new MForm];          //коллекция отображений
  };
  set(int, num, denom, exp){
    try {
      if(Number.isInteger(int) == true &&
          Number.isInteger(num) == true &&
          Number.isInteger(denom) == true &&
          Number.isInteger(exp) == true){
        this.int = int;
        this.num = num;
        this.denom = denom;
        this.exp = exp;
        this.build();
      }else{
        throw new Error("variables must be of type Integer.");
      }
    } catch (e) {
        console.log(e);
    }
  };
  gen(range_int, range_num, range_denom, range_exp){};
  simply(obj){
    try {
      if ($M.isNumber(obj) == true){
        var cache = $M.nod([obj.num, obj.denom]);
        var cache2 = obj.num / cache;
        this.num = cache2;
        cache2 = obj.denom / cache;
        this.denom = cache2;
      }else{
        throw new TypeError("variables must be of type MNumber.");
      }
    } catch (e) {
      console.log(e);
    }
  };
  compare(obj1, obj2){
    try {
      if ($M.isNumber(obj1) == true && $M.isNumber(obj2) == true){
        if (obj1.attribute.negative != obj2.attribute.negative) {
            if (obj1.attribute.negative == true) {
                return '<';
            } else {
                return '>';
            }
        } else {
            if (obj1.attribute.negative == false && obj2.attribute.negative == false) {
                if (obj1.num * obj2.denom - obj2.num * obj1.denom == 0) {
                    return '=';
                }
                if (obj1.num * obj2.denom - obj2.num * obj1.denom > 0) {
                    return '>';
                }
                if (obj1.num * obj2.denom - obj2.num * obj1.denom < 0) {
                    return '<';
                }
            }
            if (obj1.attribute.negative == true && obj2.attribute.negative == true) {
                if (obj1.num * obj2.denom - obj2.num * obj1.denom == 0) {
                    return '=';
                }
                if (obj1.num * obj2.denom - obj2.num * obj1.denom > 0) {
                    return '<';
                }
                if (obj1.num * obj2.denom - obj2.num * obj1.denom < 0) {
                    return '>';
                }
            }
        }
      }else{
        throw new TypeError("variables must be of type MNumber.");
      }
    } catch (e) {
        console.log(e);
    }
  };
  sum(obj1, obj2){
    try {
      if ($M.isNumber(obj1) == true && $M.isNumber(obj2) == true){
        if (obj1.attribute.negative != obj2.attribute.negative) {
            if (obj1.num * obj2.denom - obj2.num * obj1.denom == 0) {
                this.attribute.negative = false;
                this.num = 0;
                this.denom = obj1.denom * obj2.denom;
            }
            if (obj1.num * obj2.denom - obj2.num * obj1.denom > 0) {
                this.attribute.negative = obj1.attribute.negative;
                this.num = obj1.num * obj2.denom - obj2.num * obj1.denom;
                this.denom = obj1.denom * obj2.denom;
            }
            if (obj1.num * obj2.denom - obj2.num * obj1.denom < 0) {
                this.attribute.negative = obj2.attribute.negative;
                this.num = obj2.num * obj1.denom - obj1.num * obj2.denom;
                this.denom = obj1.denom * obj2.denom;
            }
        } else {
            if (obj1.attribute.negative == false && obj2.attribute.negative == false) {
                this.attribute.negative = false;
                this.num = obj1.num * obj2.denom + obj2.num * obj1.denom;
                this.denom = obj1.denom * obj2.denom;
            }
            if (obj1.attribute.negative == true && obj2.attribute.negative == true) {
                this.attribute.negative = true;
                this.num = obj1.num * obj2.denom + obj2.num * obj1.denom;
                this.denom = obj1.denom * obj2.denom;
            }
        }
      }else{
        throw new TypeError("variables must be of type MNumber.");
      }
    } catch (e) {
        console.log(e);
    }
  };
  product(obj1, obj2){
    try {
      if ($M.isNumber(obj1) == true && $M.isNumber(obj2) == true){
        if (obj1.attribute.negative != obj2.attribute.negative) {
            this.conf.minus = true;
            this.num = obj1.num * obj2.num;
            this.denom = obj1.denom * obj2.denom;
        } else {
            this.attribute.negative = false;
            this.num = obj1.num * obj2.num;
            this.denom = obj1.denom * obj2.denom;
        }
      }else{
        throw new TypeError("variables must be of type MNumber.");
      }
    } catch (e) {
        console.log(e);
    }
  };
  quot(obj1, obj2){
    try {
      if ($M.isNumber(obj1) == true && $M.isNumber(obj2) == true){
        if (obj1.attribute.negative != obj2.attribute.negative) {
            this.attribute.negative = true;
            this.num = obj1.num * obj2.denom;
            this.denom = obj1.denom * obj2.num;
        } else {
            this.attribute.negative = false;
            this.num = obj1.num * obj2.denom;
            this.denom = obj1.denom * obj2.num;
        }
      }else{
        throw new TypeError("variables must be of type MNumber.");
      }
    } catch (e) {

    }
  };
  // exponent(obj1, obj2){
  //   try {
  //     if ($M.isNumber(obj1) == true && $M.isNumber(obj2) == true){
  //
  //       }
  //     }else{
  //       throw new TypeError("variables must be of type MNumber.");
  //     }
  //   } catch (e) {
  //      console.log(e);
  //   }
  // };
  build(){
    this.attribute.degree = false;
    this.exp = 1;
    var cache = $M.nod([this.num, this.denom]);
    var cache2 = this.num / cache;
    this.num = cache2;
    cache2 = this.denom / cache;
    this.denom = cache2;

    if (this.denom == 1) {
        this.attribute.fraction = false;
        this.attribute.whole = true;
        this.int = this.num;
        this.num = 0;
    } else if (this.num >= this.denom) {
        if (this.num % this.denom == 0) {
            this.attribute.fraction = false;
            this.attribute.whole = true;
            this.int = this.num / this.denom;
            this.num = 0;
            this.denom = 1;
        } else {
            this.attribute.fraction = true;
            this.attribute.whole = true;
            this.int = Math.floor(this.num / this.denom);
            cache2 = this.num - this.int * this.denom;
            this.num = cache2;
            if ($M.isDecimal(this.denom) == true) {
                cache = $M.getSimpleNumbers(this.denom);
                cache2 = true;
                for (var i = 0; i < cache.length; i++) {
                    if (arr.simple_int.indexOf(cache[i]) != -1 && cache[i] != 2 && cache[i] != 5) {
                        cache2 = false;
                    }
                }
                if (cache2 == true) {
                    for (var i = 0; i < arr.decimal_int.length; i++) {
                        if (arr.decimal_int[i] % this.denom == 0) {
                            cache = this.num * arr.decimal_int[i] / this.denom;
                            this.num = cache;
                            this.denom = arr.decimal_int[i];
                        }
                    }
                }
                if (arr.decimal_int.indexOf(this.denom) != -1) {
                    this.attribute.decimal = true;
                } else {
                    this.attribute.decimal = false;
                }
            } else { this.attribute.decimal = false; }
        }
    } else {
        this.attribute.fraction = true;
        this.attribute.whole = false;
        this.int = 0;
    }
  }
};
