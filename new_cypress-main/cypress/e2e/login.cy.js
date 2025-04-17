import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зашел на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восстановить пароль 
    });

    afterEach('Конец теста', function () {
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
        cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден для пользователя
    });

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); // Ввел верный логин
         cy.get(main_page.password).type(data.password); // Ввел верный пароль
         cy.get(main_page.login_button).click(); // Нажал кнопку "Войти"
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
     })

     it('Проверка логики восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажал восстановить пароль
        cy.get(recovery_password_page.email).type(data.login); // Ввел верный логин (почту) для восстановления
        cy.get(recovery_password_page.send_button).click(); // Нажал отправить код
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю на совпадение текста
    })

    it('Верный логин и НЕверный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввел верный логин
        cy.get(main_page.password).type('iLoveqastudio'); // Ввел НЕверный пароль
        cy.get(main_page.login_button).click(); // Нажал на кнопку "Войти"
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после нажатия кнопки "Войти" вижу текст
    })

    it('НЕверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german1@dolnikov.ru'); // Ввел НЕверный логин
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал на кнопку "Войти"
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после нажатия кнопки "Войти" вижу текст
    })

    it('Если в логине нет @, то получаем ошибку валидации', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввел логин без @ 
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал на кнопку "Войти"
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что после нажатия кнопки "Войти" вижу текст
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввел логин с заглавными буквами
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал на кнопку "Войти"
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
    })
})