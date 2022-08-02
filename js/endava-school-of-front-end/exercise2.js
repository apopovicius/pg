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
  */

const albums_url = 'https://jsonplaceholder.typicode.com/albums';
const image_url = 'https://jsonplaceholder.typicode.com/photos';

getMostRecentAlbums();

async function getMostRecentAlbums(){
    const [albums, images] = await fetchAlbumsAndImages();
    const first10 = filterAlbums(albums);

    const recentAlbumsDiv = createAlbumList(first10);
    //const layoutDiv = document.getElementsByClassName('.layout');
    const layoutDiv = document.querySelector('.layout');
    layoutDiv.append(recentAlbumsDiv);

    document.querySelectorAll('ul li').forEach((item) => {
      item.addEventListener('click', (event) => {
          clearPreviousDisplay();
          console.log(event.target.textContent);

          const albumIdSelected = getAlbumIdFromListItem(first10, event.target.textContent);
          const imagesForAlbum = getImagesForAlbumId(images, albumIdSelected);

          const divImages = createImagesForAlbum(imagesForAlbum, albumIdSelected, 1);
          layoutDiv.append(divImages);

          const divPages = createPages(imagesForAlbum.length/15, 1);
          layoutDiv.append(divPages);

          document.querySelectorAll('button').forEach( item => {
            item.addEventListener('click', (event) => {
            const isButton = event.target.nodeName === 'BUTTON';
            if (!isButton) {
              return;
            }

            const newDivImages = createImagesForAlbum(imagesForAlbum, albumIdSelected, event.target.id);
            layoutDiv.append(newDivImages);

            const newDivPages = createPages(imagesForAlbum.length/15, event.target.id);
            layoutDiv.append(newDivPages);
          })
        });
      })
    });

}

function clearPreviousDisplay() {
  console.log('Clearing');
  const parent = document.querySelector('.details');

  while (parent && parent.firstChild) {
    parent.firstChild.remove()
  }
  parent?.remove();

  const pages = document.querySelector('.pages');
  pages?.remove();
}

function createImagesForAlbum(imagesForAlbum, albumId, pageSelected) {
  console.log(`Creating images for ${albumId} for page: ${pageSelected}`);

  const divDetails = document.createElement('div');
  divDetails.classList.add('details');

  const displayImages = getImagesByPage(imagesForAlbum, albumId, pageSelected);
  appendImages(displayImages, divDetails);
  return divDetails;
}

function createPages(pages, currentPage) {
  const divPages = document.createElement('div');
  divPages.classList.add('pages');

  for(let i=0; i<pages; i++) {
    const button = document.createElement('button');
    button.id = i+1;
    button.textContent = i === currentPage-1 ? `<Page ${i+1}>`:  `Page ${i+1}`;
    divPages.append(button);
  }
  return divPages;
}

function appendImages(displayImages, parentDiv) {
  displayImages.forEach( image => {
    const divItem = document.createElement('div');
    divItem.id='item';
    const img = document.createElement('img')
    img.src = image.url
    img.title = 'A' + image.albumId + '+i' + image.id + '-' + image.title
    img.width = 200;
    img.height = 200;
    divItem.appendChild(img);
    parentDiv.append(divItem);
  })
}
// albumid = 1 - imagesID 1-50
// albumid = 2 - imagesID 51-100
// page1 - 1-15
// page2 - 16-30

function getImagesByPage(imagesForAlbum, albumId, page) {
  // 15 images per page where each album has 50 images
  const idByAlbum = 50*(albumId-1);
  const startTranslatedID = idByAlbum + 15*(page-1) + 1;
  const endTranslatedID = startTranslatedID + 15;
  console.log(`start:${startTranslatedID} end:${endTranslatedID} albumIDStart:${idByAlbum}`)
  const filteredImages = imagesForAlbum.filter(image => {
    return (image.id >= startTranslatedID && image.id < endTranslatedID);
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
    albums.forEach(album => {
        const listItem = document.createElement('li');
        listItem.textContent = album.title;
        ulAlbums.append(listItem);
    });
    return divRecentList;
}



function getAlbumIdFromListItem(albums, target) {
  return albums.filter(album => album.title === target)[0].id;
}

function getImagesForAlbumId(images, albumId) {
  return images.filter(image => image.albumId === albumId);
}

function filterAlbums(albums) {
    const first10 = albums.filter(album => album.id < 11);
    return first10;
}

async function fetchAlbumsAndImages() {
    //const response = await fetch(albums_url);
    //const albums = await response.json();
    const [albumResponse, imageResponse] = await Promise.all([ 
      fetch(albums_url),
      fetch(image_url)
      ]);

    return await Promise.all([
      albumResponse.json(),
      imageResponse.json()
    ]);
}
