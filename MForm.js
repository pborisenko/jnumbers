/*
Autor: Petr Borisenko [borisenko.petr.a@gmail.com]
MForm - класс объекта отображения числа.
*/
class MForm{
  /*
  Конструктор объекта.
  */
  constructor(){
    /* Form variants:
         expression - числовое выражение
         decimal - десятичное значение
         fraction - правильная дробь
         improper-fraction - неправильная дробь
         mixed - смешанное число
    */
    this.variant = 'undefined';     //вариант формы
    this.html = 'undefined';        //html-код формы
  };
};
