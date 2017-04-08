function Playlist(songs, name) {
    this.songs = songs;
    this.name = name;
}

Playlist.prototype.numberOfSongs = function() {
    return this.songs.length;
};

Playlist.prototype.getTotalDuration = function() {
    return this.songs.reduce(function(acc, song) {
        return acc + song.duration
    }, 0);
};

Playlist.prototype.addSong = function(song) {
    this.songs.push(song)
};

Playlist.prototype.getNumberOfDifferentArtists = function() {
    artists = {};
    this.songs.forEach(function(song) {
        artists[song.artist] = true;
    });
    return Object.keys(artists).length
};
module.exports = Playlist;