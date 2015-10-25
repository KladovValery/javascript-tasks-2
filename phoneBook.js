'use strict';

var phoneBook = [];

function checkEmail(email) {
    var parts = email.split('@');
 
    if (parts.length !== 2) {
        return false;
      }

    return parts[1].indexOf('.') !== -1;
}

function checkPhone(phone) {
    return phone.length === 10;
}

function checkName(name) {
    name = name.replace(/ /g, '');

    return name.length > 0;
}

function getClearPhone(phone) {
    return phone 
        .replace(/^\+/, '')
        .replace(/^7/, '')
        .replace(/[^0-9]/g, '');
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
function inArray(value, array) {
    for(var i = 0; i < array.length; i++) {
        if(array[i] == value) {

         return true;
        }
    }

    return false;
}
module.exports.remove = function remove(query) {
    console.log('start delete');
    //var countDelete = 0;
    var deleteElements = findInArray(phoneBook, query);
    var NewPhoneBook = phoneBook.filter(function (person) {

        return (!(inArray(person, deleteElements)));
    });
    console.log("%s %d %s",'Удален(о)', deleteElements.length, 'Контакт(а)');
    return deleteElements.length;    
};
