(function($) {
  $(function() {
    $('#toggle-status').on('click', function(event) {
      event.preventDefault();
      $.ajax({
        method: 'get',
        url:
          api_vars.rest_url +
          'wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      }).done(function(response) {
        console.log('Success! The status has been changed.');
        // add on click event
      });
    });
  });
})(jQuery);
