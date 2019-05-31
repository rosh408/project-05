//IIFE Immediately Envoked Function Expression
(function($) {
  $(function() {
    let lastPage = '';

    // events
    $('#new-quote-button').on('click', getRandomQuote);
    $('#quote-submission-form').on('submit', postQuote);

    function getRandomQuote(event) {
      event.preventDefault();
      lastPage = document.URL;
      $.ajax({
        method: 'get',
        url:
          api_vars.rest_url +
          'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      })
        .done(function(data) {
          const randomQuote = data[0];
          console.log(randomQuote);
          // update the dom with the returned quote
          history.pushState(null, null, randomQuote.slug);
          // $('.entry-content p').html();
        })
        .fail(function(error) {
          console.log(error);
          // append a message telling the user something went wrong
        });
      $(window).on('popstate', function() {
        window.location.replace(lastPage);
      });
    } // end of getRandomQuote

    function postQuote(event) {
      event.preventDefault();
      console.log('form submitted');
      // TODO write ajax post method

      const quoteAuthor = $('#quote-author').val();

      if(quoteAuthor.length !== '') {
        // check if the field is empty
        postAjax();
      }

      function postAjax(){

      $.ajax({
        method: 'post',
        url: api_vars.rest_url + 'wp/v2/posts',
        data: {
          // TODO use the form input .val() for the title, content
          title: quoteAuthor,
          content: 'The most amazing quote by Gordon Ramsey',
          status: 'pending',
          // _qod_quote_source:
          // _qod_quote_source_url: 
        },
        beforeSend: function(xhr){
           xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);
        }
      })
        .done(function() {
         console.log('great success') ;
         $('#quote-submission-form').slideUp('2000');
        }).fail(function() {
          console.log('not so great');
        });
      }
    } // end of postQuote

  });
})(jQuery);
