$(document).ready(function() {

    $('#keyboard-upper-container').addClass('hidden');

    $('#sentence').text(sentences[sentIndex]);
    $('#sentence').html(function(i, str) {
        return `<mark>${str[0]}</mark>${str.slice(1)}`;
    });

    let expectedLetter = $('#sentence')[0].innerHTML[position+5];
    $('#target-letter').text(expectedLetter);

    $(document).on('keydown keyup', function(event) {
        if (event.which == 16) {
            $('#keyboard-upper-container').toggleClass('hidden');
            $('#keyboard-lower-container').toggleClass('hidden');
        };
    });

    $(document).keypress(function(event) {
        
        if (started == false) {
            start = new Date();
        }
        started = true;

        if (sentIndex >= sentences.length - 1 && position >= sentences[sentIndex].length) {
            time = (new Date() - start)/60000;
            let wpm = (numOfWords / time - 2 * numOfMistakes).toFixed(2);
            if (numOfMistakes == 0) {
                alert('Flawless Victory!');
            };
            $('#feedback').text(`Words per minute: ${wpm}`);
            $('#target-letter').html('<a>Want to play again?</a>').click(function() {
                position = 1;
                sentIndex = 0;
                numOfMistakes = 0;
                start = '';
                started = false;
                $('#sentence').text(sentences[sentIndex]);
                $('#sentence').html(function(i, str) {
                    return `<mark>${str[0]}</mark>${str.slice(1)}`;
                });
                expectedLetter = $('#sentence')[0].innerHTML[position+5];
                $('#target-letter').text(expectedLetter);
                $('#feedback').empty();
            });

        } else {
            let charCode = event.keyCode;
            $(`#${charCode}`).addClass('highlight');

            setTimeout(function() {
                $(`#${charCode}`).removeClass('highlight');
            }, 200);

            let expectedCode = $('#sentence')[0].innerHTML.charCodeAt(position+5);
            if (charCode == expectedCode) {

                $('#feedback').append('<i class="glyphicon glyphicon-ok"></i>');

                if (position >= sentences[sentIndex].length) {
                    sentIndex++;
                    $('#sentence').text(sentences[sentIndex]);
                    position = 0;
                    $('#feedback').empty();
                };
                
                $('#sentence').html(function() {
                    let sentence = sentences[sentIndex];
                    return `${sentence.slice(0, position)}<mark>${sentence[position]}</mark>${sentence.slice(position+1)}`
                });
                position++;
            } else {
                $('#feedback').append('<i class="glyphicon glyphicon-remove"></i>');
                
                numOfMistakes++;
            };

            expectedLetter = $('#sentence')[0].innerHTML[position+5];
            $('#target-letter').text(expectedLetter);
        };
    });
});

let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let position = 1;
let sentIndex = 0;
let numOfWords = 0;
sentences.forEach(sentence => {
    numOfWords += sentence.split(' ').length;
});
let numOfMistakes = 0;
let start = '';
let started = false;