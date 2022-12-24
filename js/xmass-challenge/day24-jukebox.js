const player = document.getElementById('player');

function playSong(id, autoplay = true) {
    // Challenge: Add code here to make the youtube player play the new YouTube song
    const url = 'https://www.youtube.com/embed/';
    const autoPlay = '?autoplay=' + (autoplay ? '1' : '0');
    player.src = url + id + autoPlay;
    console.log(player.src);
}
