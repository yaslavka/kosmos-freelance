(function() {
    var startTime = new Date();
    var popupDataUrl = '/reality-check/api/v1/info';
    var localNotifyPeriodSeconds = 10; //30 * 60; //10;

    var _globalTranslations = {
        en: {
            totalPlayingText: 'You\'ve been playing for <span class="total-time"><span class="total-time-h">0</span>h and <span class="total-time-m">30</span>m</span>.',
            totalBetText:     'During this period you\'ve made bets worth <span class="total-bet">0</span>.',
            totalWinText:     'Your total win is <span class="total-win">0</span>.',
            continueText:     'Would you like to continue the game?',
            back:             'Back to Lobby',
            continue:         'Continue',
        },
        ru: {
            totalPlayingText: 'Вы уже играете <span class="total-time"><span class="total-time-h">0</span>ч и <span class="total-time-m">30</span>мин</span>.',
            totalBetText:     'За этот период вы сделали ставок на сумму <span class="total-bet">0</span>.',
            totalWinText:     'Получили выигрышей на сумму <span class="total-win">0</span>.',
            continueText:     'Хотите продолжить игру?',
            back:             'Вернуться в лобби',
            continue:         'Продолжить',
        },
        zh: {
            totalPlayingText: '您已经玩了 <span class="total-time"><span class="total-time-h">0</span>h 和 <span class="total-time-m">30</span>m</span>.',
            totalBetText:     '在此期间，您已对总<span class="total-bet">0</span> 的金额下注',
            totalWinText:     '获得了 <span class="total-win">0</span> 的总奖金',
            continueText:     '您想继续游戏吗？',
            back:             '回到大堂',
            continue:         '继续',
        },
        it: {
            totalPlayingText: 'Hai giocato per <span class="total-time"><span class="total-time-h">0</span>h e <span class="total-time-m">30</span>m</span>.',
            totalBetText:     'Durante questo periodo hai fatto puntate per un valore di <span class="total-bet">0</span>.',
            totalWinText:     'La tua vincita totale è <span class="total-win">0</span>.',
            continueText:     'Vuoi continuare la partita?',
            back:             'Torna alla lobby',
            continue:         'Continua',
        },
        bg: {
            totalPlayingText: 'Вече играете в продължение на <span class="total-time"><span class="total-time-h">0</span>часа и <span class="total-time-m">30</span>минути</span>.',
            totalBetText:     'През този период сте направили залози на стойност <span class="total-bet">0</span>.',
            totalWinText:     'Общата Ви печалба е <span class="total-win">0</span>.',
            continueText:     'Искате ли да продължите играта?',
            back:             'Назад към лобито',
            continue:         'Напред',
        },
        ro: {
            totalPlayingText: 'Ai jucat <span class="total-time"><span class="total-time-h">0</span>h și <span class="total-time-m">30</span>m</span>.',
            totalBetText:     'În această perioadă, ai făcut pariuri în valoare de <span class="total-bet">0</span>.',
            totalWinText:     'Câștigul tău total este de <span class="total-win">0</span>.',
            continueText:     'Dorești să continui jocul?',
            back:             'Înapoi în lobby',
            continue:         'Continuare',
        },
        hr: {
            totalPlayingText: 'Igrate <span class="total-time"><span class="total-time-h">0</span>h and <span class="total-time-m">30</span>m</span>.',
            totalBetText:     'Tijekom tod razdoblja uložili ste ukupno <span class="total-bet">0</span>.',
            totalWinText:     'Vaš je ukupni dobitak <span class="total-win">0</span>.',
            continueText:     'Želite li nastaviti igrati?',
            back:             'Povratak u predvorje',
            continue:         'Nastavi',
        },
        de: {
            totalPlayingText: 'Du spielst seit <span class="total-time"><span class="total-time-h">0</span> Std. und <span class="total-time-m">30</span>Min.</span>.',
            totalBetText:     'In diesem Zeitraum hast du Wetten im Wert von <span class="total-bet">0</span> abgegeben.',
            totalWinText:     'Dein Gesamtgewinn beträgt <span class="total-win">0</span>.',
            continueText:     'Möchtest du mit dem Spiel fortfahren?',
            back:             'Zurück zur Lobby',
            continue:         'Fortfahren',
        },
        es: {
            totalPlayingText: 'Has estado jugando durante <span class="total-time"><span class="total-time-h">0</span>h y <span class="total-time-m">30</span>m</span>.',
            totalBetText:     'Durante este período, has realizado apuestas por un valor total de <span class="total-bet">0</span>.',
            totalWinText:     'Tu ganancia total es <span class="total-win">0</span>.',
            continueText:     '¿Quieres continuar la partida?',
            back:             'Regresar al lobby',
            continue:         'Continuar',
        },
        pt: {
            totalPlayingText: 'Você está jogando por <span class="total-time"><span class="total-time-h">0</span>h e <span class="total-time-m">30</span>m</span>.',
            totalBetText:     'Durante este período, você fez apostas no valor de <span class="total-bet">0</span>.',
            totalWinText:     'Seu total de ganhos é <span class="total-win">0</span>.',
            continueText:     'Você gostaria de continuar o jogo?',
            back:             'Voltar para a Sala',
            continue:         'Continuar',
        },
        lt: {
            totalPlayingText: 'Jau lošiate <span class="total-time"><span class="total-time-h">0</span> val. ir <span class="total-time-m">30</span> min</span>.',
            totalBetText:     'Jūsų statymų vertė per šį laikotarpį yra <span class="total-bet">0</span>.',
            totalWinText:     'Jūsų visas laimėjimas yra <span class="total-win">0</span>.',
            continueText:     'Ar norėtumėte tęsti lošimą?',
            back:             'Grįžti į fojė',
            continue:         'Tęsti',
        },
        tr: {
            totalPlayingText: '<span class="total-time"><span class="total-time-h">0</span> saat <span class="total-time-m">30</span> dakikadır oynuyorsunuz</span>.',
            totalBetText:     'Bu süre boyunca <span class="total-bet">0</span>değerinde bahis oynadınız',
            totalWinText:     'Toplam kazancınız <span class="total-win">0</span>.',
            continueText:     'Oyuna devam etmek ister misiniz?',
            back:             'Lobiye Dön',
            continue:         'Devam',
        },
        pl: {
            totalPlayingText: 'Grasz <span class="total-time"><span class="total-time-h">0</span>h i <span class="total-time-m">30</span>m</span>.',
            totalBetText:     'Zakłady postawione przez Ciebie w tym okresie mają wartość <span class="total-bet">0</span>.',
            totalWinText:     'Twoja łączna wygrana to <span class="total-win">0</span>.',
            continueText:     'Czy chcesz kontynuować grę?',
            back:             'Wróć do lobby',
            continue:         'Kontynuuj',
        },
        fr: {
            totalPlayingText: 'Vous jouez depuis <span class="total-time"><span class="total-time-h">0</span> h et <span class="total-time-m">30</span> min</span>.',
            totalBetText:     'Pendant cette période, vous avez placé des mises d\'une valeur de <span class="total-bet">0</span>.',
            totalWinText:     'Le total de vos gains est de <span class="total-win">0</span>.',
            continueText:     'Voulez-vous continuer la partie ?',
            back:             'Retour au Lobby',
            continue:         'Continuer',
        },
    };

    //globals
    var baseOnload = window.onload;
    window.onload = init;
    var popupDiv = null;
    var popupShowInterval = 30 * 60 * 1000; //default value. will rewrite in the initRealityCheck

    /**
     * init onload
     */
    function init() {
        if (baseOnload) {
            baseOnload.apply(null, arguments);
        }

        initRealityCheck();
    }

    /**
     * check need to start reality timer
     */
    function initRealityCheck() {
        //local url
        if (jsvars.local) {
            popupDataUrl = 'https://play-sb.hhs-test.net/reality-check/api/v1/info';
            jsvars.reality_check = { notify_period_seconds: localNotifyPeriodSeconds }; //!!! local debug
        }

        if (!jsvars.reality_check || !jsvars.reality_check.notify_period_seconds) {
            return;
        }

        popupShowInterval = jsvars.reality_check.notify_period_seconds * 1000;
        setTimeout(showPopup, popupShowInterval);
    }

    /**
     * getting GET param(s) by name or all params list
     *
     * @param {string} [name] - get param name
     * @returns {Object}
     */
    function parseGetParams(name) {
        var $_GET = {};
        var _GET = window.location.href.substring(1).split('?');

        if (_GET[1]) {
            var __GET = _GET[1].split('&');

            for (var i = 0; i < __GET.length; i++) {
                var getVar = __GET[i].split('=');
                $_GET[getVar[0]] = typeof getVar[1] === 'undefined' ? '' : getVar[1];
            }
        }

        if (!name) {
            return $_GET;
        }

        return $_GET[name];
    }

    /**
     * get data from the server and show popup
     */
    function showPopup() {
        var req = new XMLHttpRequest();
        req.responseType = 'json';
        var popupDataUrlWithData = popupDataUrl + '?project=' + (parseGetParams('project') || 115) + '&user_id=' + (parseGetParams('user_id') || 77764);
        req.open('GET', popupDataUrlWithData, true);
        req.onload = function() {
            var jsonResponse = req.response;

            // do something with jsonResponse
            checkCreatePopup();
            document.querySelector('.modalLobbyWRapp2custom12 .total-bet').innerHTML = jsonResponse.data.betTotal;
            document.querySelector('.modalLobbyWRapp2custom12 .total-win').innerHTML = jsonResponse.data.winTotal;
            //calc playing time
            var playingTime = msToTime(new Date() - startTime);
            document.querySelector('.modalLobbyWRapp2custom12 .total-time-h').innerHTML = playingTime.hours;
            document.querySelector('.modalLobbyWRapp2custom12 .total-time-m').innerHTML = playingTime.minutes;

            makePopupVisible();
        };
        req.send(null);
    }

    /**
     * make popup visible :)
     */
    function makePopupVisible() {
        checkCreatePopup();
        popupDiv.style.display = 'block';
    }

    /**
     * convert milliseconds to time (hours, minutes, seconds, milliseconds)
     */
    function msToTime(duration) {
        var milliseconds = Math.floor((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        return { hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds };
    }

    /**
     * continue button press handler
     */
    function continueHandler() {
        popupDiv.style.display = 'none';
        setTimeout(showPopup, popupShowInterval);
    }

    /**
     * back button press handler
     */
    function backHandler() {
        window.location.href = jsvars.back_url;
    }

    /**
     * if popup isnt created - we must create it
     */
    function checkCreatePopup() {
        if (popupDiv) {
            return;
        }

        var language = _globalTranslations[jsvars.language] ? jsvars.language : 'en';
        var currentTranslation = _globalTranslations[language];

        var popupHtml = `
    <div
        style="background: url(https://s3.nat-geo.ru/images/2019/4/10/f24cb6f9d754494b8b3a99603fbd40f4.max-2000x1000.jpg) center no-repeat; background-size: cover"
        class="modalLobbyWRapp2custom12">
        <style>
            html {
                line-height: 1.15;
                /* 1 */
                -webkit-text-size-adjust: 100%;
                /* 2 */ }

            /* Sections
            ========================================================================== */
            /**
             * Remove the margin in all browsers.
             */
            body {
                margin: 0; }

            main {
                display: block; }

            h1 {
                font-size: 2em;
                margin: 0.67em 0; }

            /* Grouping content
            ========================================================================== */
            /**
             * 1. Add the correct box sizing in Firefox.
             * 2. Show the overflow in Edge and IE.
             */
            hr {
                box-sizing: content-box;
                /* 1 */
                height: 0;
                /* 1 */
                overflow: visible;
                /* 2 */ }

            pre {
                font-family: monospace, monospace;
                /* 1 */
                font-size: 1em;
                /* 2 */ }

            /* Text-level semantics
            ========================================================================== */
            /**
             * Remove the gray background on active links in IE 10.
             */
            a {
                background-color: transparent; }

            /**
             * 1. Remove the bottom border in Chrome 57-
             * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
             */
            abbr[title] {
                border-bottom: none;
                /* 1 */
                text-decoration: underline;
                /* 2 */
                text-decoration: underline dotted;
                /* 2 */ }

            /**
             * Add the correct font weight in Chrome, Edge, and Safari.
             */
            b,
            strong {
                font-weight: bolder; }

            code,
            kbd,
            samp {
                font-family: monospace, monospace;
                /* 1 */
                font-size: 1em;
                /* 2 */ }

            /**
             * Add the correct font size in all browsers.
             */
            small {
                font-size: 80%; }

            sub,
            sup {
                font-size: 75%;
                line-height: 0;
                position: relative;
                vertical-align: baseline; }

            sub {
                bottom: -0.25em; }

            sup {
                top: -0.5em; }

            /* Embedded content
            ========================================================================== */
            /**
             * Remove the border on images inside links in IE 10.
             */
            img {
                border-style: none;
                max-width: 100%;
                height: auto; }

            /* Forms
            ========================================================================== */
            /**
             * 1. Change the font styles in all browsers.
             * 2. Remove the margin in Firefox and Safari.
             */
            button,
            input,
            optgroup,
            select,
            textarea {
                font-family: inherit;
                /* 1 */
                font-size: 100%;
                /* 1 */
                line-height: 1.15;
                /* 1 */
                margin: 0;
                /* 2 */ }

            /**
             * Show the overflow in IE.
             * 1. Show the overflow in Edge.
             */
            button,
            input {
                /* 1 */
                overflow: visible; }

            /**
             * Remove the inheritance of text transform in Edge, Firefox, and IE.
             * 1. Remove the inheritance of text transform in Firefox.
             */
            button,
            select {
                /* 1 */
                text-transform: none; }

            /**
             * Correct the inability to style clickable types in iOS and Safari.
             */
            button,
            [type="button"],
            [type="reset"],
            [type="submit"] {
                -webkit-appearance: button; }

            /**
             * Remove the inner border and padding in Firefox.
             */
            button::-moz-focus-inner,
            [type="button"]::-moz-focus-inner,
            [type="reset"]::-moz-focus-inner,
            [type="submit"]::-moz-focus-inner {
                border-style: none;
                padding: 0; }

            /**
             * Restore the focus styles unset by the previous rule.
             */
            button:-moz-focusring,
            [type="button"]:-moz-focusring,
            [type="reset"]:-moz-focusring,
            [type="submit"]:-moz-focusring {
                outline: 1px dotted ButtonText; }

            /**
             * Correct the padding in Firefox.
             */
            fieldset {
                padding: 0.35em 0.75em 0.625em; }

            legend {
                box-sizing: border-box;
                /* 1 */
                color: inherit;
                /* 2 */
                display: table;
                /* 1 */
                max-width: 100%;
                /* 1 */
                padding: 0;
                /* 3 */
                white-space: normal;
                /* 1 */ }

            /**
             * Add the correct vertical alignment in Chrome, Firefox, and Opera.
             */
            progress {
                vertical-align: baseline; }

            /**
             * Remove the default vertical scrollbar in IE 10+.
             */
            textarea {
                overflow: auto; }

            /**
             * 1. Add the correct box sizing in IE 10.
             * 2. Remove the padding in IE 10.
             */
            [type="checkbox"],
            [type="radio"] {
                box-sizing: border-box;
                /* 1 */
                padding: 0;
                /* 2 */ }

            /**
             * Correct the cursor style of increment and decrement buttons in Chrome.
             */
            [type="number"]::-webkit-inner-spin-button,
            [type="number"]::-webkit-outer-spin-button {
                height: auto; }

            /**
             * 1. Correct the odd appearance in Chrome and Safari.
             * 2. Correct the outline style in Safari.
             */
            [type="search"] {
                -webkit-appearance: textfield;
                /* 1 */
                outline-offset: -2px;
                /* 2 */ }

            /**
             * Remove the inner padding in Chrome and Safari on macOS.
             */
            [type="search"]::-webkit-search-decoration {
                -webkit-appearance: none; }

            ::-webkit-file-upload-button {
                -webkit-appearance: button;
                /* 1 */
                font: inherit;
                /* 2 */ }

            /* Interactive
            ========================================================================== */
            /*
            * Add the correct display in Edge, IE 10+, and Firefox.
            */
            details {
                display: block; }

            /*
            * Add the correct display in all browsers.
            */
            summary {
                display: list-item; }

            /* Misc
            ========================================================================== */
            /**
             * Add the correct display in IE 10+.
             */
            template {
                display: none; }

            /**
             * Add the correct display in IE 10.
             */
            [hidden] {
                display: none; }

            .modalLobbyWRapp2custom12 {
                --fSize: 10px;
                height: 100vh;
                width: 100%;
                font-family: Roboto, Montserrat, sans-serif;
                font-weight: 300;
                line-height: 1.2; }
            .modalLobbyWRapp2custom12 p {
                margin: 0;
                font-size: calc(2.2 * var(--fSize));
                line-height: 1.3;
                font-weight: 300; }
            .modalLobbyWRapp2custom12 .btn {
                background: 0 0;
                outline: 0;
                border: none;
                cursor: pointer;
                font-size: calc(2.2 * var(--fSize));
                color: #fff;
                display: inline-block;
                max-width: 100%;
                text-align: center;
                transition: .2s;
                text-decoration: none;
                position: relative;
                height: calc(7 * var(--fSize));
                font-weight: 300; }
            .modalLobbyWRapp2custom12 .btn:hover {
                opacity: .8; }
            .modalLobbyWRapp2custom12 .btn-close {
                background: #404D62; }
            .modalLobbyWRapp2custom12 .btn-primary {
                background: #404D62; }
            .modalLobbyWRapp2custom12 .modal {
                background: rgba(29, 34, 44, 0.8);
                position: fixed;
                top: 0;
                left: 0;
                z-index: 100;
                right: 0;
                bottom: 0;
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center; }
            .modalLobbyWRapp2custom12 .modal-body {
                background: #0B0D11;
                width: calc(75 * var(--fSize));
                max-width: 100%;
                max-height: 100vh;
                color: #fff; }
            .modalLobbyWRapp2custom12 .modal-content {
                text-align: center;
                padding-top: calc(8 * var(--fSize));
                padding-bottom: calc(4 * var(--fSize));
                padding-left: calc(5 * var(--fSize));
                padding-right: calc(5 * var(--fSize)); }
            .modalLobbyWRapp2custom12 .modal-question {
                font-size: calc(2.6 * var(--fSize));
                color: #5CA2F8;
                margin: .9em 0 0; }
            .modalLobbyWRapp2custom12 .modal-btns {
                display: flex;
                justify-content: space-between; }
            .modalLobbyWRapp2custom12 .modal-btns .btn {
                width: 49.5%; }

            /*************************************** MEDIA ***************************************/
            /* ----------- iPad Pro 12.9" ----------- */
            /* ----------- iPad 3, 4 and Pro 9.7" ----------- */
            /* Portrait */
            @media only screen and (max-width: 640px) {
                .modalLobbyWRapp2custom12 {
                    --fSize: 9px; } }

            @media only screen and (max-width: 414px) {
                .modalLobbyWRapp2custom12 {
                    --fSize: 8px; }
                .modalLobbyWRapp2custom12 .modal-content {
                    padding-left: 16px;
                    padding-right: 16px; } }

            /*************************************** LANDSCAPE ****************************************/
            /* ----------- iPad Pro 12.9" ----------- */
            /* iPad landscape */
            @media only screen and (max-width: 850px) and (orientation: landscape) {
                .modalLobbyWRapp2custom12 {
                    --fSize: 7px; }
                .modalLobbyWRapp2custom12 .modal-content {
                    padding-top: calc(6 * var(--fSize));
                    padding-bottom: calc(3 * var(--fSize));
                    padding-left: 16px;
                    padding-right: 16px; } }

        </style>
        <div class="modal">
        <div class="modal-body">
            <div class="modal-content">
            <p>${currentTranslation.totalPlayingText}</p>
            <p>${currentTranslation.totalBetText}</p>
            <p>${currentTranslation.totalWinText}</p>
            <p class="modal-question">${currentTranslation.continueText}</p>
            </div>
            <div class="modal-btns">
            <button class="btn btn-close">${currentTranslation.back}</button>
            <button class="btn btn-primary">${currentTranslation.continue}</button>
            </div>
        </div>
        </div>
    </div>
    `;

        popupDiv = document.createElement('div');
        popupDiv.innerHTML = popupHtml;
        document.body.appendChild(popupDiv);
        document.querySelector('.modalLobbyWRapp2custom12 .btn.btn-close').addEventListener('click', backHandler);
        document.querySelector('.modalLobbyWRapp2custom12 .btn.btn-primary').addEventListener('click', continueHandler);
        popupDiv.style.display = 'none';
    }
})();
