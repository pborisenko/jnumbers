/*
Autor: Petr Borisenko [borisenko.petr.a@gmail.com]
MAttribute - класс объекта свойств числа.
*/
class MAttribute{
  /*
  Конструктор объекта.
  */
  constructor(){
    this.whole = true;                //целое число
    this.fraction = false;            //правильная дробь
    this.improper_fraction = true;    //неправильная дробь
    this.decimal = false;             //десятичное значение
    this.negative = false;            //отрицательное значение
    this.reducible = false;           //сократимая дробь
    this.base = true;                 //основание степени
    this.exponent = false;            //показатель степени
  };
};
