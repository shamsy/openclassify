var filter = {};

filter.checkUser = () => {
    $.ajax({
        type: 'get',
        url: '/check_user',
        success: function (response) {
            if (response.success == true) {
                $('#search-fav-modal').modal('toggle');
            } else {
                window.location.replace("/login");
            }
        },
        error: function (err) {
            reject(Error("It broke"));
        }
    });
};

$('.sort-by-item').on('click', function () {
    let searchParams = new URLSearchParams(window.location.search);
    var sort_by = searchParams.get('sort_by');
    var url = window.location.href;
    if (url.slice(-1) === "#") {
        url = url.slice(0, -1);
    }
    var goURL = "";
    var value = $(this).attr('data-value');
    if (window.location.search == "") {
        goURL = url + "?sort_by=" + value;
    } else if (searchParams.has('sort_by')) {
        var parameters = "";
        if (value != 'all') {
            parameters = "sort_by=" + value;
        }
        goURL = location.href.replace("sort_by=" + sort_by, parameters);
    } else {
        goURL = url + "&sort_by=" + value;
    }
    window.location.replace(goURL);
});


$('.ad-info-right-bar-video').on('click', function () {
    $(".video-ad-tooltip-" + $(this).attr('data-id'))[0].play();
    $(".video-ad-tooltip-" + $(this).attr('data-id'))[0].controls = false;
});


$(document).ready(function () {
    let searchParams = new URLSearchParams(window.location.search);

    var checked = $('.cf-li-item input:checked');
    checked.each(function (index, option) {
        var elementName = ".span" + option.value;
        var name = $(elementName).html();
        $('.category-tabs').append('<button value="' + elementName + '" class="btn btn-success cat-tab">' + name + '</button>\n')
    });

    $("#min-price").val(searchParams.get('min-price'));
    $("#max-price").val(searchParams.get('max-price'));


    var sort_by = searchParams.get('sort_by');

    if (sort_by != null) {
        $('.sort-by-selected-text').html($('.sort-by-item[data-value=' + sort_by + ']').html());
    }


    $('#approved').on('click', function () {
        var id = $(this).val();
        var type = $(this).attr('id');
        $.ajax({
            type: 'get',
            url: '/admin/class/actions/' + id + "," + type,
            success: function (response) {
                hideLoader()
                $('#approved').html("Onaylandi");
                $('#declined').html('Reddet');
            },
            beforeSend: function () {
                showLoader()
            },
            error: function (err) {
                reject(Error("It broke"));
            }
        });
    });
    $('#declined').on('click', function () {
        var id = $(this).val();
        var type = $(this).attr('id');
        $.ajax({
            type: 'get',
            url: '/admin/class/actions/' + id + "," + type,
            success: function (response) {
                hideLoader()
                $('#declined').html('Reddedildi');
                $('#approved').html('Onayla');
            },
            beforeSend: function () {
                showLoader()
            },
            error: function (err) {
                reject(Error("It broke"));
            }
        });
    });
    $('#passive').on('click', function () {
        var id = $(this).val();
        var type = $(this).attr('id');
        $.ajax({
            type: 'get',
            url: '/admin/class/actions/' + id + "," + type,
            success: function (response) {
                hideLoader()
                $('#declined').html('Reddet');
                $('#approved').html('Onayla');
                $('#passive').html('Aktif Et').attr('id', 'pending_admin');
            },
            beforeSend: function () {
                showLoader()
            },
            error: function (err) {
                reject(Error("It broke"));
            }
        });
    });
    $('#pending_admin').on('click', function () {
        var id = $(this).val();
        var type = $(this).attr('id');
        $.ajax({
            type: 'get',
            url: '/admin/class/actions/' + id + "," + type,
            success: function (response) {
                hideLoader()
                $('#declined').html('Reddet');
                $('#approved').html('Onayla');
                $('#pending_admin').html('Pasif Et').attr('id', 'passive');
            },
            beforeSend: function () {
                showLoader()
            },
            error: function (err) {
                reject(Error("It broke"));
            }
        });
    });
    $('.cat-tab').on('click', function () {
        var value = $(this).val();
        $(value).prev('input').prop('checked', false);
        $(this).hide();
    });

    $('#save-search').on('click', function () {
        filter.checkUser();
    });

    // User filter
    $("select[name=filter_User]").select2({
        placeholder: $('select[name=filter_User] option:first-child').text()
    });

    // Country filter
    $("select[name=filter_country]").select2({
        placeholder: $('select[name=filter_country] option:first-child').text()
    });
});

$('.ad-info-right-bar-video').tooltip({
    animated: 'fade',
    placement: 'bottom',
    html: true
});

$("#listFilterForm").submit(function(e) {
    const inputs = $('#listFilterForm :input');
    [...inputs].forEach((input) => {
        if ($(input).val() == ""
            || $(input).prop("checked") == false
            || $(input).find(':selected').val() == "") {
            $(input).prop('disabled', true);
        }
    });
});