'use strict';

var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

articleView.initNewArticlePage = function() {
  // DONE: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
  $('.tab-content').show();

  // DONE: The new articles we create will be copy/pasted into our source data file.
  // We need to allow the container to generate the JSON that will be copy-pasted.
  // We can hide it for now, and show it once we have data to export.
  $('#article-export').hide();

  $('#article-json').on('focus', function(){
    this.select();
  });

  // DONE: Add an event handler to...
  //  - update the preview field if any inputs change -- DONE
  //  - update the export field if any inputs change.
  $('form').on('change', function(event){
    /*
    - Grab the template's HTML
    - Compile the template into a callable function
    - Call the function with the data with which you want to fill the template
    - Append the filled template to the DOM
    */
    var sourceHTML = $('#preview-template').html();
    var compiledTemplate = Handlebars.compile(sourceHTML);

    // if the published box is checked, then calculate how many days ago this article was published, and put that in my article preview.
    // if the published box is not checked, then just put the text "(draft)" in my article preview

    var today = new Date();
    var dateText = today.toLocaleDateString(); // this is for the JSON text later. Figure out where to put it

    var formData = {
      title: this.title.value,
      body: this.body.value,
      author: this.author.value,
      url: this.url.value,
      publishStatus: this.publishStatus.checked ? `published 0 days ago` : '(draft)',
      category: this.category.value
    };
    var fillTemplate = compiledTemplate(formData);
    $('#articles')
      .empty()
      .append(fillTemplate);
    // Stringify our form data
    // Grab the disabled input field
    // Fill the field with our JSON string
    $('#article-json').val(JSON.stringify(formData));
    $('#article-export').show();
  })

};

articleView.create = function() {
  // TODO:Done above --- Set up a var to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
  

  // TODO:DONE above--- Instantiate an article based on what's in the form fields:


  // TODO:DONE above--- Use our interface to the Handblebars template to put this new article into the DOM:


  // TODO:DONE above--- Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
  $('pre code').each();

  // TODO:DONE above--- Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:

};


articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};
