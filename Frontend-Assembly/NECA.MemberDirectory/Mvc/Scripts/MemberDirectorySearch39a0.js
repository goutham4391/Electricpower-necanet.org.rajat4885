(function ($) {

    // Constants and Hard-Coded Values
    const widgetType = {
        SEARCH: 10,
        RESULTS: 20,
        DETAIL: 30
    }
    const resultsType = {
        PAGENUMBER: 10,
        LOADMORE: 20
    }
    const memberDirectoryApiUrlLocation = '/api/md/query/';
    const chapterApiUrlLocation = '/api/chapters/';
    const defaultLocalStorageExpirationMinutes = 5;
    const defaultGroupSize = 4;
    const defaultPageSize = 12;
    const defaultCountryCode = 'United States';
    const sectors = [
        { key: 'Commercial, Industrial or Institutional', value: '1' },
        { key: 'Residential', value: '2' },
        { key: 'Non-Building', value: '3' }
    ];
    const specialties = [
        { key: 'Building Automation Systems', value: '1' },
        { key: 'Building Renovation', value: '2' },
        { key: 'Cable Splicing', value: '3' },
        { key: 'CATV', value: '4' },
        { key: 'Combined Heat & Power', value: '5' },
        { key: 'Commercial, Industrial, Institutional', value: '6' },
        { key: 'Communications & Networking Systems', value: '7' },
        { key: 'Data Centers', value: '8' },
        { key: 'Electrical Testing', value: '9' },
        { key: 'Electrical Vehicle Charging Station', value: '10' },
        { key: 'Energy Audits', value: '11' },
        { key: 'Energy Efficiency & Conservation', value: '12' },
        { key: 'Energy Management,Power Qualitiy&Energy Monitoring', value: '13' },
        { key: 'Energy Storage', value: '14' },
        { key: 'Fire & Life Safety', value: '15' },
        { key: 'Fuel Cell', value: '16' },
        { key: 'Geothermal', value: '17' },
        { key: 'Green Building & Sustainable Construction', value: '18' },
        { key: 'Industrial Controls', value: '19' },
        { key: 'Instrumentation', value: '20' },
        { key: 'Lighting Controls', value: '21' },
        { key: 'Lighting Install, Maintenance & Service', value: '22' },
        { key: 'Lighting Retrofit', value: '23' },
        { key: 'Marine', value: '24' },
        { key: 'Microgrid', value: '25' },
        { key: 'Motor Repair', value: '26' },
        { key: 'Power Generation', value: '27' },
        { key: 'Remote System Management', value: '28' },
        { key: 'Residential', value: '29' },
        { key: 'Security System, CCTV & Access Control', value: '30' },
        { key: 'Service & Maintenance', value: '31' },
        { key: 'Signage', value: '32' },
        { key: 'Smart Grid', value: '33' },
        { key: 'Smart or Net Metering', value: '34' },
        { key: 'Solar', value: '35' },
        { key: 'Sound & Video', value: '36' },
        { key: 'Storm Management & Recovery', value: '37' },
        { key: 'Street Lighting & Traffic Control', value: '38' },
        { key: 'Structured Wiring & Cabling', value: '39' },
        { key: 'Substations', value: '40' },
        { key: 'Transmission & Distribution', value: '41' },
        { key: 'Tree Trimming/Line Clearance', value: '42' },
        { key: 'Underground', value: '43' },
        { key: 'Wind', value: '44' }
    ];
    const designations = [
        { key: 'Building Industry Consulting Service', value: '1' },
        { key: 'California Advanced Lighting Control Training Prog', value: '2' },
        { key: 'Disabled Veteran Owned', value: '3' },
        { key: 'Electric Vehicle Infrastructure Training Program', value: '4' },
        { key: 'Leadership in Energy & Environmental Design', value: '5' },
        { key: 'Minority-Owned Business', value: '6' },
        { key: 'N American Board of Certified Energy Practitioners', value: '7' },
        { key: 'NECA Project Development', value: '8' },
        { key: 'PACE', value: '9' },
        { key: 'SBA Small Business', value: '10' },
        { key: 'Veteran Owned', value: '11' },
        { key: 'Women-Owned Business', value: '12' }
    ];
    const countries = [
        { key: 'Australia', value: 'Australia' },
        { key: 'Bahamas', value: 'Bahamas' },
        { key: 'Belarus', value: 'Belarus' },
        { key: 'Bermuda', value: 'Bermuda' },
        { key: 'Canada', value: 'Canada' },
        { key: 'Cayman Islands', value: 'Cayman Islands' },
        { key: 'Grenada', value: 'Grenada' },
        { key: 'Honduras', value: 'Honduras' },
        { key: 'Ireland', value: 'Ireland' },
        { key: 'Japan', value: 'Japan' },
        { key: 'South Korea', value: 'South Korea' },
        { key: 'Mexico', value: 'Mexico' },
        { key: 'New Zealand', value: 'New Zealand' },
        { key: 'United Kingdom', value: 'United Kingdom' },
        { key: 'United States', value: 'United States' }
    ];
    const states = [
        { code: 'United States', key: 'Alabama', value: 'AL' },
        { code: 'United States', key: 'Alaska', value: 'AK' },
        { code: 'United States', key: 'Arizona', value: 'AZ' },
        { code: 'United States', key: 'Arkansas', value: 'AR' },
        { code: 'United States', key: 'California', value: 'CA' },
        { code: 'United States', key: 'Colorado', value: 'CO' },
        { code: 'United States', key: 'Connecticut', value: 'CT' },
        { code: 'United States', key: 'Delaware', value: 'DE' },
        { code: 'United States', key: 'Florida', value: 'FL' },
        { code: 'United States', key: 'Georgia', value: 'GA' },
        { code: 'United States', key: 'Hawaii', value: 'HI' },
        { code: 'United States', key: 'Idaho', value: 'ID' },
        { code: 'United States', key: 'Illinois', value: 'IL' },
        { code: 'United States', key: 'Indiana', value: 'IN' },
        { code: 'United States', key: 'Iowa', value: 'IA' },
        { code: 'United States', key: 'Kansas', value: 'KS' },
        { code: 'United States', key: 'Kentucky', value: 'KY' },
        { code: 'United States', key: 'Louisiana', value: 'LA' },
        { code: 'United States', key: 'Maine', value: 'ME' },
        { code: 'United States', key: 'Maryland', value: 'MD' },
        { code: 'United States', key: 'Massachusetts', value: 'MA' },
        { code: 'United States', key: 'Michigan', value: 'MI' },
        { code: 'United States', key: 'Minnesota', value: 'MN' },
        { code: 'United States', key: 'Mississippi', value: 'MS' },
        { code: 'United States', key: 'Missouri', value: 'MO' },
        { code: 'United States', key: 'Montana', value: 'MT' },
        { code: 'United States', key: 'Nebraska', value: 'NE' },
        { code: 'United States', key: 'Nevada', value: 'NV' },
        { code: 'United States', key: 'New Hampshire', value: 'NH' },
        { code: 'United States', key: 'New Jersey', value: 'NJ' },
        { code: 'United States', key: 'New Mexico', value: 'NM' },
        { code: 'United States', key: 'New York', value: 'NY' },
        { code: 'United States', key: 'North Carolina', value: 'NC' },
        { code: 'United States', key: 'North Dakota', value: 'ND' },
        { code: 'United States', key: 'Ohio', value: 'OH' },
        { code: 'United States', key: 'Oklahoma', value: 'OK' },
        { code: 'United States', key: 'Oregon', value: 'OR' },
        { code: 'United States', key: 'Pennsylvania', value: 'PA' },
        { code: 'United States', key: 'Rhode Island', value: 'RI' },
        { code: 'United States', key: 'South Carolina', value: 'SC' },
        { code: 'United States', key: 'South Dakota', value: 'SD' },
        { code: 'United States', key: 'Tennessee', value: 'TN' },
        { code: 'United States', key: 'Texas', value: 'TX' },
        { code: 'United States', key: 'Utah', value: 'UT' },
        { code: 'United States', key: 'Vermont', value: 'VT' },
        { code: 'United States', key: 'Virginia', value: 'VA' },
        { code: 'United States', key: 'Washington', value: 'WA' },
        { code: 'United States', key: 'West Virginia', value: 'WV' },
        { code: 'United States', key: 'Wisconsin', value: 'WI' },
        { code: 'United States', key: 'Wyoming', value: 'WY' },
        //{ code: 'Canada', key: '', value: '' },
        { code: 'Canada', key: 'Alberta', value: 'AB' },
        { code: 'Canada', key: 'British Columbia', value: 'BC' },
        { code: 'Canada', key: 'Manitoba', value: 'MB' },
        { code: 'Canada', key: 'New Brunswick', value: 'NB' },
        { code: 'Canada', key: 'Newfoundland and Labrador', value: 'NL' },
        { code: 'Canada', key: 'Northwest Territories', value: 'NT' },
        { code: 'Canada', key: 'Nova Scotia', value: 'NS' },
        { code: 'Canada', key: 'Nunavut', value: 'NU' },
        { code: 'Canada', key: 'Ontario', value: 'ON' },
        { code: 'Canada', key: 'Prince Edward Island', value: 'PE' },
        { code: 'Canada', key: 'Quebec', value: 'QC' },
        { code: 'Canada', key: 'Saskatchewan', value: 'SK' },
        { code: 'Canada', key: 'Yukon', value: 'YT' }
    ];

    initialize();

    // Component Initialization
    function initialize() {
        var tp = getUrlParameter('tp');
        if ($('.md-search .form-search-member')[0]) initSearch('Member', tp === '1');
        if ($('.md-search .form-search-nonmember')[0]) initSearch('NonMember', tp === '2');
        if ($('.md-results')[0]) initResults();
        if ($('.md-detail')[0]) initDetail();
    }
    function initDetail() {
        // Grab unique Nimble Id
        var nimbleId = getUrlParameter('nid');
        if (!nimbleId) return;

        splash(true, widgetType.DETAIL);

        $.ajax({
            url: memberDirectoryApiUrlLocation + nimbleId,
            type: 'GET',
            cache: false,
            headers: { 'Content-Type': 'application/json' },
            success: (data) => {
                if (data) $('.md-detail')[0].innerHTML = populateMemberDetail(JSON.parse(data));
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error retrieving member details');
                console.log(errorThrown);
            }, complete: function () {
                splash(false, widgetType.DETAIL);
            }
        });
    }
    function initResults() {
        loadResults(1, resultsType.PAGENUMBER);
    }
    function initSearch(dataType, populateFromQuery) {
        // Allow form widget to be added twice on same page
        // This is actually not required, but code is handling this
        var formInputSelectorClass = '.form-search-' + dataType.toLowerCase();
        var scopeSelector = function (ext) { return formInputSelectorClass + ' ' + ext; }

        // Listeners
        $(scopeSelector('input[type="submit"]')).click(function (e) {
            e.preventDefault();
            var resultsLocation = $('#ResultsPagePath');
            if (resultsLocation) {
                var redirectUrl = generateResultsUrl(dataType, resultsLocation.val());
                if (redirectUrl === resultsLocation.val()) alert('Please refine your search');
                else window.location = redirectUrl;
            }
        });
        $(scopeSelector('input[type="reset"]')).click(function (e) {
            e.preventDefault();
            resetSearchForm(dataType);
        });
        if (dataType === 'Member') {
            $(scopeSelector('select[name="country"]')).change(function () {
                var selection = this.value;
                var options = states.filter(function (c) { return c.code === selection; });
                populateList(scopeSelector('select[name="state"]'), options, null, true, 'State')
            });
        }

        // Pre-populate values from search if they exist
        if (populateFromQuery) {
            var allInputs = $(scopeSelector('input[type="text"]'));
            for (var i = 0; i < allInputs.length; i++) {
                var param = getUrlParameter(allInputs[i].getAttribute('name'));
                if (param) allInputs[i].value = param;
            }
        }

        // Populate Select Checkbox Lists
        if (dataType === 'NonMember') {
            populateCheckList(scopeSelector('ul[name="sectors"]'), sectors);
            populateCheckList(scopeSelector('ul[name="designations"]'), designations);
            populateCheckList(scopeSelector('ul[name="specialties"]'), specialties);

            if (populateFromQuery) {
                param = getUrlParameter('sectors');
                if (param) preselectCheckList(scopeSelector('ul[name="sectors"]'), param);
                param = getUrlParameter('designations');
                if (param) preselectCheckList(scopeSelector('ul[name="designations"]'), param);
                param = getUrlParameter('specialties');
                if (param) preselectCheckList(scopeSelector('ul[name="specialties"]'), param);
            }
        }

        // Country Select and Populate
        var selection = null;
        if (dataType === 'Member') {
            populateList(scopeSelector('select[name="country"]'), countries, selection, false, 'Country');
            var param = getUrlParameter('country');
            if (param && populateFromQuery) {
                var element = $(scopeSelector('select[name="country"]'));
                element.val(param);
                selection = param;
            }
        }
        else {
            selection = defaultCountryCode;
        }

        // State
        var options = states.filter(function (c) { return c.code === selection; });
        populateList(scopeSelector('select[name="state"]'), options, null, false, 'State')

        var param = getUrlParameter('state');
        if (param && populateFromQuery) {
            var element = $(scopeSelector('select[name="state"]'));
            element.val(param);
        }
        
        // Chapters Select and Population
        if (dataType === 'Member') {
            var populateChapterDropdown = function (data) {
                var chapters = JSON.parse(data);
                var mapArray = chapters.map(function (c) { return { key: c.ChapterName, value: c.ChapterId } });
                var sortedArray = mapArray.sort(function (a, b) {
                    if (a.key < b.key) { return -1; }
                    if (a.key > b.key) { return 1; }
                    return 0;
                })

                populateList(scopeSelector('select[name="chapter"]'), sortedArray, null, false, 'Chapter');

                var param = getUrlParameter('chapter');
                //var element = $(scopeSelector('select[name="chapter"]'));
                //element.prepend('<option value=""></option>');
                if (param && populateFromQuery) {
                    $(scopeSelector('select[name="chapter"] option[value="' + param + '"]')).attr('selected', true);
                }
            }

            var cachedChapters = getCacheItem('sitefinityChapters');
            if (cachedChapters) {
                populateChapterDropdown(cachedChapters);
                $(formInputSelectorClass).show();
            } else {
                splash(true, widgetType.SEARCH);
                $.ajax({
                    url: chapterApiUrlLocation + 'all',
                    type: 'GET',
                    cache: false,
                    headers: { 'Content-Type': 'application/json' },
                    success: (data) => {
                        if (data) {
                            addCacheItem('sitefinityChapters', data, defaultLocalStorageExpirationMinutes);
                            populateChapterDropdown(data);
                            $(formInputSelectorClass).show();
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        console.log('Error retrieving chapters');
                        console.log(errorThrown);
                    }, complete: function () {
                        splash(false, widgetType.SEARCH);
                    }
                });
            }
        } else {
            $(formInputSelectorClass).show();
        }
    }

    // Various Methods
    function createGetResultsRequestObject(pageNumber) {
        var pageSize = $('#PageSize').val();
        if (!pageSize) pageSize = defaultPageSize;

        var mapKeyValues = function (pairs, paramValues) {
            if (paramValues === null) return null;
            var values = paramValues.split(';');
            if (values.length === 0) return null;
            var keys = [];
            for (var i = 0; i < values.length; i++) {
                var match = pairs.filter(function (p) { return p.value === values[i]; })[0];
                if (match) keys.push(match.key);
            }
            if (keys.length === 0) return null;
            return keys;
        }

        var maximumRecords = $('#MaximumRecords').val();
        var dataType = $('.md-results input[name="DataType"]').val();

        var initObj = {
            'PageNumber': pageNumber,
            'PageSize': pageSize,
            'DataType': dataType,
            'RecordLimit': maximumRecords,
            'CompanyName': getUrlParameter('companyname'),
            'Country': getUrlParameter('country'),
            'State': getUrlParameter('state'),
            'City': getUrlParameter('city'),
            'FederalId': getUrlParameter('federal-id'),
            'Zip': getUrlParameter('zip'),
            'Chapter': getUrlParameter('chapter'),
            'Specialties': mapKeyValues(specialties, getUrlParameter('specialties')),
            'Designations': mapKeyValues(designations, getUrlParameter('designations')),
            'Sectors': mapKeyValues(sectors, getUrlParameter('sectors')),
        };

        var postObj = {};
        Object.keys(initObj).forEach(function (key) {
            if (initObj[key] !== null) postObj[key] = initObj[key];
        });

        return postObj;
    }
    function loadResults(pageNumber, resultsPreviewType) {
        var searchLocation = $('#SearchPagePath');
        if (searchLocation) $('.md-results .go-back').attr('href', searchLocation.val() + decodeURIComponent(window.location.search));

        var showResults = function (value) {
            if (value) {
                $('.paginated-results .has-results').show();
                $('.paginated-results .no-results').hide();
            } else {
                $('.paginated-results .has-results').hide();
                $('.paginated-results .no-results').show();
            }
        }

        var dataObject = createGetResultsRequestObject(pageNumber);
        // This may not be required (disable load without criteria)
        if (Object.keys(dataObject).length <= 4) return;

        if (resultsPreviewType === resultsType.PAGENUMBER || pageNumber === 1)
            splash(true, widgetType.RESULTS);

        $('.md-results .paginated-results').hide();
        $.ajax({
            url: memberDirectoryApiUrlLocation,
            type: 'POST',
            cache: false,
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(dataObject),
            success: (results) => {
                if (results) {
                    var resultsObject = JSON.parse(results);
                    if (resultsObject.PageItems.length > 0) {
                        // Populate Results
                        if (resultsPreviewType === resultsType.PAGENUMBER) populatePaginationResults(resultsObject);
                        else populateLoadMoreResults(resultsObject, pageNumber);
                        showResults(true);
                    } else showResults(false);
                    $('.md-results .paginated-results').show();
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error retrieving member search results');
                console.log(errorThrown);
            }, complete: function () {
                if (resultsPreviewType === resultsType.PAGENUMBER || pageNumber === 1) 
                    splash(false, widgetType.RESULTS);
            }
        });
    }
    function resetSearchForm(dataType) {
        var formInputSelectorClass = '.form-search-' + dataType.toLowerCase();
        var scopeSelector = function (ext) { return formInputSelectorClass + ' ' + ext; }

        var allInputs = $(scopeSelector('input[type="text"]'));
        for (var i = 0; i < allInputs.length; i++) allInputs[i].value = '';

        var allSelects = $(scopeSelector('select:not([multiple])'));
        for (var i = 0; i < allSelects.length; i++) allSelects[i].value = '';

        if (dataType === 'NonMember') {
            $(scopeSelector(' ul[name="sectors"] input:checked')).each(function () { this.checked = false; });
            $(scopeSelector(' ul[name="designations"] input:checked')).each(function () { this.checked = false; });
            $(scopeSelector(' ul[name="specialties"] input:checked')).each(function () { this.checked = false; });
        }

        if (dataType === 'Member') {
            var selection = null;
            $(scopeSelector('select[name="country"]')).val(selection);
            var options = states.filter(function (c) { return c.code === selection; });
            populateList(scopeSelector('select[name="state"]'), options, null, true, 'State')
        }
    }
    function generateResultsUrl(dataType, url) {
        var formInputSelectorClass = '.form-search-' + dataType.toLowerCase();
        var scopeSelector = function (ext) { return formInputSelectorClass + ' ' + ext; }

        // Minimum search parameters (client validation)
        var searchParametersCounter = 0;
        var minimumSearchParameters = $(scopeSelector('input[name="MinimumSearchParameters"]')).val();
        if (!minimumSearchParameters) minimumSearchParameters = '1';

        // Text Fields
        var resultUrl = url;
        var allInputs = $(scopeSelector(' input[type="text"]'));
        for (var i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value && allInputs[i].value.trim() !== '') {
                resultUrl = addUrlParameter(resultUrl, allInputs[i].getAttribute('name'), allInputs[i].value)
                searchParametersCounter++;
            }
        }

        var element = undefined;
        var selectedValue = undefined;

        if (dataType === 'Member') {
            element = $(scopeSelector(' select[name="chapter"]'));
            selectedValue = element.val();
            if (selectedValue && selectedValue.length > 0) {
                resultUrl = addUrlParameter(resultUrl, 'chapter', selectedValue);
                searchParametersCounter++;
            }

            element = $(scopeSelector(' select[name="country"]'));
            selectedValue = element.val();
            if (selectedValue && selectedValue.length > 0) {
                resultUrl = addUrlParameter(resultUrl, 'country', selectedValue);
                searchParametersCounter++;
            }
        }

        if (dataType === 'NonMember') {
            var queryItems = [];
            $(scopeSelector(' ul[name="sectors"] input:checked')).each(function () {
                queryItems.push(this.value);
            });
            if (queryItems.length > 0) {
                resultUrl = addUrlParameter(resultUrl, 'sectors', queryItems.join(';'));
                searchParametersCounter++;
            }

            queryItems = [];
            $(scopeSelector(' ul[name="designations"] input:checked')).each(function () {
                queryItems.push(this.value);
            });
            if (queryItems.length > 0) {
                resultUrl = addUrlParameter(resultUrl, 'designations', queryItems.join(';'));
                searchParametersCounter++;
            }

            queryItems = [];
            $(scopeSelector(' ul[name="specialties"] input:checked')).each(function () {
                queryItems.push(this.value);
            });
            if (queryItems.length > 0) {
                resultUrl = addUrlParameter(resultUrl, 'specialties', queryItems.join(';'));
                searchParametersCounter++;
            }
        }
        
        element = $(scopeSelector(' select[name="state"]'));
        var isDisabled = $(element).is(':disabled');
        if (!isDisabled) {
            selectedValue = element.val();
            if (selectedValue && selectedValue.length > 0) {
                resultUrl = addUrlParameter(resultUrl, 'state', selectedValue);
                searchParametersCounter++;
            }
        }

        if (searchParametersCounter < Number(minimumSearchParameters)) return url;

        resultUrl = addUrlParameter(resultUrl, 'tp', dataType === 'Member' ? '1': '2');

        return resultUrl;
    }
    function splash(val, componentType) {
        var selector = '';
        switch (componentType) {
            case widgetType.SEARCH:
                selector = '.md-search .splash';
                break;
            case widgetType.RESULTS:
                selector = '.md-results .splash';
                break;
            case widgetType.DETAIL:
                selector = '.md-detail .splash';
                break;
            default:
                return;
        }
        if (val) $(selector).show();
        else $(selector).hide();
    }


    // DOM-Markup Population
    function populateMemberResultsCard(member, detailLocation) {
        var html = ''
        var listitem = document.createElement('li');

        listitem.className = "ms-results__result";
        var detailUrl = addUrlParameter(detailLocation + decodeURIComponent(window.location.search), 'nid', member.NimbleId);

        html = '<h3 class="ms-results__title text-black">' + '<a class="ms-results__title-link" href=' + detailUrl + '>' + member.Name + '</a></h3>';
        html += member.Street ? '<p>' + member.Street + '<br>' : '';
        html += member.City + ', ' + member.StateCode + ' ' + member.Zip + '</p>';
        html += '<p class="sans-margin-bottom"><span class="text-bold">Phone:</span> ' + (member.Phone ? member.Phone : '(unlisted)') + '</p>';        
        if (member.Fax) html += '<p class="sans-margin-bottom"><span class="text-bold">Fax:</span> ' + member.Fax + '</p>';
        html += '<p class="sans-margin-bottom"><span class="text-bold">Email:</span> ' + (member.Email ? member.Email : '(unlisted)') + '</p>';
        if (member.Website) html += '<a class="blue" href="http://' + member.Website + '">' + member.Website + '</a>';
        html += '<div class="ms-results__chapter"> <div class="ms-results__divider"></div> <p> <span class="text-black">' + (member.HasPrimaryAffiliation ? member.PrimaryAffiliationName : member.ChapterName) + (member.DivisionNameLocalUnion ? '</span><br>' + member.DivisionNameLocalUnion : '') + '</p></div>';
        html += '<p class="text-black">' + '<a class="blue" href=' + detailUrl + '>' + 'View Details' + '</a></p>';

        listitem.innerHTML = html;
        return listitem;
    }
    function populateMemberDetail(member) {

        var html = '';
        var resultsLocation = $('#ResultsPagePath');
        if (resultsLocation) html += '<div class="container"><a class="go-back" href="' + removeUrlParameter(resultsLocation.val()
            + decodeURIComponent(window.location.search), 'nid') + '">Back to Search Results</a></div>';
        html += '<div class="blue-gradient-background md-detail__header">';
        html += '<h1 class="text-black md-detail__title">' + member.Name + '</h1>';
        html += '<div class="md-detail__chapter-name"><h3><span class="text-bold">' + (member.HasPrimaryAffiliation ? member.PrimaryAffiliationName : member.ChapterName) + (member.DivisionNameLocalUnion ? '</span><br>' + member.DivisionNameLocalUnion : '') + '</h3></div>';
        html += '</div>'

        html += '<div class="grey-background-lighter">';
        html += '<div class="container">';
        html += '<div class="md-detail__member-info">';
        html += '<div class="md-detail__member-info-col">';
        html += '<h3 class="text-bold md-detail__member-info-title">Membership</h3>';
        if (!member.AccreditedRepresentative && !member.AccreditedRepresentativeId && !member.FederalId && !member.MembershipId) html += '<p><span class="text-bold">Not Available</p>';
        else {
            if (member.MembershipId) html += '<p><span class="text-bold">Company Membership ID#:</span> ' + member.MembershipId + '</p>';
            if (member.AccreditedRepresentative) html += '<p><span class="text-bold">Accredited Rep:</span> ' + member.AccreditedRepresentative + '</p>';
            if (member.AccreditedRepresentativeId) html += '<p><span class="text-bold">Accredited Rep ID#:</span> ' + member.AccreditedRepresentativeId + '</p>';
            if (member.FederalId) html += '<p><span class="text-bold">Federal ID#:</span> ' + member.FederalId + '</p>';
        }
        html += '</div>'

        html += '<div class="md-detail__member-info-col">';
        html += '<h3 class="text-bold md-detail__member-info-title">Contact Information</h3>';
        html += '<p><span class="text-bold">Phone:</span> ' + (member.Phone ? '<a href="tel:' + member.Phone + '">' + member.Phone + '</a>' : '(unlisted)') + '</p>';
        if (member.Fax) html += '<p><span class="text-bold">Fax:</span> ' + (member.Fax ? member.Fax : '(unlisted)') + '</p>';
        html += '<p><span class="text-bold">Email:</span> ' + (member.Email ? '<a href="mailto:' + member.Email + '">' + member.Email + '</a>' : '(unlisted)') + '</p>';
        if (member.Website) html += '<p><span class="text-bold">Website:</span> <a href="http://' + member.Website + '">' + member.Website + '</a></p>';
        html += '</div>'

        html += '<div class="md-detail__member-info-col">';
        html += '<h3 class="text-bold md-detail__member-info-title">Location</h3>';
        html += member.Street ? '<p>' + member.Street + '<br>' : '';
        html += member.City + ', ' + member.StateCode + ' ' + member.Zip + '</p>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>'

        html += '<div class="md-detail__project-work">';
        html += '<div class="container">';
        html += '<h2 class="h1 md-detail__section-title text-white"><span class="text-black">Project Work</span>/Criteria</h2>';
        html += '<div class="md-detail__project-work-detail">';
        if (member.SmallProjectSize || member.LargestProjectSize) html += '<div class="md-detail__project-work-detail-col">';
        if (member.SmallProjectSize) html += '<p><span class="text-black">Smallest Project Size</span> ' + '<br/>' + '$' + member.SmallProjectSize.toLocaleString() + '<br/>' + '-' + '</p>';
        if (member.LargestProjectSize) html += '<p><span class="text-black">Smallest Project Size</span> ' + '<br/>' + '$' + member.LargestProjectSize.toLocaleString()  + '<br/>' + '-' + '</p>';
        if (member.SmallProjectSize || member.LargestProjectSize) html += '</div>';

        if (member.LargestSingleProjectSize || member.TotalBondingCapacityAmount) html += '<div class="md-detail__project-work-detail-col">';
        if (member.LargestSingleProjectSize) html += '<p><span class="text-black">Largest Single Project Size Can Bond</span> ' + '<br/>' + '$' + member.LargestSingleProjectSize.toLocaleString() + '<br/>' + '-' + '</p>';
        if (member.TotalBondingCapacityAmount) html += '<p><span class="text-black">Total Bonding Capacity Amount</span> ' + '<br/>' + '$' + member.TotalBondingCapacityAmount.toLocaleString() + '<br/>' + '-' + '</p>';
        if (member.LargestSingleProjectSize || member.TotalBondingCapacityAmount) html += '</div>';

        if (member.IsCompanyBonded !== undefined || member.DoDesignBuildWork !== undefined)
        {
        html += '<div class="md-detail__project-work-detail-col">';
        html += '<p><span class="text-black">Bonded?</span> ' + '<br/>' + (member.IsCompanyBonded !== undefined ? (member.IsCompanyBonded ? 'Yes' : 'No') : '-') + '</p>';
        html += '<p><span class="text-black">Design/Build Work</span> ' + '<br/>' + (member.DoDesignBuildWork !== undefined ? (member.DoDesignBuildWork ? 'Yes' : 'No') : '-') + '</p>';
        html += '</div>';
        }

        html += '</div>';
        html += '</div>';
        html += '</div>'

        html += '<div class="container padding-large">'
        html += '<h2 class="h1 md-detail__section-title"><span class="text-black">Services</span> Provided</h2>';
        html += '<div class="md-detail__specialties">';

        if (member.CommercialSpecialties && member.CommercialSpecialties.length) {
            html += '<div class="md-detail__specialties-col">';
            html += '<h3 class="md-detail__specialties-title">Commercial / Industrial / Institutional</h3>';
            html += '<ul class="md-detail__specialties-list">';
            for (var i = 0; i < member.CommercialSpecialties.length; i++) {
                html += '<li>' + member.CommercialSpecialties[i] + '</li>';
            }
            html += '</ul>';
            html += '</div>'
        }
        if (member.ResidentialSpecialties && member.ResidentialSpecialties.length) {
            html += '<div class="md-detail__specialties-col">';
            html += '<h3 class="md-detail__specialties-title">Residential</h3>';
            html += '<ul class="md-detail__specialties-list">';
            for (var i = 0; i < member.ResidentialSpecialties.length; i++) {
                html += '<li>' + member.ResidentialSpecialties[i] + '</li>';
            }
            html += '</ul>';
            html += '</div>'
        }
        if (member.NonBuildingSolutions && member.NonBuildingSolutions.length) {
            html += '<div class="md-detail__specialties-col">';
            html += '<h3 class="md-detail__specialties-title">Non-Building (Utility, Municipal, etc.)</h3>';
            html += '<ul class="md-detail__specialties-list">';
            for (var i = 0; i < member.NonBuildingSolutions.length; i++) {
                html += '<li>' + member.NonBuildingSolutions[i] + '</li>';
            }
            html += '</ul>';
            html += '</div>'
        }
        if (member.Certifications && member.Certifications.length) {
            html += '<div class="md-detail__specialties-col">';
            html += '<h3 class="md-detail__specialties-title">Certifications</h3>';
            html += '<ul class="md-detail__specialties-list">';
            for (var i = 0; i < member.Certifications.length; i++) {
                html += '<li>' + member.Certifications[i] + '</li>';
            }
            html += '</ul>';
            html += '</div>'
        }
        if (member.ConstructionMethods && member.ConstructionMethods.length) {
            html += '<div class="md-detail__specialties-col">';
            html += '<h3 class="md-detail__specialties-title">Construction Methods</h3>';
            html += '<ul class="md-detail__specialties-list">';
            for (var i = 0; i < member.ConstructionMethods.length; i++) {
                html += '<li>' + member.ConstructionMethods[i] + '</li>';
            }
            html += '</ul>';
            html += '</div>'
        }
        if (member.CompanyDesignations && member.CompanyDesignations.length) {
            html += '<div class="md-detail__specialties-col">';
            html += '<h3 class="md-detail__specialties-title">Construction Methods</h3>';
            html += '<ul class="md-detail__specialties-list">';
            for (var i = 0; i < member.CompanyDesignations.length; i++) {
                html += '<li>' + member.CompanyDesignations[i] + '</li>';
            }
            html += '</ul>';
            html += '</div>'
        }
        html += '</div>';
        html += '</div>'

        // Additional fields not in designs
        // member.Certifications
        // member.ConstructionMethods
        // member.CompanyDesignations

        // Private (conditional) additional fields not in designs
        // member.SmallProjectSize
        // member.LargestProjectSize
        // member.LargestSingleProjectSize
        // member.TotalBondingCapacityAmount

        return html;
    }
    function populatePaginationResults(results) {
        // Populate Results List
        var detailLocation = $('#DetailPagePath').val();
        var unorderedListGrid = $('.member-grid');
        unorderedListGrid.html('');
        for (var i = 0; i < results.PageItems.length; i++) {
            var cardListItem = populateMemberResultsCard(results.PageItems[i], detailLocation);
            unorderedListGrid.append(cardListItem);
        }

        // Populate Pagination Section
        var unorderedListPaginations = document.getElementsByClassName('member-pagination');
        for (i = 0; i < unorderedListPaginations.length; i++) {
            var unorderedListPagination = unorderedListPaginations[i];
            unorderedListPagination.innerHTML = '';
            unorderedListPagination.parentNode.removeChild(unorderedListPagination.nextSibling)
            populatePaginationSection(unorderedListPagination, results);

            // Populate Pagination Total
            var span = document.createElement('span');
            span.innerHTML = 'Viewing ' + results.PageItems.length + ' of ' + results.TotalItems + ' Results';
            unorderedListPagination.parentNode.insertBefore(span, unorderedListPagination.nextSibling)
        }
    }
    function populatePaginationSection(unorderedList, results) {
        var createLinkListItem = function (targetPage, text, isCurrentPage) {
            var newText = text;
            var listitem = document.createElement('li');
            listitem.className = "ms-pagination__page-number";
            if (!isCurrentPage && targetPage > 0) listitem.onclick = function () { return loadResults(targetPage, resultsType.PAGENUMBER); }
            else if (targetPage > 0) newText = '<strong>' + newText + '</strong>';
            listitem.innerHTML = newText;
            return listitem;
        }

        //if (results.CurrentPage !== 1) {
        //    unorderedList.append(createLinkListItem(1, '<<', false));
        //}
        if (results.HasPreviousPage) {
            unorderedList.append(createLinkListItem(results.PreviousPage, '<', false));
        }

        var pageLinkItems = [];
        if (results.CurrentPage > defaultGroupSize) {
            pageLinkItems.push({ page: 1, text: '1' });
            pageLinkItems.push({ page: 0, text: '...' });
        }

        var mod = results.CurrentPage % defaultGroupSize;
        var groupStartPos = (((results.CurrentPage - mod) === results.CurrentPage) ? (results.CurrentPage - defaultGroupSize) : (results.CurrentPage - mod)) + 1;
        var groupEndPos = (groupStartPos + defaultGroupSize > results.TotalPages) ? results.TotalPages + 1 : groupStartPos + defaultGroupSize;
        for (var i = groupStartPos; i < groupEndPos; i++) {
            pageLinkItems.push({ page: i, text: i.toString() });
        }

        mod = results.TotalPages % defaultGroupSize;
        if (results.CurrentPage <= results.TotalPages - (mod === 0 ? defaultGroupSize : mod)) {
            pageLinkItems.push({ page: 0, text: '...' });
            pageLinkItems.push({ page: results.TotalPages, text: results.TotalPages.toString() });
        }

        for (var i = 0; i < pageLinkItems.length; i++) {
            unorderedList.append(createLinkListItem(pageLinkItems[i].page, pageLinkItems[i].text, pageLinkItems[i].page === results.CurrentPage));
        }

        if (results.HasNextPage) {
            unorderedList.append(createLinkListItem(results.NextPage, '>', false));
        }
        //if (results.CurrentPage !== results.TotalPages) {
        //    unorderedList.append(createLinkListItem(results.TotalPages, '>>', false));
        //}
    }
    function populateLoadMoreResults(results, pageNumber) {
        // Populate Results List
        var detailLocation = $('#DetailPagePath').val();
        var unorderedListGrid = $('.member-grid');
        for (var i = 0; i < results.PageItems.length; i++) {
            var cardListItem = populateMemberResultsCard(results.PageItems[i], detailLocation);
            unorderedListGrid.append(cardListItem);
        }

        // Remove Load More link if exists
        var btn = $('#btnLoadMoreMemberItems');
        if (btn) btn.remove();

        // Populate Load More Button/Link
        if (pageNumber * results.PageSize < results.TotalItems) {
            var unorderedListPagination = document.getElementsByClassName('member-pagination-load-more')[0];
            var loadMoreButton = document.createElement('button');
            loadMoreButton.id = 'btnLoadMoreMemberItems';
            loadMoreButton.innerHTML = 'Load More';
            loadMoreButton.onclick = function () { return loadResults(pageNumber + 1, resultsType.LOADMORE); }
            unorderedListPagination.parentNode.insertBefore(loadMoreButton, unorderedListPagination.nextSibling)
        }
    }

}(jQuery));