Вводи в консоли

document.body.innerHTML = '<div width=100px>'+$M.getNumber('xx-yy','aa-bb','cc-dd','ee-ff','jj-hh',0).html+'</div>'

xx-yy это диапазон генерируемых значений 1-10, 5-25, 0-100
так же может принемать значение 0 значит отсутсвует параметр

xx-yy диапзаон для целого числа
aa-bb диапазон для числителя
cc-dd диапазон для знаменателя
ee-ff диапазон для степени
jj-hh диапазон для десятичного знаменателя
0/1 положительное/отрицательное значение

$M.getNumber() вывод числа на экран
$M.setNumber() ввод числа в память
$M.enterNumber() форма для ввода числа
$M.calcNumber() действия с двумя числами
