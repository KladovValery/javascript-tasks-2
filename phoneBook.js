'use strict';

var phoneBook = {}; 

phoneBook.add('Сергей', '7 999 6667778', 'gs@example.com');

function checkMail(mail){ //  проверка на валидность почты
  var exampleMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-я0-9_-]+(\.[a-я0-9_-]+)*\.[a-я]{2,6}$/;
  return exampleMail.test(mail);
}

function checkPhone(phone){ //  проверка на валидность телефона
  var examplePhone = /^((((\(\d{3}\))|(\d{3}-))\d{3}-\d{4})|(\+?\d{1,3}((-| |\.)(\(\d{1,4}\)(-| |\.|^)?)?\d{1,8}){1,5}))(( )?(x|ext)\d{1,5}){0,1}$/;
  return examplePhone.test(phone);
}

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
  if (checkPhone(phone) && checkMail(email)){
    var person = {
      name: name,
      phone: phone,
      email: email
    };
    phoneBook.push(person);
    return true;
  }
  else return false;
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
  var foundRes = [];
  if (!query){
    for (var i = 0; i < phoneBook.length; i++)
      console.log("%s,%s,%s", phoneBook[i].name, phoneBook[i].phone, phoneBook[i].email);
  }
  else {
    for (var i = 0; i < phoneBook.length; i++){
      if (phoneBook[i].name.indexOf(query) != -1 || 
          phoneBook.phone.indexOf(query) != -1 || 
          phoneBook.email.indexOf(query) != -1) {  
      console.log("%s,%s,%s", phoneBook[i].name, phoneBook[i].phone, phoneBook[i].email);
      foundRes.push(i);
    }
  }
  }
  return foundRes;
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
  var deleteElements = module.exports.find(query);
  for (var i = 0; i < deleteElements.length; i++)
    phoneBook.splice(deleteElements[i], 1);      
};
