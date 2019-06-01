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
          const title = data[0].title.rendered;
          const content = data[0].content.rendered;
          const source = data[0]._qod_quote_source;
          const sourceUrl = data[0]._qod_quote_source_url;
          const sourceTemplate = `<a href="${sourceUrl}">${source}</a>`;

          history.pushState(null, null, data[0].slug);
          $('.entry-content p').html(content);
          $('.entry-title').html(title);
          $('.source').html(sourceTemplate);
          // console.log(data[0]);
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
      const quoteAuthor = $('#quote-author').val();
      const quoteContent = $('#quote-content').val();
      const quoteSource = $('#quote-source').val();
      const quoteSoUrl = $('#quote-source-url').val();
      console.log('form submitted');

      if (quoteAuthor.length !== '') {
        // check if the field is empty
        postAjax();
      }
      function postAjax() {
        $.ajax({
          method: 'post',
          url: api_vars.rest_url + 'wp/v2/posts',
          data: {
            title: quoteAuthor,
            content: quoteContent,
            status: 'pending',
            _qod_quote_source: quoteSource,
            _qod_quote_source_url: quoteSoUrl
          },
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);
          }
        })
          .done(function() {
            console.log('great success');
            $('#quote-submission-form').slideUp('2000');
          })
          .fail(function() {
            console.log('not so great');
          });
      }
    } // end of postQuote
  });
})(jQuery);
