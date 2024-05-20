import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { htmlElements } from './elements.js';

/**
 * A custom HTML element that represents a book preview.
 * @extends HTMLElement
 */
class BookPreview extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <!-- Styles -->
            <style>
            .preview {
                border-width: 0;
                width: 100%;
                font-family: Roboto, sans-serif;
                padding: 0.5rem 1rem;
                display: flex;
                align-items: center;
                cursor: pointer;
                text-align: left;
                border-radius: 8px;
                border: 1px solid rgba(var(--color-dark), 0.15);
                background: rgba(var(--color-light), 1);
              }
              
              @media (min-width: 60rem) {
                .preview {
                  padding: 1rem;
                }
              }
              
              .preview_hidden {
                display: none;
              }
              
              .preview:hover {
                background: rgba(var(--color-blue), 0.05);
              }
              
              .preview__image {
                width: 48px;
                height: 70px;
                object-fit: cover;
                background: grey;
                border-radius: 2px;
                box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                  0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
              }
              
              .preview__info {
                padding: 1rem;
              }
              
              .preview__title {
                margin: 0 0 0.5rem;
                font-weight: bold;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;  
                overflow: hidden;
                color: rgba(var(--color-dark), 0.8)
              }
              
              .preview__author {
                color: rgba(var(--color-dark), 0.4);
              }
              
            </style>
            <!-- HTML Template -->
            <button class="preview">
                <img class="preview__image" />
                <div class="preview__info">
                    <h3 class="preview__title"></h3>
                    <div class="preview__author"></div>
                </div>
            </button>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        shadow.querySelector('.preview__image').src = this.getAttribute('image');
        shadow.querySelector('.preview__title').innerText = this.getAttribute('title');
        shadow.querySelector('.preview__author').innerText = this.getAttribute('author');
        shadow.querySelector('.preview').setAttribute('data-preview', this.getAttribute('id'));
    }
};

customElements.define('book-preview', BookPreview)

/**
 * Creates a book element.
 * @param {Object} book - The book data.
 * @param {string} book.author - The author of the book.
 * @param {string} book.id - The book ID.
 * @param {string} book.image - The URL of the book image.
 * @param {string} book.title - The title of the book.
 * @returns {HTMLElement} The book element.
 */
export const createBookElement = (book) => {
    const { author, id, image, title } = book;
    const element = document.createElement('book-preview');
    element.setAttribute('image',image);
    element.setAttribute('title', title);
    element.setAttribute('author',authors[author]);
    element.setAttribute('id', id);
    
    return element;
}

/**
 * Creates an option element.
 * @param {string} value - The value of the option.
 * @param {string} name - The display name of the option.
 * @returns {HTMLOptionElement} The option element.
 */
export function createOptionElement(value, name) {
    const element = document.createElement('option');
    element.value = value;
    element.innerText = name;
    return element;
};

/**
 * Renders book previews.
 * @param {DocumentFragment} documentFragment - The document fragment to append book elements to.
 * @param {Object[]} bookList - The list of books to render.
 */
export const renderBookPreviews = (documentFragment, bookList) => {
    for ( const book of bookList) {
        documentFragment.appendChild(createBookElement(book));
    };
    htmlElements.list.dataListItem.appendChild(documentFragment);
};

/**
 * Sets up genre options in the search form.
 */
export const setupGenreOptions = () => {
    const genreHtml = document.createDocumentFragment()
    genreHtml.appendChild(createOptionElement('any', 'All Genres'))
    console.log(genreHtml)

    for (const [id, name] of Object.entries(genres)) {
        genreHtml.appendChild(createOptionElement(id, name));
    }
    console.log(genreHtml)
htmlElements.search.dataSearchGenre.appendChild(genreHtml)

}

/**
 * Sets up author options in the search form.
 */
export const setupAuthorOptions = () => {
    const authorsHtml = document.createDocumentFragment();
    authorsHtml.appendChild(createOptionElement('any', 'All Authors'));

    for (const [id, name] of Object.entries(authors)) {
        authorsHtml.appendChild(createOptionElement(id, name))
    }

    htmlElements.search.dataSearchAuthor.appendChild(authorsHtml)
};


/**
 * Sets the theme properties.
 * @param {string | File } theme - The theme to set ('night' or 'day').
 */
export const setThemeProperties = (theme) => {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    };
};

/**
 * Applies the user's preferred theme based on their system settings.
 */
export const applyPreferredTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElements.setting.dataSettingTheme.value = 'night';
        setThemeProperties('night');
    } else {
        htmlElements.setting.dataSettingTheme.value = 'day';
        setThemeProperties('day');
    };
};

/**
 * Updates the "Show More" button text and state.
 */
export function showMoreButton(page, matches) {
    htmlElements.list.dataListButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
    let remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
    htmlElements.list.dataListButton.disabled = remainingBooks <= 0

    htmlElements.list.dataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
};

export const handleListItemOnClick = (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        };
    };
    
    if (active) {
        htmlElements.list.dataListActive.open = true;
        htmlElements.list.dataListBlur.src = active.image;
        htmlElements.list.dataListImage.src = active.image;
        htmlElements.list.dataListTitle.innerText = active.title;
        htmlElements.list.dataListSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        htmlElements.list.dataListDescription.innerText = active.description;
    };
}


