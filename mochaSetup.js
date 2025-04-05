/* global global */
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM(`<body></body>`);

global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = jsdom.window.MouseEvent;
global.Node = jsdom.window.Node;
global.location = jsdom.window.location;

// Переопределяем методы history для тестов
jsdom.window.history.pushState = function () {
  // Пустая реализация для тестов
};

jsdom.window.history.back = function () {
  // Пустая реализация для тестов
};

jsdom.window.history.forward = function () {
  // Пустая реализация для тестов
};
