'use strict';

var phoneBook = []; 

function checkEmail(email) {
 var parts = email.split('@');
 
 if (parts.length !== 2)
  return false;
 
 if (parts[1].indexOf('.') === -1)
  return false;
 
  return true;
}

function checkPhone(phone) {
    if (phone.length !== 10)
        return false;
 
    return true;
}

function checkName(name) {
  name = name.replace(/ /g, '');

  return name.length > 0;
}

function getClearPhone(phone) {
    phone = phone.replace(/^\+/, '');
    phone = phone.replace(/^7/, '');
    phone = phone.replace(/[^0-9]/g, '');
 
    return phone;
}

function checkValidForms(name, phone, email){

  return checkName(name) && checkPhone(phone) && checkEmail(email);
}

function findInArray(array, query, onlyIndex){
 var resultArray = [];

 array.forEach(function(person, index){
   if (person.name.indexOf(query) !== -1 ||
       person.email.indexOf(query) !== -1 ||
       person.phone.indexOf(query) !== -1) {
       resultArray.push(onlyIndex ? index : person);
   }
 });
 
 return resultArray;
}

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
  var clearPhone = getClearPhone(phone);
  if (checkValidForms(name, clearPhone, email)) {  
    var person = {
      name: name,
      phone: clearPhone,
      email: email
    };
    phoneBook.push(person);
    
    console.log("%s %s %s", 'Контакт', name,'добавлен');

    return person;
  } else {
    console.log('Вы неправильно ввели данные :(');

    return false;
  }

};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
  console.log("start find");
  var foundRes = [];

  if (!query) {
    foundRes = phoneBook;
  } else {
    foundRes = findInArray(phoneBook, query);
  }

  foundRes.forEach(function(person){
    console.log("%s, %s, %s", person.name, person.phone, person.email);
  } )

  return foundRes;
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
  console.log('start delete');
  var countDelete = 0;
  var deleteElements = findInArray(phoneBook, query, true);
  deleteElements.forEach(function(index){
    phoneBook.splice(index, 1); 
    countDelete++;
  }) 
  console.log("%s %d %s",'Удален(о)', countDelete, 'Контакт(а)');  
  return countDelete;     
};
