import { PlaceErrorMessages } from '../components/shapes/PlaceErrors.js'
import messages from '../messages.js'

export const captions = {
  "user": { "name": "Guest" },
  "about": {
    "name": "Автор: Тахмазов Борис",
    "email": "tboris1983@gmail.com"
  },
  "buttons": {
    "cancel": "Отмена",
    "logout": "Выход",
    "login": "Войти",
    "signup": "Создать аккаунт",
  },
  "serverMessages": {
    [messages.NO_ERROR]: "",
    [messages.ACTIVATION_SUCCEED]: "Активация прошла успешно",
    [messages.EMAIL_SEND_ERROR]: "Ошибка при отправке e-mail",
    [messages.INVALID_ACTIVATION_CODE]: "Неверный код активации",
    [messages.INVALID_EMAIL]: "E-mail неверного формата",
    [messages.INVALID_NAME]: "Имя содержит некорректные символы или слишком короткое",
    [messages.INVALID_PASSWORD]: "Пароль содержит некорректные символы или слишком короткий",
    [messages.INVALID_USER_DATA]: "Неправильные имя, e-mail или пароль",
    [messages.LOGIN_SUCCEED]: "Вход выполнен",
    [messages.NO_ACTIVATED]: "Пользователь не активирован",
    [messages.PASSWORDS_NOT_MATCH]: "Пароли не совпадают",
    [messages.REG_SUCCEED]: "Регистрация прошла успешно. Введите код активации из полученного e-mail",
    [messages.SERVER_ERROR]: "Ошибка сервера",
    [messages.USER_EMAIL_ALLOWED]: "E-mail свободен",
    [messages.USER_EMAIL_EXIST]: "E-mail уже зарегистрирован",
    [messages.USER_NAME_ALLOWED]: "Имя свободно",
    [messages.USER_NAME_EXIST]: "Имя уже зарегистрировано",
    [messages.USER_EMAIL_NOT_EXIST]: "E-mail не существует"
  },
  "registerForm": {
    "title": "Регистрация",
    "name": "Имя (мин. 4 символа)",
    "email": "E-Mail",
    "password": "Пароль (мин. 6 символов)",
    "passwordAgain": "Пароль повторно",
    "login": "Вход",
    "cancel": "Отмена",
    "showPass": "Показать пароль",
    "checkName": "Проверить имя",
    "checkEmail": "Проверить e-mail"
  },
  "loginForm": {
    "title": "Вход",
    "name": "Имя или E-mail",
    "password": "Пароль",
    "showPass": "Показать пароль",
    "cancel": "Отмена",
    "register": "Регистрация",
    "remember": "Запомнить"
  },
  "activation": {
    "title": "Активация",
    "placeholder": "Введите код активации"
  },
  "toolbars": {
    "hide": "Свернуть",
    "unhide": "Развернуть",
    "project": {
      "title": "Проект",
      "new": "Новый проект",
      "open": "Открыть проект",
      "save": "Сохранить проект",
      "disabled": "",
      "-disabled": " (недоступно для неавторизованных пользователей)",
    },
    "info": {},
    "property": {
    },
    "settings": {
      "title": "Настройки",
    },
    "statusbar": {
      "move": "двигать рабочее поле",
      "scale": "масштаб",
      "rotate": "развернуть деталь",
      "snap": "привязка вкл/выкл",
      "stopmeasure": "выход из режима измерения",
      "pick1": "выберите 1-ю точку прямоугольника внутри раскладки",
      "pick2": "выберите 2-ю точку прямоугольника внутри раскладки"
    },
  },
  "title": "",
  "messages": {
    "delete": "Удалить выбранные объекты?"
  },
  "selection": {
    "crossSelect": "Partial selection",
    "fullSelect": "Full selection",
    "selectedVertexes": {
      "of": "of",
      "selected": "Points selected"
    }
  },
  "showGrid": "Show grid",
  "propBar": "Properties",
  "noPanelsSelected": "Нет выделенных деталей",
  "NPanelsSelected": " panels selected",
  "deleteButton": "Delete",
  "help": {
    "title": "Справка",
    "hotKeys": [
      { "key": "ESC", "desc": "Отмена операции" },
      { "key": "Delete", "desc": "Удалить выбранные детали" },
      { "key": "Колесико мыши", "desc": "Масштаб +/-" },
      { "key": "Средняя кнопка мыши", "desc": "Двигать рабочее поле" },
    ]
  }
}
