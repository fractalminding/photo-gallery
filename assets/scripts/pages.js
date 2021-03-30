$(function() {
    (function(name) {
        var container = $('#pagination-' + name);
        var sources = function () {
            var result = [];

            for (var i = 1; i <= 5000; i++) {
                result.push(i);
            }

            return result;
        }();

        var options = {
            dataSource: sources,
            pageSize: 100,
            callback: function (response, pagination) {
                // window.console && console.log(response, pagination);

                var dataHtml = '';
                $.each(response, function (index, item) {
                    // console.log(index)
                    $.ajax({
                        url: `https://jsonplaceholder.typicode.com/photos/${index+1}`,
                        type: 'GET',
                        dataType: 'json',
                        success: function(data) {              
                            // console.log(data)
                            dataHtml += `
                                <div class="photo" 
                                    style="
                                        background-image: url(${data.thumbnailUrl})">

                                </div>
                            `;
                            $('#photos').append(dataHtml);
                        },
                        async: false
                    });
                });
            }
        };

        //$.pagination(container, options);

        container.addHook('beforeInit', function () {
            window.console && console.log('beforeInit...');
        });
        container.pagination(options);

        container.addHook('beforePageOnClick', function () {
            window.console && console.log('beforePageOnClick...');
            //return false
        });
    })('demo1');
})