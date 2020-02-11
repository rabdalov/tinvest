function etTimeToMsc(time) {
    if (time == 'BMO') {
        return 'до открытия';
    }
    if (time == 'AMC') {
        return 'после открытия';
    }
    if (time == 'DMH') {
        return time;
    }
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)\s/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    //TODO нет автоперевода часов +8 - костыль
    hours = (hours + 8) % 24
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes + " МСК";
}

function updateTime() {
    document.querySelectorAll("div.time:not(.updated), div#earningstime:not(.updated)").forEach(function (element, index) {
        element.classList.add('updated')
        element.textContent = element.textContent + " (" + etTimeToMsc(element.textContent) + ")"
    })
}

function getGraphUrl(ticker) {
    // return "https://finviz.com/chart.ashx?t=" + ticker + "&ty=c&ta=1&p=d&s=l";
    return "http://tinvest.daager.ru/stockcharts/" + ticker;
}

function markTinTicker() {
    tickers = ['TWOU', 'MMM', 'JOBS', 'AOS', 'AIR', 'AAN', 'ABT', 'ABBV', 'ABMD', 'ACIA', 'ACAD', 'ACN', 'ATVI', 'AYI', 'ADBE', 'ATGE', 'AAP', 'AEIS', 'ASIX', 'AVAV', 'AMG', 'AFL', 'AGCO', 'A', 'APD', 'AKAM', 'ALRM', 'ALK', 'ALB', 'AA', 'ARE', 'ALXN', 'BABA', 'ALGN', 'ALLK', 'Y', 'ALGT', 'ALLE', 'AGN', 'ADS', 'LNT', 'ALSN', 'MDRX', 'ALNY', 'GOOGL', 'AYX', 'ATUS', 'MO', 'ACH', 'AMZN', 'AMCX', 'AMD', 'AMED', 'AEE', 'CRMT', 'AAL', 'AXP', 'AIG', 'APEI', 'AWR', 'AMT', 'AMWD', 'AMP', 'AME', 'AMGN', 'AMN', 'APH', 'APC', 'ADI', 'PLAN', 'ANAB', 'ANDE', 'BUD', 'ANIK', 'AXE', 'ANSS', 'ANTM', 'AON', 'APA', 'AIV', 'APY', 'AAPL', 'AMAT', 'APTV', 'ARMK', 'ADM', 'ARNC', 'ANET', 'AWI', 'ARW', 'ARWR', 'AJG', 'ABG', 'ASGN', 'ASH', 'AZPN', 'AIZ', 'ATRO', 'T', 'ATKR', 'ATRI', 'ADSK', 'ADP', 'AN', 'AZO', 'AVLR', 'AVB', 'AVNS', 'AVDR', 'AVY', 'AVP', 'AAXN', 'AXSM', 'BMI', 'BIDU', 'BHGE', 'BLL', 'BAND', 'BAC', 'BK', 'BZUN', 'BBSI', 'BAX', 'BBT', 'BECN', 'BDX', 'BBBY', 'BDC', 'BRK.B', 'BERY', 'BBY', 'BIG', 'BH', 'BIO', 'BIIB', 'BMRN', 'BEAT', 'BJRI', 'BKI', 'BLKB', 'BLK', 'BLUE', 'BA', 'BKNG', 'BAH', 'BWA', 'SAM', 'BXP', 'BSX', 'EPAY', 'BFAM', 'BHF', 'BCO', 'BMY', 'BTI', 'AVGO', 'BR', 'BF.B', 'BRKR', 'BC', 'BURL', 'CHRW', 'COG', 'WHD', 'CDNS', 'CALM', 'CVGW', 'CBM', 'CPB', 'COF', 'CPRI', 'CAH', 'CARG', 'CSL', 'KMX', 'CCL', 'CRS', 'CARS', 'CRI', 'CASY', 'CAT', 'CVCO', 'CBRE', 'CBS', 'CE', 'CELG', 'CNC', 'CNP', 'CENT', 'CENTA', 'CTL', 'CERN', 'CF', 'CYOU', 'CRL', 'GTLS', 'CHTR', 'CHGG', 'CHE', 'CHK', 'CVX', 'PLCE', 'CBPO', 'CEA', 'LFC', 'CHL', 'ZNH', 'CHA', 'CMG', 'CB', 'CHD', 'CHDN', 'CIEN', 'CI', 'XEC', 'CINF', 'CNK', 'CTAS', 'CRUS', 'CSCO', 'C', 'CFG', 'CTXS', 'CLH', 'CLF', 'CME', 'CMS', 'KO', 'CGNX', 'CTSH', 'COHR', 'CL', 'COLM', 'CMCO', 'CMCSA', 'CMA', 'CVLT', 'CAG', 'CXO', 'ED', 'COP', 'STZ', 'CLR', 'CTB', 'CPS', 'CPRT', 'CLGX', 'GLW', 'CTVA', 'CRVL', 'CSGP', 'COST', 'COTY', 'COUP', 'CVET', 'CBRL', 'CR', 'CACC', 'CREE', 'CROX', 'CCI', 'CCK', 'CSWI', 'CMI', 'CVS', 'CY', 'DHI', 'DHR', 'DRI', 'PLAY', 'DVA', 'DECK', 'DE', 'DK', 'DLPH', 'DAL', 'DLX', 'XRAY', 'DVN', 'DXCM', 'FANG', 'DKS', 'DLR', 'DDS', 'DIOD', 'DFS', 'DISCA', 'DISCB', 'DISCK', 'DOCU', 'DLB', 'DG', 'DLTR', 'D', 'UFS', 'DORM', 'DOV', 'DOW', 'RDY', 'DRQ', 'DD', 'DXC', 'DY', 'ETFC', 'EXP', 'EMN', 'ETN', 'EBAY', 'ECL', 'EPC', 'EIX', 'EW', 'ELAN', 'EA', 'LLY', 'EBS', 'EMR', 'ENTA', 'ECA', 'ENDP', 'ET', 'ENSG', 'ENV', 'EOG', 'EPAM', 'EQT', 'EFX', 'EQIX', 'ETRN', 'ERIE', 'ESS', 'ETSY', 'EEFT', 'RE', 'ES', 'EVH', 'EXAS', 'EXEL', 'EXC', 'EXLS', 'EXPE', 'EXPD', 'EXR', 'XOM', 'FFIV', 'FB', 'FDS', 'FICO', 'FARO', 'FAST', 'FDX', 'RACE', 'FIS', 'FITB', 'FSLR', 'FISV', 'FIVN', 'FLT', 'FLIR', 'FND', 'FLS', 'FLR', 'FMC', 'FL', 'F', 'FORR', 'FTNT', 'FTV', 'FBHS', 'FOXF', 'BEN', 'FCX', 'FTR', 'FRPH', 'FCN', 'GPS', 'GRMN', 'GTX', 'IT', 'GCP', 'GNRC', 'GD', 'GE', 'GIS', 'GM', 'GCO', 'GWR', 'GHDX', 'THRM', 'GPC', 'ROCK', 'GILD', 'GBT', 'GPN', 'GL', 'GMED', 'GMS', 'GDDY', 'GS', 'GT', 'GOOG', 'GOSS', 'GHC', 'LOPE', 'GVA', 'GDOT', 'GBX', 'GSKY', 'GEF', 'GPI', 'GRUB', 'GSH', 'GH', 'GWRE', 'HRB', 'HAE', 'HAIN', 'HAL', 'HBI', 'HOG', 'HIG', 'HAS', 'HA', 'FUL', 'HCA', 'HCP', 'HIIQ', 'HCSG', 'HQY', 'HP', 'HSIC', 'HCCI', 'MLHR', 'HSY', 'HES', 'HPE', 'HXL', 'HLT', 'HGV', 'HFC', 'HOLX', 'HON', 'HRL', 'HST', 'HPQ', 'HNP', 'HTHT', 'HUBG', 'HUBS', 'HUM', 'HBAN', 'HII', 'HURN', 'H', 'IAC', 'IBM', 'IBN', 'ICUI', 'IDXX', 'INFO', 'IIVI', 'ITW', 'ILMN', 'IMMU', 'INCY', 'IR', 'NGVT', 'INGR', 'INGN', 'NSP', 'IBP', 'PODD', 'IART', 'INTC', 'IPAR', 'ICE', 'IDCC', 'IFF', 'IP', 'INTU', 'ISRG', 'IVZ', 'IONS', 'IPG', 'IPGP', 'IQV', 'IRTC', 'IRBT', 'IRM', 'ITRI', 'JCOM', 'JKHY', 'JEC', 'JBHT', 'JD', 'JEF', 'JELD', 'SJM', 'JBSS', 'JNJ', 'JCI', 'JOUT', 'JLL', 'JPM', 'JNPR', 'KALU', 'KSU', 'K', 'KMT', 'KDP', 'KEY', 'KEYS', 'KMB', 'KIM', 'KMI', 'KEX', 'KLAC', 'KNX', 'KTB', 'KEP', 'KFY', 'KHC', 'KR', 'LB', 'LLL', 'LHX', 'LH', 'LRCX', 'LVS', 'LEA', 'LEGH', 'LM', 'LEG', 'TREE', 'LEN', 'LII', 'LPL', 'LGIH', 'LHCG', 'LECO', 'LIN', 'LAD', 'LYV', 'LTHM', 'RAMP', 'LKQ', 'LMT', 'L', 'LOGM', 'LOW', 'LULU', 'LITE', 'LYB', 'MTB', 'MAC', 'M', 'MSG', 'MGLN', 'MNK', 'MANU', 'MANH', 'MAN', 'MANT', 'MRO', 'MPC', 'MKL', 'MKTX', 'MAR', 'MMC', 'MLM', 'MAS', 'MASI', 'MA', 'MTCH', 'MTRN', 'MATX', 'MAT', 'MXIM', 'MMS', 'MCD', 'MKC', 'MCK', 'MDSO', 'MD', 'MEDP', 'MDT', 'MLCO', 'MELI', 'MRK', 'MMSI', 'MTH', 'MEI', 'MET', 'MTD', 'MFGP', 'MCHP', 'MU', 'MSFT', 'MSTR', 'MAA', 'MIDD', 'MRTX', 'MINI', 'MHK', 'TAP', 'MOMO', 'MCRI', 'MDLZ', 'MDB', 'MNST', 'MCO', 'MS', 'MOS', 'MSI', 'MOV', 'MSM', 'MSCI', 'MSGN', 'MTSC', 'MUR', 'MYL', 'MYOK', 'MYRG', 'MYGN', 'NANO', 'NDAQ', 'FIZZ', 'NOV', 'EYE', 'NTUS', 'NAVI', 'NKTR', 'NEOG', 'NTAP', 'NTES', 'NFLX', 'NTGR', 'NBIX', 'NJR', 'NEWR', 'NWL', 'NEU', 'NEM', 'NWS', 'NWSA', 'NXST', 'NEE', 'NLSN', 'NKE', 'NBL', 'NOK', 'NDSN', 'JWN', 'NSC', 'NTRS', 'NOC', 'DNOW', 'NRG', 'NUS', 'NUE', 'NTNX', 'NUVA', 'NVDA', 'NVR', 'ORLY', 'OXY', 'OKTA', 'ODFL', 'OLLI', 'OMCL', 'OMC', 'ON', 'OKE', 'ORCL', 'OFIX', 'OSK', 'OSIS', 'OC', 'OI', 'PCAR', 'PKG', 'PD', 'PANW', 'PZZA', 'PH', 'PATK', 'PDCO', 'PAYC', 'PCTY', 'PYPL', 'PBF', 'CNXN', 'PEGA', 'PEN', 'PBCT', 'PEP', 'PFGC', 'PKI', 'PRSP', 'PETQ', 'PTR', 'PFE', 'PCG', 'PM', 'PSX', 'PXD', 'PBI', 'PLNT', 'PLXS', 'PS', 'PNC', 'PII', 'POLY', 'POL', 'POOL', 'POWI', 'PPG', 'PPL', 'PRAH', 'PINC', 'PBH', 'PFG', 'PG', 'PRGS', 'PGR', 'PLD', 'PFPT', 'PRLB', 'PRSC', 'PRU', 'PTC', 'PEG', 'PSA', 'PHM', 'PSTG', 'PVH', 'QADA', 'QIWI', 'QRVO', 'QCOM', 'QLYS', 'PWR', 'QTNA', 'DGX', 'QDEL', 'QUOT', 'QRTEA', 'RL', 'RRC', 'RAVN', 'RJF', 'RYN', 'RTN', 'ROLL', 'RP', 'O', 'RHT', 'RRGB', 'REG', 'REGN', 'RF', 'RS', 'RGEN', 'RSG', 'REZI', 'RMD', 'REX', 'RH', 'RYTM', 'RNG', 'RHI', 'ROK', 'ROG', 'ROL', 'ROP', 'ROST', 'RCL', 'RPM', 'R', 'SPGI', 'SAGE', 'SAIA', 'SAIL', 'CRM', 'SAFM', 'SNY', 'SRPT', 'SCSC', 'SLB', 'SMG', 'STX', 'SEE', 'SGEN', 'SEIC', 'WTTR', 'SRE', 'SMTC', 'SXT', 'SERV', 'NOW', 'SHAK', 'SHW', 'SWAV', 'SSTK', 'SIG', 'SLAB', 'SPG', 'SSD', 'SINA', 'SBGI', 'SHI', 'SITE', 'SKM', 'SKX', 'SWKS', 'SLG', 'SNBR', 'SMAR', 'SNA', 'SOHU', 'SEDG', 'SWI', 'BID', 'SO', 'SCCO', 'LUV', 'SWN', 'SP', 'SPR', 'SAVE', 'SPLK', 'SFM', 'SPSC', 'FLOW', 'SQ', 'SSNC', 'SXI', 'SWK', 'SBUX', 'STT', 'STLD', 'SRCL', 'SFIX', 'STRA', 'SYK', 'RGR', 'SRDX', 'SIVB', 'SWCH', 'SYKE', 'SYMC', 'SYF', 'SYNH', 'SNX', 'SNPS', 'SYY', 'TROW', 'TSM', 'TAL', 'TNDM', 'TPR', 'TGT', 'TTM', 'TMHC', 'TCRR', 'TCS', 'TEL', 'TECD', 'FTI', 'TGNA', 'TDY', 'TFX', 'TDS', 'TPX', 'TENB', 'TDC', 'TER', 'TSLA', 'TCBI', 'TXN', 'TXRH', 'TXT', 'AES', 'ALL', 'SCHW', 'CLX', 'COO', 'EL', 'HD', 'WMB', 'TMO', 'THO', 'TIF', 'TKR', 'TJX', 'TOL', 'BLD', 'TOT', 'TSS', 'TPIC', 'TSCO', 'TTD', 'TDG', 'RIG', 'TRU', 'TRV', 'TREX', 'TPH', 'TRMB', 'TNET', 'TRIP', 'HEAR', 'FOX', 'FOXA', 'TWTR', 'TYL', 'TSN', 'UDR', 'ULTA', 'RARE', 'UAA', 'UA', 'UNF', 'UNP', 'UAL', 'UPS', 'URI', 'USM', 'UTX', 'UTHR', 'UNH', 'OLED', 'UFPI', 'UHS', 'UNM', 'URBN', 'USB', 'USFD', 'MTN', 'VALE', 'VLO', 'VREX', 'VAR', 'VEEV', 'VTR', 'VEON', 'VNE', 'VRNT', 'VRSN', 'VRSK', 'VRTV', 'VZ', 'VRTX', 'VFC', 'VIAB', 'VICR', 'VIPS', 'VRTU', 'V', 'VPG', 'VC', 'VNO', 'VMC', 'WBC', 'WAB', 'WMT', 'WBA', 'DIS', 'WM', 'WAT', 'WTS', 'W', 'WEC', 'WB', 'WCG', 'WFC', 'WELL', 'WERN', 'WCC', 'WDC', 'WU', 'WLK', 'WRK', 'WEX', 'WY', 'WHR', 'WLH', 'WSM', 'WLTW', 'WING', 'WGO', 'WWW', 'WWD', 'WDAY', 'WOR', 'GRA', 'GWW', 'WYND', 'WH', 'WYNN', 'XEL', 'XRX', 'XLNX', 'XPO', 'XYL', 'YNDX', 'YELP', 'YUM', 'YY', 'ZBRA', 'ZEN', 'ZG', 'Z', 'ZBH', 'ZION', 'ZTS', 'ZS', 'ZUO', 'ABRD', 'MBT', 'AKRN', 'ALRS', 'ALNU', 'APTK', 'AFKS', 'AMEZ', 'AFLT', 'VZRZP', 'VTBR', 'BSPB', 'BANE', 'BANEP', 'BLNG', 'BRZL', 'VSMO', 'OGKB', 'GAZP', 'SIBN', 'HALS', 'ENPL', 'FIVE', 'GRNT', 'LSRG', 'GCHE', 'GTRK', 'DASB', 'FESH', 'DSKY', 'DVEC', 'OPIN', 'IRAO', 'IRGZ', 'KLSB', 'KMAZ', 'TGKD', 'IRKT', 'KROT', 'KBTK', 'LNZL', 'LNTA', 'LSNG', 'LSNGP', 'LKOH', 'MVID', 'MGNT', 'MAGN', 'MGTSP', 'MFON', 'MTLR', 'MTLRP', 'CBOM', 'MOEX', 'MSTT', 'MSNG', 'MSRS', 'MRKV', 'MRKZ', 'MRKS', 'MRKU', 'MRKC', 'MRKP', 'MRKY', 'MTSS', 'MSST', 'NSVZ', 'NKNC', 'NKNCP', 'NKHP', 'NLMK', 'NMTP', 'NVTK', 'GMKN', 'OBUV', 'UNAC', 'UWGN', 'KZOS', 'KZOSP', 'PMSB', 'PMSBP', 'PIKK', 'PLZL', 'PRTK', 'RASP', 'RBCM', 'RKKE', 'ROSN', 'RSTI', 'RSTIP', 'RTKM', 'RTKMP', 'AGRO', 'RUAL', 'HYDR', 'RUGR', 'ROLO', 'RUSP', 'RNFT', 'KRKNP', 'SFIN', 'SBER', 'SBERP', 'CHMF', 'SELG', 'SVAV', 'SNGS', 'SNGSP', 'TATN', 'TATNP', 'TTLK', 'TGKA', 'TGKN', 'TGKB', 'TGKBP', 'VRSB', 'TRCN', 'TRNFP', 'TRMK', 'URKA', 'FTRE', 'PHOR', 'FEES', 'CNTL', 'CNTLP', 'CLSB', 'PRFN', 'CHMK', 'CHEP', 'ENRU', 'UPRO', 'UNKL'];

    document.querySelectorAll(".ticker:not(.tinvest-tinkoff-ticker), #mainticker:not(.tinvest-tinkoff-ticker)").forEach(function (item) {
        if (tickers.indexOf(item.textContent) !== -1) {
            item.classList.add('tinvest-tinkoff-ticker')
        }
    })

}

