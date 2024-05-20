// Import data, utility functions, and HTML elements
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import { renderBookPreviews, setupGenreOptions, setupAuthorOptions, setThemeProperties, applyPreferredTheme, showMoreButton, handleListItemOnClick } from './utility.js';
import { htmlElements } from './elements.js';

let page = 1;
let matches = books


// Event listener for canceling search
htmlElements.search.dataSearchCancel.addEventListener('click', () => {
    htmlElements.search.dataSearchOverlay.open = false;
});

// Event listener for canceling settings
htmlElements.setting.dataSettingCancel.addEventListener('click', () => {
    htmlElements.setting.dataSettingOverlay.open = false;
});

// Event listener for opening search
htmlElements.header.dataHeaderSearch.addEventListener('click', () => {
    htmlElements.search.dataSearchOverlay.open = true ;
    htmlElements.search.dataSearchTitle.focus();
});

// Event listener for opening settings
htmlElements.header.dataHeaderSetting.addEventListener('click', () => {
    htmlElements.setting.dataSettingOverlay.open = true ;
});

// Event listener for closing list
htmlElements.list.dataListClose.addEventListener('click', () => {
    htmlElements.list.dataListActive.open = false;
});

// Event listener for submitting settings form
htmlElements.setting.dataSettingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
// Apply selected theme
    setThemeProperties(theme);
    // Close settings overlay
    htmlElements.setting.dataSettingOverlay.open = false;
});

// Event listener for submitting search form
htmlElements.search.dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []
// Filtering books based on search criteria+
    for (const book of books) {
        let genreMatch = filters.genre === 'any'

    // Checking if the book matches the selected genre
        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

    // If book matches all criteria, add it to the result array
        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

// Resetting page number and matches
    page = 1;
    matches = result

// Showing or hiding the "No Results" message
    if (result.length < 1) {
        htmlElements.list.dataListMessage.classList.add('list__message_show')
    } else {
        htmlElements.list.dataListMessage.classList.remove('list__message_show')
    }

// Clearing the list item content and rendering new book previews
    htmlElements.list.dataListItem.innerHTML = ''
    const newItems = document.createDocumentFragment();
    renderBookPreviews(newItems, result.slice(0, BOOKS_PER_PAGE));
    
    showMoreButton(page, matches);

    window.scrollTo({top: 0, behavior: 'smooth'});
    htmlElements.search.dataSearchOverlay.open = false;
});

// Event listener for "Show More" button click
htmlElements.list.dataListButton.addEventListener('click', () => {
    page += 1;
    const fragment = document.createDocumentFragment();
    const newBooks = matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE);
    renderBookPreviews(fragment, newBooks);
    showMoreButton(page, matches);
});

// Event listener for clicking on a list item
htmlElements.list.dataListItem.addEventListener('click', (event) => {
    handleListItemOnClick(event);
});

// Initialization function to set up the application
function initialization() {
    const starting = document.createDocumentFragment();
    renderBookPreviews(starting, matches.slice(0, BOOKS_PER_PAGE));

    setupAuthorOptions();// Set up author options
    setupGenreOptions();// Set up genre options
    showMoreButton(page, matches); // Update "Show More" button
};

initialization();// Initialize the application
applyPreferredTheme();// Apply preferred theme