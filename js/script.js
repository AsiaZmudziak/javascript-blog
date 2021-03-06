'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
};

const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    console.log('targetArticle:', targetArticle);
    targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-';
    
function generateTitleLinks(customSelector = '') {
    /*[DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /*[DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for (let article of articles) {

    /*[DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element */

    /*[DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /*[DONE] create HTML of the link */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    /*[DONE] insert link into titleList */
    html = html + linkHTML;
}

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }

}

generateTitleLinks();

function calculateTagsParams(tags) {
  const keys = { max: 0, min: 999999 };
  const params = keys;

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
  }

  for (let tag in tags) {
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [DONE] create a new variable allTags with an empty object */
  let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {
  
    /* [DONE] find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log(tagsList);
  
    /* [DONE] make html variable with empty string */
    let html = '';
  
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
  
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
  
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
    console.log(tag);
  
    /* [DONE] generate HTML of the link */
   const linkHTMLData = { id: tag, title: tag };
   const linkHTML = templates.tagLink(linkHTMLData);

    /* [DONE]add generated code to html variable */
    html = html + linkHTML;
    console.log(html);

    /* [DONE] check if this link is NOT already in allTags */
    if (!allTags.hasOwnProperty(tag)) {

    /* [DONE] add tag to allTags object */
    allTags[tag] = 1;
    } else {
    allTags[tag]++;
}
    
  /* END LOOP: for each tag */
  
  /*[DONE] insert HTML of all the links into the tags wrapper */
  tagsList.innerHTML = html;
  
    /* END LOOP: for every article: */

  /* [DONE] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  

  /* [DONE] create variable for all links HTML code */
  const allTagsData = { tags: [] };

  /* [DONE] START LOOP: for each tag in alltags: */
  for (let tag in allTags) {

  /* [DONE] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  }

  /* [NEW] END LOOP: for each tag in alltags: */

  /* [DONE] add html from alltagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
    }
}
}
  
  generateTags();

  function tagClickHandler(event){
    /*[DONE] prevent default action for this event */
    event.preventDefault();
  
    /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Tag was clicked!');
    console.log(event);
  
    /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
  
    /*[DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);
  
    /*[DONE] find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTagLinks);
  
    /*[DONE] START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
  
    /*[DONE] remove class active */
      activeTagLink.classList.remove('active');
    }
  
    /* END LOOP: for each active tag link */
  
    /*[DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(tagLinks);
  
    /*[DONE] START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
  
    /*[DONE] add class active */
      tagLink.classList.add('active');
    }
  
    /*[DONE] END LOOP: for each found tag link */
  
    /*[DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /*[DONE] find all links to tags */
     const links = document.querySelectorAll('.post-tags a, .list.tags a');
    console.log(links)
  
    /*[DONE] START LOOP: for each link */
    for (let link of links) {
  
    /*[DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    }
  
    /* END LOOP: for each link */
  }
  
  addClickListenersToTags();

  function calculateAuthorsClass(authors) {
    const keys = { max: 0, min: 999999 };
  
    const params = keys;
  
    for (let author in authors) {
      console.log(author + ' in used ' + authors[author] + ' times ');
      if (authors[author] > params.max) {
        params.max = authors[author];
      }
    }
  
    for (let author in authors) {
      console.log(author + ' in used ' + authors[author] + ' times ');
      if (authors[author] < params.min) {
        params.min = authors[author];
      }
    }
  
    return params;
  }

  function generateAuthors() {
  /* [DONE] create a new variable allTags with an empty array */
  let allAuthors = {};

  /*[DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
  
  /*[DONE] START LOOP: for every author: */
    for (let article of articles) {
  
  /*[DONE] find authors wrapper */
      const authorsList = article.querySelector(optArticleAuthorSelector);
  
  /*[DONE] make html variable with empty string */
      let html = '';
  
  /*[DONE] get authors from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
  
  /*[DONE] generate HTML of the link */
    
    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);

  /* [DONE] check if this link is NOT already in allAuthors */
    if (!Object.prototype.hasOwnProperty.call(allAuthors, articleAuthor)) {

  /* [DONE] add generated code to allAuthors array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

  /*[DONE] add generated code to html variable */
      html = html + linkHTML;
  
  /*[DONE] insert HTML of all the links into the authors wrapper */
      authorsList.innerHTML = html;
    }
  /* END LOOP: for every author: */

  /* [DONE] find list of authors in right column */
  const authorList = document.querySelector('.authors');
  const authorsParams = calculateAuthorsClass(allAuthors);
  console.log('authorsParams:', authorsParams);

  /* [DONE] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [DONE] START LOOP: for each author in allAuthors: */
  for (let author in allAuthors) {

  /* [DONE] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li>';
  }

  /* [NEW] END LOOP: for each author in allAuthors: */

  /* [DONE] add html from allAuthorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML;
  
  }
  
  generateAuthors();
  
  function authorClickHandler(event) {
  
    /*[DONE] prevent default action for this event */
    event.preventDefault();
  
    /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
  
    /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
  
    /*[DONE] make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
  
    /*[DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  
  }
  
  function addClickListenersToAuthors() {
  
    /*[DONE] find all links to authors */
    const links = document.querySelectorAll('.post-author a, .list.authors a');
  
    /*[DONE] START LOOP: for each link */
    for (let link of links) {

    /*[DONE] add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    }
  
  }
  
  addClickListenersToAuthors()