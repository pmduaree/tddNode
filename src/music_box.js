function MusicBox(playlists) {
    this.playlists = playlists;
    this.isPlaying = false;
    this.indexOfCurrentPlaylist = 0;
    this.indexOfSongPlaying = 0;
}

MusicBox.prototype.getTotalPlaylists = function() {
    return this.playlists.length;
};

MusicBox.prototype.nextSong = function() {
    this.indexOfSongPlaying += 1;
    if (this.indexOfSongPlaying > this.playlists[this.indexOfCurrentPlaylist].songs.length) {
        this.indexOfSongPlaying = 0;
    }
};

MusicBox.prototype.currentSongPlaying = function() {
    return this.playlists[this.indexOfCurrentPlaylist].songs[this.indexOfSongPlaying];
};

MusicBox.prototype.play = function() {
    this.isPlaying = true;
};

MusicBox.prototype.stop = function() {
    this.isPlaying = false;
};

MusicBox.prototype.changePlaylist = function(indexOfPlaylist) {
    this.indexOfCurrentPlaylist = indexOfPlaylist;
};

MusicBox.prototype.getTotalDuration = function() {
    return this.playlists.reduce(function(acc, playlist) {
        return acc + playlist.getTotalDuration();
    }, 0);
};

MusicBox.prototype.getNumberOfDifferentArtists = function() {
    return this.playlists.reduce(function(acc, playlist) {
        return acc + playlist.getNumberOfDifferentArtists();
    }, 0);
};

module.exports = MusicBox;