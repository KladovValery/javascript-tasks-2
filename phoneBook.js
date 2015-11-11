'use strict';

var phoneBook = [];

function isEmailValid(email) {
    return email && typeof email === 'string' &&
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
    
}

function isPhoneValid(phone) {
    return phone && typeof phone === 'string' &&
    /^\+\d{1,2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phone);
}

function isNameValid(name) {
    return (name && typeof name === 'string');
}

function getClearPhone(phone) {
    return phone 
        .replace(/^\+/, '')
        .replace(/[^0-9]/g, '');
}

function checkValidForms(name, phone, email){
    return isNameValid(name) && isPhoneValid(phone) && isEmailValid(email);
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
    console.log('add');
    var clearedPhone = getClearPhone(phone);
    if (checkValidForms(name, clearedPhone, email)) {  
        var person = {
            name: name,
            phone: clearedPhone,
            email: email
        };
        phoneBook.push(person);
    
        console.log("%s %s %s", 'Контакт', name,'добавлен');

        return person;
    } 
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    console.log("start find");
    var foundRes = [];

    var foundRes = query ? findInArray(phoneBook, query) : phoneBook;

    foundRes.forEach(function(person){
        console.log("%s, %s, %s", person.name, person.phone, person.email);
    });

    return foundRes;
};
/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    console.log('start delete');
    //var countDelete = 0;
    var deleteElements = findInArray(phoneBook, query);
    var newPhoneBook = phoneBook.filter(function (person) {

        return (!(deleteElements.indexOf(person)));
    });
    console.log("%s %d %s",'Удален(о)', deleteElements.length, 'Контакт(а)');
    return deleteElements.length;    
};
