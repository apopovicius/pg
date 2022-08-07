/*
Create a web page that displays the first 10 album titles from https://jsonplaceholder.typicode.com/albums.
1) The albums should be displayed in an unordered list on one third of the page.
2) Upon clicking the album title, you will get the corresponding photos from https://jsonplaceholder.typicode.com/photos
and you will display 15 of them in the remaining two thirds of the page (see the example photo for guidance).
3) Optional:
Display all the images from Exercise 2, with pagination. Each album has 50 photos, so you should have a total of 4 pages
per album.

*/

/*
[
  {
    "userId": 1,
    "id": 1,
    "title": "quidem molestiae enim"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "sunt qui excepturi placeat culpa"
  },
  {
    "userId": 2,
    "id": 1,
    "title": "natus impedit quibusdam illo est"
  },
]
*/

const albums_url = 'https://jsonplaceholder.typicode.com/albums';
const image_url = 'https://jsonplaceholder.typicode.com/photos';

getMostRecentAlbums();

async function getMostRecentAlbums() {
    const [albums, images] = await fetchAlbumsAndImages();

    const first10 = obtainAlbumMenuItems(albums);
    const recentAlbumsDiv = createAlbumList(first10);

    //const layoutDiv = document.getElementsByClassName('.layout');
    const layoutDiv = document.querySelector('.layout');
    layoutDiv.append(recentAlbumsDiv);

    const albumImagesDiv = document.createElement('div');
    albumImagesDiv.classList.add('albumImages');
    const divItems = document.createElement('div');
    divItems.classList.add('items');
    const divPages = document.createElement('div');
    divPages.classList.add('pages');

    albumImagesDiv.append(divItems);
    albumImagesDiv.append(divPages);

    layoutDiv.append(albumImagesDiv);

    registerMenuItemClick(images, albums, onMenuItemClick);
}

function onMenuItemClick(itemSelected, albums, images) {
    // have to display the right content
    const pageSelected = 1; // all the time you click on new album page becomes 1
    const albumId = getAlbumIdFromListItem(albums, itemSelected);
    const albumImages = getImagesForAlbumId(images, albumId);
    renderPage(pageSelected, albumImages, albumId);
}

function onPageClicked(pageButtonId, currentAlbumImages, currentAlbumId) {
    renderPage(pageButtonId, currentAlbumImages, currentAlbumId);
}

function registerMenuItemClick(images, albums, onMenuItemClick) {
    document.querySelectorAll('ul li').forEach((item) => {
        item.addEventListener('click', (event) => {
            console.log(`MenuItem selected: ${event.target.textContent}`);
            onMenuItemClick(event.target.textContent, albums, images);
        });
    });
}

function registerButtonPageClick(currentAlbumImages, currentAlbumId) {
    document.querySelectorAll('button').forEach((item) => {
        item.addEventListener('click', (event) => {
            if (event.target.nodeName !== 'BUTTON') {
                return;
            }
            onPageClicked(event.target.id, currentAlbumImages, currentAlbumId);
        });
    });
}

function renderPage(pageSelected, albumImages, albumId) {
    clearPreviousDisplay();

    console.log(`Render page:${pageSelected} for albumId:${albumId}`);
    const pageImages = getImagesByPage(albumImages, albumId, pageSelected);
    const divItems = document.querySelector('.items');
    pageImages.forEach((image) => {
        const divItem = document.createElement('div');
        divItem.id = 'item';
        const img = document.createElement('img');
        //img.src = image.url;
        img.title =
            'AlbumId: ' +
            image.albumId +
            ' - ImageId: ' +
            image.id +
            ' - ' +
            image.title;
        img.alt = img.title;
        divItem.appendChild(img);
        divItems.append(divItem);
    });

    createDivPages(pageSelected, albumImages, albumId);
}

function clearPreviousDisplay() {
    const parent = document.querySelector('.items');

    while (parent && parent.firstChild) {
        parent.firstChild.remove();
    }

    const pages = document.querySelector('.pages');
    while (pages && pages.firstChild) {
        pages.firstChild.remove();
    }
}

function createDivPages(currentPage, currentAlbumImages, currentAlbumId) {
    const divPages = document.querySelector('.pages');
    for (let i = 0; i < 4; i++) {
        const button = document.createElement('button');
        button.id = i + 1;
        button.textContent =
            i === currentPage - 1 ? `<Page ${i + 1}>` : `Page ${i + 1}`;
        divPages.append(button);
    }
    registerButtonPageClick(currentAlbumImages, currentAlbumId);
}

function getImagesByPage(imagesForAlbum, albumId, page) {
    // albumid = 1 - imagesID 1-50
    // albumid = 2 - imagesID 51-100
    // page1 - 1-15
    // page2 - 16-30
    // 15 images per page where each album has 50 images
    const idByAlbum = 50 * (albumId - 1);
    const startTranslatedID = idByAlbum + 15 * (page - 1) + 1;
    const endTranslatedID = startTranslatedID + 15;

    // console.log(
    //     `start:${startTranslatedID} end:${endTranslatedID} albumIDStart:${idByAlbum}`
    // );
    const filteredImages = imagesForAlbum.filter((image) => {
        return image.id >= startTranslatedID && image.id < endTranslatedID;
    });
    return filteredImages;
}

function createAlbumList(albums) {
    const divRecentList = document.createElement('div');
    divRecentList.classList.add('recent');
    const h1 = document.createElement('h1');
    h1.textContent = 'The most recent albums';
    divRecentList.append(h1);
    const ulAlbums = document.createElement('ul');
    divRecentList.append(ulAlbums);
    albums.forEach((album) => {
        const listItem = document.createElement('li');
        listItem.textContent = album.title;
        ulAlbums.append(listItem);
    });
    return divRecentList;
}

function getAlbumIdFromListItem(albums, target) {
    return albums.filter((album) => album.title === target)[0]?.id;
}

function getImagesForAlbumId(images, albumId) {
    return images.filter((image) => image.albumId === albumId);
}

function obtainAlbumMenuItems(albums) {
    return albums.filter((album) => album.id < 11);
}

async function fetchAlbumsAndImages() {
    //const response = await fetch(albums_url);
    //const albums = await response.json();
    const [albumResponse, imageResponse] = await Promise.all([
        fetch(albums_url),
        fetch(image_url),
    ]);

    return await Promise.all([albumResponse.json(), imageResponse.json()]);
}
