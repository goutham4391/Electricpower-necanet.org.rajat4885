// General Helper Methods for MVC Widgets

function getUrlParameter(param, url) {
    if (!url) url = location.href;
    param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

    var regex = new RegExp('[\\?&]' + param + '=([^&#]*)');
    var result = regex.exec(url);

    return result === null ? null : decodeURIComponent((result[1] + '').replace(/\+/g, '%20'));
}

function removeUrlParameter(url, key) {
    var returnUrl = url.split('?')[0] + '?';
    var location = decodeURIComponent(window.location.search.substring(1));
    var urlVariables = location.split('&');

    for (i = 0; i < urlVariables.length; i++) {
        var parameterName = urlVariables[i].split('=');
        if (parameterName[0] != key) returnUrl += parameterName[0] + '=' + parameterName[1] + '&';
    }

    return returnUrl.substring(0, returnUrl.length - 1);
}

function addUrlParameter(url, key, value) {
    key = encodeURIComponent(key);
    val = encodeURIComponent(value);

    var parsedUrl = new URL(url);
    var locationSearch = parsedUrl.search;

    var pair = key + '=' + val;

    var regex = new RegExp('(&|\\?)' + key + '=[^\&]*');
    locationSearch = locationSearch.replace(regex, '$1' + pair);

    if (!RegExp.$1) locationSearch += (locationSearch.length > 0 ? '&' : '?') + pair;
    parsedUrl.search = locationSearch;

    return parsedUrl.href;
}

function truncateDecimals(num) {
    return num < 0 ? Math.ceil(num) : Math.floor(num);
}

function addCacheItem(key, item, minutes) {
    var expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + minutes);
    var object = { value: item, expireDate: expireDate }
    localStorage.setItem(key, JSON.stringify(object));
}

function getCacheItem(key) {
    var object = JSON.parse(localStorage.getItem(key));
    if (object && object.expireDate) {
        var expireDate = new Date(object.expireDate);
        if ((new Date()) < expireDate) return object.value;
    }
    return null;
}

function addThousandSeparator(num) {
    num += '';
    var x = num.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}

function populateList(selector, options, selectedOptionValue, clear, disabledOptionText) {
    var select = $(selector);
    if (clear) {
        select.empty();
        if (disabledOptionText) {
            var option = document.createElement('option');
            option.setAttribute('hidden', true)
            option.setAttribute('selected', true)
            option.setAttribute('disabled', true)
            option.value = '';
            option.innerHTML = disabledOptionText;
            select.append(option);
        }
    }

    if (options && options.length > 0) {
        for (var i = 0; i < options.length; i++) {
            var option = document.createElement('option');

            option.value = options[i].value;
            option.innerHTML = options[i].key;

            if (option.value === selectedOptionValue) option.selected = true;

            select.append(option);
        }
        select.prop('disabled', false);
    } else {
        select.prop('disabled', true);
    }
}

function populateCheckList(selector, options) {
    var ul = $(selector); ul.empty();

    if (options && options.length > 0) {
        for (var i = 0; i < options.length; i++) {
            var li = document.createElement('li');
            var chk = document.createElement('input');
            var lbl = document.createElement('label');

            chk.type = 'checkbox';
            chk.value = options[i].value;
            lbl.innerHTML = options[i].key;

            li.append(chk);
            li.append(lbl);
            ul.append(li);
        }
    }
}

function preselectList(selector, values) {
    var selectedValues = values.split(';');
    for (var i = 0; i < selectedValues.length; i++) {
        $(selector + ' option[value="' + selectedValues[i] + '"]').attr('selected', true);
    }
}

function preselectCheckList(selector, values) {
    var selectedValues = values.split(';');
    for (var i = 0; i < selectedValues.length; i++) {
        $(selector + ' input[value="' + selectedValues[i] + '"]').attr('checked', true);
    }
}