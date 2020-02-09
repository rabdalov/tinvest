# Tinvest

## Отблагодарить автора
https://www.tinkoff.ru/sl/9OxmTtm3nik


## Что умеет?
__Расширение может некорректно работать с ИИС__
- earningswhispers
  - нумерация компаний
  - возможность скрыть бумаги не из Тинькофф
  - рядом со временем по США, показывает время по МСК.
  - выводит график за текущий год при наведении на тикер
  - подсветка тикеров доступных в Тине
  - графики на EW со Stockcharts
- simplywall.st
  - подсветка тикеров доступных в Тине на странице скринера
- finviz
  - подсветка тикеров доступных в Тине на странице скринера
- терминал Tinkoff
  - в выпадающем списке тикеров, по enter выбирается первая
- сайт Tinkoff
 - список бумаг на главной стал компактнее и с визуальным разделением
  - на странице акции, под заголовком выводится реальный доход (с учетом прошлых сделок, дивидендов и комиссий)
  - фон подкрашивается в зеленовый или красноватый в зависимости от доходности бумаги
  - подсчет насколько должна подорожать бумага для выхода в ноль
  - экспорт портфеля в CSV
  - экспорт всех сделок в CSV
  - таблица с информацией какие акции и за сколько, которые вы покупали, у вас остались сейчас(из-за принципа FIFO, продается акции купленные раньше и вы можете фиксировать убыток, считая наоборот)
  - переход на страницу терминала Тинькофф без промежуточной

[<img width="640" alt="ew" src="https://raw.githubusercontent.com/DaaGER/tinvest/master/_images/ew.png">](https://raw.githubusercontent.com/DaaGER/tinvest/master/_images/ew.png)
[<img width="640" alt="fv" src="https://raw.githubusercontent.com/DaaGER/tinvest/master/_images/fv.png">](https://raw.githubusercontent.com/DaaGER/tinvest/master/_images/fv.png)
[<img width="640" alt="ew" src="https://raw.githubusercontent.com/DaaGER/tinvest/master/_images/tin1.png">](https://raw.githubusercontent.com/DaaGER/tinvest/master/_images/tin1.png)
[<img width="640" alt="ew" src="https://raw.githubusercontent.com/DaaGER/tinvest/master/_images/tin2.png">](https://raw.githubusercontent.com/DaaGER/tinvest/master/_images/tin2.png)
[<img width="640" alt="sws" src="https://raw.githubusercontent.com/DaaGER/tinvest/master/_images/sws.png">](https://raw.githubusercontent.com/DaaGER/tinvest/master/_images/sws.png)

## Как установить?
1. скачать https://github.com/DaaGER/tinvest/archive/master.zip
2. распаковать
3. перейти в chrome://extensions/ или меню->дополнительные инструменты->расширения
4. справа включить "режим разработчика"
5. слева выбрать "загрузить распакованное расширение"
6. выбрать папку extension
7. вы прекрасны

## Как обновить?
1. скачать https://github.com/DaaGER/tinvest/archive/master.zip
2. распаковать
3. перейти в chrome://extensions/ или меню->дополнительные инструменты->расширения
4. в блоке расшрения будет кнопка "обновить"(стрелка)

## Почему не полноценное расширение из магазина Google?
Они проверяют __очень__ медленно. Но главное это то, что можно самому глазками посмотреть код и не бояться автообновления с вредоносным кодом.

## Roadmap
- получение всех доступных тикеров и кэширование их
- кэширование доступных счетов
- дивидендный календарь
- ссылки на https://ru.tradingview.com/chart?symbol=AMD
- рефакторинг: вынос css во внешние файлы
- настройки расширения: откуда брать графики, обновление тикеров вручную
- получение всех бумаг, которыми торговали+историческая доходность
- рефакторинг: вынос функций в подфайлы, сборки с помощью npm
- индикатор "можешь получить квала"

## Контакты
tinvest@daager.ru

## Мужик, почему код такой ужасный?
Всё это компилирование различных сниппетов и пока может расцениваться, как MVP.


## Отблагодарить автора, если этого не сделали
https://www.tinkoff.ru/sl/9OxmTtm3nik


https://chrome.google.com/webstore/detail/tinvest/falfbeockhpemaahbiafjphboeccldbf
