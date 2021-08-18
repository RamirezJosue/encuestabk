const form_quiz = $('#form_quiz');

$.getJSON('checklist.json', (data) => {
    const row = $('<div class="row">');
    row.appendTo(form_quiz);
    $.each(data, (d, descriptions) => {
        console.log(descriptions)
        const { descripcion, preguntas, id} = descriptions;
        const description = $('<div class="description">');
        const dTitle = $('<h4>').html(descripcion);
        row.append(description.append(dTitle));
        $.each(preguntas, (q, questions) => {
            const { desc_pre, id_pre, respuestas, type } = questions;
            const qTitle = $('<h6>').html(desc_pre);
            const question = $('<div class="question">');
            qTitle.appendTo(question);
            question.appendTo(description);
            $.each(respuestas, function (a, answers) {
                var { name, value } = answers;
                var answer = $('<div class="answers">');
                if (type === 'radiobutton') {
                    var ul = $('<ul class="list-unstyled">');
                    var item = $('<li> ' + name + '</li>');
                    var radio = $(`<input type="radio" name="${id_pre}${d}" value="${value}" />`);
                    radio.prependTo(item);
                    item.appendTo(ul);
                    ul.appendTo(answer);
                    answer.appendTo(question);

                } else if (type === 'range') {
                    // var range = $(`<input id="ex${id}${id_pre}${a}" name="range" type="number" />`);
                    // range.appendTo(answer);
                    // answer.appendTo(question);

                    // $(`#ex${id}${id_pre}${a}`).slider({
                    //     ticks: value,
                    //     ticks_labels: name,
                    //     ticks_snap_bounds: 10,
                    //     formatter: function (value) {
                    //         return 'Current value: ' + value;
                    //     }
                    // });

                    // $(`#ex${id}${id_pre}${a}`).on('change', function (event) {
                    //     var valor = {};
                    //     valor.id = id_pre;
                    //     if (event.value.newValue <= 3) {
                    //         valor.value = 0;
                    //     } else {
                    //         valor.value = 1;
                    //     }
                    //     upsert(valores, valor);
                    // });
                } else if (type === 'text') {
                    var text = $(`<input type="text" value="" class="form-control" />`);
                    text.appendTo(answer);
                    answer.appendTo(question);
                } else if (type === 'select-comentario') {

                    if (name === 'select') {
                        var select = $(`<select class="form-control">`).appendTo(answer);
                        $(value).each(function (o, options) {
                            var { name, value } = options;
                            select.append($("<option>").attr('value', value).text(name));
                        })
                        answer.appendTo(question);

                    } else if (name === 'text') {
                        var text = $(`<input type="text" value="" class="form-control" />`);
                        text.appendTo(answer);
                        answer.appendTo(question);
                    }
                } else if (type === 'radiobutton-text') {
                    var ul = $('<ul class="list-unstyled">');
                    var item = $('<li> ' + name + '</li>');
                    var radio = $('<input type="radio" id="" name="description[' + i + ']" value="' + answers.value + '" />');
                    radio.prependTo(item);
                    item.appendTo(ul);
                    ul.appendTo(answer);
                    answer.appendTo(question);
                }
            })
        })
    });
})