style_arr = [
    '@media only screen and (min-width: 62em) {.listview .estimate {left: 425px;} .listview .time {left: 285px;}}',
    '@media only screen and (min-width: 48em) {.listview .estimate {left: 400px;} .listview .time {left: 270px;}}',
    'div#graph_block {position:fixed;border: 3px solid black;top: 554px;left: 204px;z-index: 1;}',
    '.unselectedoptions { width: auto !important}',
    '.tinvest-tinkoff-ticker {color: #ffff00 !important; text-shadow: 0 0 2px black;}',
    '#hide-show_non_tinkoff{position: absolute;left: 50px;} #hide-show_non_tinkoff input{visibility: visible;}',
    "li.nwh {counter-increment: my-awesome-counter;}li.nwh::before {content: counter(my-awesome-counter); position:absolute;top:5px;color:grey}"
];

var hidden = false;

function hideShowNonTinkoff() {
    els = document.querySelectorAll(".ticker:not(.tinvest-tinkoff-ticker)")
    els.forEach(function (element) {
        element.parentNode.parentNode.style.display = hidden ? '' : 'none';
    })
    hidden = !hidden;
}

if (window.location.host.replace('www.', '') == 'earningswhispers.com') {
    style_arr.forEach(function (style) {
        document.body.insertAdjacentHTML("afterbegin", "<style>" + style + "</style>")
    })


    if (document.getElementById('calheading')) {
        $hidden = '<div id="hide-show_non_tinkoff"><label><input type="checkbox"' + (hidden ? 'CHECKED' : '') + '>Скрыть тикеры недоступные в Тинькофф</label></div>';
        document.getElementById('calheading').insertAdjacentHTML('afterend', $hidden);

        document.querySelector('#hide-show_non_tinkoff input').onchange = function () {
            hideShowNonTinkoff()
        }
    }

    updateTime();
    markTinTicker();
    setInterval(function () {
        updateTime();
        markTinTicker();
    }, 350)

    document.body.insertAdjacentHTML("afterbegin", "<div id='graph_block' style='display: none'><img src></div>");
    graph_block = document.querySelector("div#graph_block")
    img_block = document.querySelector("div#graph_block img")

    document.onmouseover = function (e) {
        var e = e || window.event, el = e.target || el.srcElement;
        if (el.tagName == 'DIV' && el.classList[0] == 'ticker') {
            url = getGraphUrl(el.textContent)
            img_block.src = url
            graph_block.style.display = 'block'
            graph_block.style.top = (e.clientY - 50) + "px"
            graph_block.style.left = (e.clientX + 50) + "px"
        }
    };

    document.onmouseout = function (e) {
        var e = e || window.event, el = e.target || el.srcElement;
        graph_block.style.display = 'none'
    };
} else {
    console.log('not ew')
}



