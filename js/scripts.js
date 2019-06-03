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
          const sourceTemplate = `<a href="${sourceUrl}">&nbsp${source}</a>`;
          const comma = `,`;

          history.pushState(null, null, data[0].slug);
          $('.entry-content p').html(content);
          $('.entry-title').html(title);
          $('.source').html(comma);
          $('.source').html(sourceTemplate);
          
        })
        .fail(function(error) {
          alert('Sorry there was an error!');          
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

      if (quoteAuthor.length !== '') {
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
            $('#quote-submission-form').slideUp('2000');
            alert('Quote has been submitted');
          })
          .fail(function() {
            alert('Sorry there was an error!');
          });
      }
    } // end of postQuote
  });
})(jQuery);
