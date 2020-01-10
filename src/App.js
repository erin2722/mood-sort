import React, { Component } from 'react';
import styled from 'styled-components';
import SpotifyWebAPI from 'spotify-web-api-js';
import Header from './components/Header.jsx';
import PlaylistForm from './components/PlaylistForm.jsx';
import MoodForm from './components/MoodForm.jsx';
import GoButton from './components/GoButton.jsx';
import LogInButton from './components/LogInButton.jsx';

const spotifyWebAPI = new SpotifyWebAPI();

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 50px;
`;

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 50px;
    margin-top: 50px;
`;


class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    if(params.access_token) {
      spotifyWebAPI.setAccessToken(params.access_token);
    }

    this.state = {
      loggedIn: params.access_token ? true : false,
      userID: this.getUsername(),
      playlists: [ 
        {name: '', id: ''}
      ],
      selectedPlaylistSongs: [
        {name: '', uri: '', id: '', mood: ''}
      ],
      recentPlaylistID: '',
      moods: new Map(), 
      chosenPlaylist: {name: '', id: ''}
    }

    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  } 

  getUsername() {
    spotifyWebAPI.getMe()
      .then((response) => {
        console.log(response.id);
        this.setState({
          userID: response.id
        })
      })
  }

  getPlaylists() {
    spotifyWebAPI.getUserPlaylists()
      .then((response) => {
        var playlist;
        for(playlist of response.items) {
            this.setState(state => {
              const playlists = state.playlists.concat({ 
                name: playlist.name, 
                id: playlist.id
            });

            return {
              playlists
            }
          })
        }
      })
  }

  getSavedSongs(limit, offset) {
    spotifyWebAPI.getMySavedTracks({limit: limit, offset: offset})
      .then((response) => {
        var song;
        for(song of response.items) {
          this.setState(state => {
            const selectedPlaylistSongs = state.selectedPlaylistSongs.concat({ 
              name: song.track.name, 
              uri: song.track.uri,
              id: song.track.id,
              mood: this.classifyByMood(song.track)
            });

            return {
              selectedPlaylistSongs
            }
          })
        }
        if(this.state.selectedPlaylistSongs.length < response.total) this.getSavedSongs(limit, offset + 50); 
      })
  }

  getPlaylistSongs(playlistID) {
    spotifyWebAPI.getPlaylistTracks('', playlistID)
      .then((response) =>{
        var song;
        for(song of response.items) {
          this.setState(state => {
            const selectedPlaylistSongs = state.selectedPlaylistSongs.concat({ 
              name: song.track.name, 
              uri: song.track.uri,
              id: song.track.id,
              mood: this.classifyByMood(song.track)
            });

            return {
              selectedPlaylistSongs
            }
          })
        }
      })
  }

  makeNewPlaylist(name) {
    spotifyWebAPI.createPlaylist(this.state.userID, {name: name, description: "Created by mood-sort from " + this.state.chosenPlaylist + " playlist"})
      .then((response) =>{
        this.setState({
          recentPlaylistID: response.id
        })
      });
  }

  addSong(song, mood) {
    //will replace with song.uri
    var songs = ['spotify:track:5u431x19PX588bk9XGlwN8'];

    //will replace random id with mood playlist id
    spotifyWebAPI.addTracksToPlaylist('', '4u3BK21IWkEpcd8ydK7liu', songs)
      .then((response) => {
        console.log(response);
      }
      )
  }

  classifyByMood(song) {
      var mood;
      var playlist;
      spotifyWebAPI.getAudioFeaturesForTrack(song.id)
        .then((response) => {
          console.log(song.name, " Tempo ", response.tempo, " Energy ", response.energy, " Dancability ", response.danceability, " Valence ", response.valence);
          if(response.danceability > .750 && response.tempo < .750) mood = "good vibes";
          else if(response.danceability > .750) mood = "bad bitch";
          else if(response.tempo < 110 && response.energy < .400) mood = "chill";
          else mood = "bag";

          //console.log(song.name, " is ", mood);
          for(playlist of this.state.playlists) {
            if(mood === playlist.name) {
              return playlist.id;
            }
          }
          return '';
        });
  }

  createMoodPlaylists() {
    //check mood form and create playlists in user's account accordingly
    var mood;
    for(mood of this.state.moods) {
      this.makeNewPlaylist(mood[0]);
    }
    this.getPlaylists();
  }

  handleMoodChange(e) {
      console.log(e.target.value);
      const item = e.target.name;
      const isChecked = e.target.checked;
      this.setState(prevState => ({ moods: prevState.moods.set(item, isChecked) }));
      console.log(this.state.moods);
  }

  handlePlaylistChange(e) {
    this.setState( { chosenPlaylist: {name: e.target.name, id: e.target.value }} );
    console.log(this.state.chosenPlaylist);
  }

  goButtonClicked() {
    this.createMoodPlaylists();
    if(this.state.chosenPlaylist.value === 'liked') {
      this.getSavedSongs(50, 0);
    } else {
      this.getPlaylistSongs(this.state.chosenPlaylist.id);
    }
    var song;
    for(song of this.state.selectedPlaylistSongs) {
      this.addSong(song.id, this.classifyByMood(song));
    } 
  }

  render() {
    //should be this.state.loggedIn
    if(true) {
      return (
        <Wrapper className="App">
          <Header loggedIn = {true} />
          <FormWrapper>
            <PlaylistForm titles = {['mountain songs', 'j vibing']} handlePlaylistChange = {this.handlePlaylistChange} value = {this.state.chosenPlaylist} />
            <MoodForm moods = {['happy, sad, angry']} handleMoodChange = {this.handleMoodChange} checkedItems = {this.state.moods} /> 
          </FormWrapper>
          <GoButton onClick = {() => this.goButtonClicked()} />
        </Wrapper>
      );
    } else {
        return (
          <Wrapper className="App">
            <Header loggedIn = {false} />
            <LogInButton />
          </Wrapper>
        );
    }
  }
}

export default App;