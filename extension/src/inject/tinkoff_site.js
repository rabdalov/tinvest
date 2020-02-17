function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function arr_combine_values(arr) {
    arr.push([])
    result = [];
    temp = ''
    temp_i = 0
    arr.forEach(function (item, k) {
        if (temp != item && k != 0) {
            result.push([temp, temp_i])
            temp_i = 1;
        } else {
            temp_i++
        }
        temp = item
    })
    return result;
}
//https://api.tinkoff.ru/trading/user/operations?sessionId=HpSlKjkaAaHUrhZshVxtkaEl7qgz6BPD.m1-prod-api27
//https://api.tinkoff.ru/trading/user/operations?sessionId=HpSlKjkaAaHUrhZshVxtkaEl7qgz6BPD.m1-prod-api27
//https://api.tinkoff.ru/trading/user/operations?tinvest&sessionId
async function getHistory(ticker) {
    //console.log(ticker);
    let data = {
        "ticker": ticker,
        "from": "2015-03-01T00:00:00Z",
        "to": new Date().toISOString(),
        "overnightsDisabled": true
    };
    if (!ticker) {
        console.log("ticker is null");
        //{"from":"2015-03-01T00:00:00Z","to":"2019-11-04T12:34:02Z","overnightsDisabled":true}
        let data = {
            "from": "2015-03-01T00:00:00Z",
            "to": new Date().toISOString(),
            "overnightsDisabled": true
        };
    }
    let s_id = getCookie('psid');
    let response = await fetch('https://api.tinkoff.ru/trading/user/operations?tinvest&sessionId=' + s_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}

async function getFullHistory() {
    //console.log(ticker);
    //{"from":"2015-03-01T00:00:00Z","to":"2019-11-04T12:34:02Z","overnightsDisabled":true}
    let data = {
        "from": "2015-03-01T00:00:00Z",
        "to": new Date().toISOString(),
        "overnightsDisabled": true
    };
    let s_id = getCookie('psid');
    let response = await fetch('https://api.tinkoff.ru/trading/user/operations?tinvest&sessionId=' + s_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Referer': 'https://www.tinkoff.ru/invest/broker_account/events/'
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}


async function getInfo(ticker) {
    let data = {
        "ticker": ticker,
    };

    let s_id = getCookie('psid')
    let response = await fetch(' https://api.tinkoff.ru/trading/symbols/user_info?tinvest&sessionId=' + s_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}

//TODO можно закэшировать
//https://api.tinkoff.ru/trading/user/broker_accounts?sessionId=HOoQEODghzxN8hu7ftTDXB7wxKnBNzRq.m1-prod-api17
async function getBrokerAccounts() {
    let s_id = getCookie('psid')
    let response = await fetch(' https://api.tinkoff.ru/trading/user/broker_accounts?tinvest&sessionId=' + s_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    return await response.json();
}


async function getPurchasedSecurities(accountname) {
    let data = {
        "stocksSort": "ByName",
        "stocksSortOrder": "Asc",
        "bondsSort": "ByName",
        "bondsSortOrder": "Asc",
        "etfsSort": "ByName",
        "etfsSortOrder": "Asc",
        "brokerAccountType": accountname,
        "currency": "RUB"
    };

    let s_id = getCookie('psid');
    let response = await fetch(' https://api.tinkoff.ru/trading/portfolio/purchased_securities?tinvest&sessionId=' + s_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    return await response.json();

}

async function getPrices(ticker) {
    let data = {
        "ticker": ticker,
    };

    let s_id = getCookie('psid')
    let response = await fetch(' https://api.tinkoff.ru/trading/stocks/price?tinvest&sessionId=' + s_id, {
        //https://api.tinkoff.ru/trading/stocks/price?sessionId=aFagzciaPpiEHv6qW7a69Lb9pHSODL2I.ds-prod-api13
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    //console.log(response);
    return await response.json();
}

async function needEarn(revenue, payload, current_ticker) {
    //console.log(payload);
    if (!payload) {
        info = await getInfo(current_ticker);
        payload = info.payload;
        //console.log('reloaded info');
    }
    if (payload.positionTinkoff) {
        count = payload.positionTinkoff.currentBalance;
        avg_price = payload.positionTinkoff.currentPrice.value;
        currency = payload.positionTinkoff.averagePositionPrice.currency;
        currentBalance = payload.positionTinkoff.currentBalance;
    } else {
        count = 0;
        avg_price = 0;
        currency = "";
        currentBalance = 0;
    }
    if (payload.positionTinkoffIis) {
        countIis = payload.positionTinkoffIis.currentBalance;
        avg_priceIis = payload.positionTinkoffIis.currentPrice.value;
        currency = payload.positionTinkoffIis.averagePositionPrice.currency;
        currentBalanceIis = payload.positionTinkoffIis.currentBalance;
    } else {
        countIis = 0;
        avg_priceIis = 0;
        currencyIis = "";
        currentBalanceIis = 0;
    }
    currentBalance += currentBalanceIis;
    if (currentBalance <= 0) {
        result = ""
    } else {
        if (currency == 'USD') {
            currency = '$'
        }
        if (currency == 'RUB') {
            currency = 'руб'
        }
        revenue = Math.abs(revenue);
        need_earn_money = revenue / (count + countIis);
        avg_price_fin = (avg_price * count + avg_priceIis * countIis) / (count + countIis);
        percent = avg_price_fin / 100;
        need_earn_percent = parseFloat(need_earn_money / percent).toFixed(2);
        result = parseFloat(avg_price_fin + need_earn_money).toFixed(2) + " (" + "+" + parseFloat(need_earn_money).toFixed(2) + " " + currency + " / " + need_earn_percent + "%)"
    }
    return result;
}

async function calc_real_revenue(payload, history_result, current_ticker) {
    result = 0;
    history_result_sum = 0;
    history_count = [];
    sells = [];
    buys = [];
    //console.log(payload);
    //current_ticker="MSFT";
    //current_ticker = payload.positionTinkoff.ticker;
    //history_result = await getHistory(current_ticker);
    //console.log(history_result);
    if (!payload) {
        info = await getInfo(current_ticker);
        payload = info.payload;
        //console.log('reloaded info');
    }
//    if (payload) {current_ticker = payload.positionTinkoff.ticker;};
    if (!history_result) {
        history_result = await getHistory(current_ticker);
        //console.log('reloaded history_result');
    }
    //console.log(history_result);
    if (history_result.status == "Ok") {
        //перебираем прошлые сделки
        history_result_sum = history_result.payload.items.reduce(function (sum, item) {
            if (item.status == 'done') {

                //подсчет количества акций по определенной цене
                if (typeof payload.positionTinkoff != "undefined") {
                    if (item.operationType == 'Sell') {
                        for (i = 0; i < item.quantity; i++) {
                            sells.push(item.price)
                        }
                    } else if (item.operationType == 'Buy') {
                        for (i = 0; i < item.quantity; i++) {
                            buys.push(item.price)
                        }
                    }
                }

                // console.log(item)
                return sum + item.payment + (item.commission || 0);
            }
            return sum;
        }, 0)

        //продолжение - подсчет количества акций по определенной цене
        if (typeof payload.positionTinkoff != "undefined") {
            sells = sells.reverse();
            buys = buys.reverse();
            if (buys.length > sells.length) {
                buy_bool = true;
                buys = buys.slice(sells.length)
                history_count = arr_combine_values(buys);
                sells = [];
            } else {
                sell_bool = true;
                sells = sells.slice(buys.length)
                history_count = arr_combine_values(sells);

                buys = [];
            }
        }

        result = Math.round(history_result_sum);
        //console.log("history_result_sum: "+result);
        if (payload.positionTinkoff) {
            result += payload.positionTinkoff.currentAmount.value //payload.positionTinkoffIis.currentAmount.value\t)
            //console.log("result :" + result);
        }
        if (payload.positionTinkoffIis) {
            result += payload.positionTinkoffIis.currentAmount.value //payload.positionTinkoffIis.currentAmount.value\t)
            //console.log("result IIS:" + result);
        }
        //result = parseFloat(result).toFixed(2);
    }

    return {revenue: result, history_count: history_count};
}

async function real_revenue() {

// current_ticker=Object.keys(data.investTrade.symbolUserInfo)[0];
    regex = /\(([A-Z\.]+)\):/m
    ticker_regexp = regex.exec(document.querySelector("meta[property='og:title']").content)
    //на странице есть тикер, значит скорее всего это страница акции
    //console.log(ticker_regexp);
    currency = "NA";
    real_revenue_value = 0;
    isCurrency = false;
    if (ticker_regexp !== null) {
        current_ticker = ticker_regexp[1];
        //console.log("Обнаружен Тикер: " + current_ticker);
        info = await getInfo(current_ticker);
        // console.log(info)
        current_price=0
        //console.log("Info: ");
        //currency='';
        if (info.payload.hasEvents) {
            real_revenue_value = 0;
            currentBalance = 0;
            real_revenue_object = await calc_real_revenue(info.payload, null, current_ticker);
            real_revenue_value = real_revenue_object.revenue
            if (info.payload.positionTinkoff) {
                current_price=info.payload.positionTinkoff.currentPrice.value
                isCurrency = (info.payload.positionTinkoff.securityType == 'Currency')
                currency = info.payload.positionTinkoff.currentAmount.currency.toString();
                if (!currency) {
                    console.log('currency not defined');
                }
                //console.log(currency);
                currentBalance = info.payload.positionTinkoff.currentBalance;
            }
            if (info.payload.positionTinkoffIis) {
                current_price=info.payload.positionTinkoffIis.currentPrice.value
                isCurrency = (info.payload.positionTinkoffIis.securityType == 'Currency')
                //real_revenue_value += await calc_real_revenue(info.payload.positionTinkoffIis);
                currency = info.payload.positionTinkoffIis.currentAmount.currency.toString();
                if (!currency) {
                    console.log('currency not defined in IIS');
                }
                //console.log(currency);
                currentBalance += info.payload.positionTinkoffIis.currentBalance;
            }
            if (!info.payload.positionTinkoff && !info.payload.positionTinkoffIis) {
                //console.log('нет акций на стоке');
                position = await getPrices(current_ticker);
                //currency=position.payload.close.currency.value;
                //console.log("position currency:");
                //console.log(position);
                currency = position.payload.close.currency;
                //console.log(currency);
            }
            //real_revenue_value=	real_revenue_value;
            if (!isCurrency) {
                if (currency == 'USD') {
                    currency = '$'
                }
                if (currency == 'RUB') {
                    currency = 'руб'
                }
                //cur_count=parseFloat(info.payload.positionTinkoff.currentBalance.value).toFixed(0);

                html = "<div class='tinvest-block'>";
                html += '<div><b class="real_revenue" title="Если продать всё и прямо сейчас">Реальная доходность : ' + parseFloat(real_revenue_value).toFixed(2) + ' ' + currency + '</b></div>';


                //html += '<div><b class="opened_position">Открытая позиция: ' + cur_count + '</b></div>';
                if (real_revenue_value < 0 && currentBalance > 0) {
                    need_earn = await needEarn(real_revenue_value, info.payload, current_ticker);
                    html += '<div><b class="need_earn">Выход в ноль при: ' + need_earn + '</b></div>';
                }
                html += "</div>"

                tinvest_block = document.querySelector("div.tinvest-block")
                //console.log(tinvest_block);
                if (tinvest_block) {
                    tinvest_block.outerHTML = html
                } else {
                    security_block = document.querySelector("h1[data-qa-file^=SecurityHeader]")
                    //console.log(security_block);
                    if (security_block) {
                        security_block.insertAdjacentHTML('afterend', html);
                    }
                }
            }


            if (real_revenue_object.history_count.length > 0) {
                head_block = document.querySelector("div[class^=SecurityHeaderPure__wrapper]")
                count_block = document.querySelector(".tinvest-count_stocks")
                stocks_count_html = '<table class="tinvest-count_stocks"><tr>' +
                    '<th></th>' +
                    '<th>Цена</th>' +
                    '<th>Количество</th>' +
                    '<th>%</th>' +
                    '</tr>';
                avg = 0;
                avg_tmp = 0;
                avg_count = 0;
                real_revenue_object.history_count.forEach(function (item) {
                    //какая-то хрень, не хочет округлять до 2х знаков
                    percent= ((parseInt((current_price/item[0])*10000)/100)-100).toFixed(2);

                    stocks_count_html += "<tr>" +
                        "<td></td>" +
                        "<td>" + item[0] + "</td>" +
                        "<td>" + item[1] + "</td>" +
                        "<td>" + percent + "</td>" +
                        "</tr>"
                    if (isCurrency) {
                        avg_tmp += item[0] * item[1];
                        avg_count += item[1]
                    }
                })
                if (isCurrency) {
                    avg = Math.round(avg_tmp / avg_count * 100) / 100
                    console.log(avg_tmp, avg_count)
                    stocks_count_html += "<tr class='avg'><td>Средняя</td><td>" + avg + "</td><td>" + avg_count + "</td></tr>"
                }
                stocks_count_html += '</table>'


                if (count_block) {
                    count_block.outerHTML = stocks_count_html
                } else {
                    if (head_block) {
                        head_block.insertAdjacentHTML('afterend', stocks_count_html);
                    }
                }
            }
        }
    }

    if (!isCurrency) {
        if (real_revenue_value < 0) {
            document.body.classList.remove('good-revenue');
            document.body.classList.add('bad-revenue');
        } else if (real_revenue_value > 0) {
            document.body.classList.add('good-revenue');
            document.body.classList.remove('bad-revenue');
        } else {
            document.body.classList.remove('good-revenue');
            document.body.classList.remove('bad-revenue');
        }
    }
}

async function exportToCsv() {
    let accounts = await getBrokerAccounts();
    //console.log("Accounts");
    accounts = accounts.payload.accounts;
    //console.log(accounts);
//payload.accounts[1].brokerAccountType
    accounts_num = accounts.length;
    //console.log(accounts_num);
    accounts.forEach(function (Account) {
        //let row = rowArray.join(";").replace(/\./g, ',');
        //csvContent += row + "\r\n";
        accountname = Account.brokerAccountType;
        //console.log(accountname);
        if (accountname == "Tinkoff") {
            tagtoinject = 'a[href="/invest/broker_account/about/"]';
            buttoncaption = "Экспорт в CSV";
            selectorname = "span.tinvest-export";
            classname = "tinvest-export";
        }
        if (accountname == "TinkoffIis") {
            tagtoinject = 'a[href="/invest/broker_account/about_iis/"]';
            buttoncaption = "Экспорт ИИС в CSV";
            selectorname = "span.tinvest-export-Iis";
            classname = "tinvest-export-Iis";
        }
        btn_tpl = document.querySelector(tagtoinject)//
//	classname="tinvest-export"+tag;
//	selectorname="span."+classname;
//	accountname="Tinkoff"+tag;
        if (!btn_tpl || document.querySelector(selectorname)) {
            return false
        }
        btn = btn_tpl.parentElement.cloneNode(true);
        btn.querySelector('a').href = "#"
        btn.querySelector('a span').classList.add(classname);
        btn.querySelector('span span').textContent = buttoncaption;
        btn_tpl.parentElement.insertAdjacentHTML('afterend', btn.outerHTML);
        //console.log("Injected: "+classname);

        document.onclick = async function (e) {
            var e = e || window.event, el = e.target || el.srcElement;
            //console.log(e);
            //console.log(el);
            //console.log(el.classList);
            // console.log(el.parentElement.classList);
            foundclass = false;
            classnametoFind = 'tinvest-export';
            if (el.classList.contains(classnametoFind) || el.parentElement.classList.contains(classnametoFind)) {
                classname = classnametoFind;
                //console.log("Clicked.."+classname);
                foundclass = true;
                accountname = "Tinkoff";
                result = await processExportToCsv(accountname);
            }
            classnametoFind = 'tinvest-export-Iis';
            if (el.classList.contains(classnametoFind) || el.parentElement.classList.contains(classnametoFind)) {
                classname = classnametoFind;
                //console.log("Clicked.."+classname);
                foundclass = true;
                accountname = 'TinkoffIis';
                result = await processExportToCsv(accountname);
            }
            classnametoFind = 'tinvest-export-journal';
            if (el.classList.contains(classnametoFind) || el.parentElement.classList.contains(classnametoFind)) {
                classname = classnametoFind;
                //console.log("Clicked.."+classname);
                foundclass = true;
                accountname = 'TinkoffIis';
                result = await processExportJournaltoCsv();
            }
        };
    });
}

async function processExportToCsv(accountname) {

    result = (await getPurchasedSecurities(accountname)).payload.data;
    csv_arr = [['Тикер', 'Количество', 'Валюта', 'Средняя цена', 'Текущая цена', 'Общая стоимость', 'Доходность', 'Доходность в %', 'Реальная доходность', 'Выход в Ноль при цене']];
    for (const item of result) {
        if (item.securityType == 'Stock') {
            //console.log(item.ticker);
            real_revenue_value = await calc_real_revenue(null, null, item.ticker);
            real_revenue_value = real_revenue_value.revenue
            real_revenue_value = parseFloat(real_revenue_value).toFixed(2);
            if (real_revenue_value < 0 && item.currentBalance > 0) {
                need_earn = await needEarn(real_revenue_value, null, item.ticker);

            } else {
                need_earn = 0
            }
            csv_arr.push([item.ticker, item.currentBalance, item.averagePositionPrice.currency, item.averagePositionPrice.value, item.currentPrice.value,
                item.currentAmount.value, item.expectedYield.value, item.expectedYieldRelative, real_revenue_value, need_earn])
        }
    }
    let csvContent_header = "data:text/csv;charset=utf-8,%EF%BB%BF";

    csvContent = ''
    csv_arr.forEach(function (rowArray) {
        //console.log(rowArray);
        let row = rowArray.join(";");//.replace(/\./g, ',');
        csvContent += row + "\r\n";
    });
    //console.log(csvContent);
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", csvContent_header + encodedUri);
    date = new Date();
    date_format = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    link.setAttribute("download", "stocks_" + date_format + ".csv");
    document.body.appendChild(link);

    link.click();
    return 0;
}

async function processExportJournaltoCsv() {
    //console.log("Starting Journal Export");

    result = await getFullHistory();
    //console.log("Строк журнала: " + parseInt(result.payload.items.length));
    csv_arr = [['ID', 'Счет', 'Тикер', 'Валюта', 'Дата', 'Тип операции', 'Тип инструмента', 'MarginCall?', 'Сумма', 'Цена', 'Количество', 'Количество Остаток', 'Комиссия', 'Валюта Комиссии', 'Комиссия в руб']];
    //console.log(result.payload.items);
    for (const item of result.payload.items) {
        if (item.status == 'done' && item.operationType != 'BrokCom') {
            csv_arr.push([item.id,
                item.accountType,
                item.ticker,
                item.currency,
                item.date,
                item.operationType,
                item.instrumentType,
                item.isMarginCall,
                item.payment,
                item.price,//: 284.47
                item.quantity,//: 1
                item.quantityRest,//: 0
                item.commission,//: -0.07
                item.commissionCurrency,//: "USD"
                item.commissionRub//: -4.482212
            ])
        }
    }
    //Добавляем текущий портфель
    let accounts = await getBrokerAccounts();
    date = new Date();
    date_format = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    accounts = accounts.payload.accounts;
    accounts_num = accounts.length;
    for (const Account of accounts) {
        accountname = Account.brokerAccountType;
        //console.log(Account);
        result = (await getPurchasedSecurities(accountname)).payload;
        //console.log(result);
        //console.log("Строк Портфеля [" + accountname + "] :" + parseInt(result.data.length));
        for (const item of result.data) {
            csv_arr.push([0,
                accountname,
                item.ticker,
                item.currentAmount.currency,
                date_format,
                "current position",
                item.securityType,
                "",
                item.currentAmount.value,
                item.currentPrice.value,//: 284.47
                item.currentBalance,//: 1
                item.currentBalance,//: 0
                0,//: -0.07
                item.currentAmount.currency,//: "USD"
                0//: -4.482212
            ])

        }

    }
    let csvContent_header = "data:text/csv;charset=utf-8,%EF%BB%BF";

    csvContent = '';
    row_count = 0;
    csv_arr.forEach(function (rowArray) {
        //console.log(rowArray);
        let row = rowArray.join(";");//.replace(/\./g, ',');
        csvContent += row + "\r\n";
        row_count += 1;
    });
    //console.log("Обработано строк: " + parseInt(row_count));
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", csvContent_header + encodedUri);
    link.setAttribute("download", "Journal_" + date_format + ".csv");
    document.body.appendChild(link);

    link.click();
    return 0;

}

async function exportJournalToCsv() {
    tagtoinject = 'a[href="/invest/broker_account/events/"]';
    btn_tpl = document.querySelector(tagtoinject)
    classname = "tinvest-export-journal";
    selectorname = "span." + classname;
    buttoncaption = "Экспорт Журнала в CSV";
    //console.log(btn_tpl);
    if (!btn_tpl || document.querySelector(selectorname)) {
        return false
    }
    btn = btn_tpl.cloneNode(true);
    //console.log(btn);
    btn.href = "#"
    btn.querySelector('a span').classList.add(classname);
    //console.log(btn.querySelector('a span'));
    btn.querySelector('span span').textContent = buttoncaption;
    //console.log(btn.querySelector('span span'));
    btn_tpl.insertAdjacentHTML('afterend', btn.outerHTML);

}

function markPotrfolioRevenue(){
    document.querySelectorAll('[class^=PortfolioTablePure__tableWrapper_] td:last-child div[class^=Table__linkCell_]').forEach(function(elem){
        var icon=elem.querySelector("div[class^=Icon__icon_]")
        if(icon){
            color=icon.style.color.replace(')',',0.25)')
            style='linear-gradient(to right, rgba(255,255,255,0) 0%, '+color+' 100%)'
            elem.style.background=style
        }
    })
}

if (window.location.host.replace('www.', '') == 'tinkoff.ru' && window.location.pathname!='/invest-terminal/') {
    if(window.location.pathname=='/invest/web-terminal/'){
        window.location='/invest-terminal'
    } else {
        document.querySelectorAll("a[href='/invest/web-terminal/']").forEach(function (item) {
            item.href = '/invest-terminal'
        })
        style_arr = [
            '.bad-revenue{background-color: rgba(255, 0, 0, 0.05);}',
            '.good-revenue{background-color: rgba(0, 255, 0, 0.05);}',
            '.tinvest-count_stocks {margin:20px 0; width:100%;border-collapse: collapse;color:#333;text-align: center;}',
            '.tinvest-count_stocks th, .tinvest-count_stocks td {padding:5px 0;border-bottom: 1px solid #ddd;}',
            '.tinvest-count_stocks tr:nth-child(odd){background-color: #0192cf0d}',
            '.tinvest-count_stocks tr.avg{border-top:2px solid black}',
            'h1[class^=SecurityHeaderPure__title_]{margin-bottom:0px !important}',
            '[class^=PortfolioTablePure__logoContainer_]{margin-top:0px !important}',
            '[class^=Table__linkCell_]{padding: 11px}',
            '[class^=PortfolioTablePure__tableWrapper_] tr:nth-child(odd){background-color: #c1c1c133}',
            '[class^=PortfolioPure__top_], [class^=PortfolioPure__block_]{margin-top:12px !important}'
        ];

        style_arr.forEach(function (style) {
            document.body.insertAdjacentHTML("afterbegin", "<style>" + style + "</style>")
        })
        exportToCsv();
        exportJournalToCsv();
        real_revenue();
        markPotrfolioRevenue();
        setInterval(async function () {
            await real_revenue();
            await exportToCsv();
            await exportJournalToCsv();
            markPotrfolioRevenue();
        }, 2500);
    }
} else {
    console.log('not tinkoff')
}

