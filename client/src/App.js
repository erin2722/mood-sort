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
    flex-direction: ${props => props.isMobile ? "column" : "row" };
    justify-content: center;
    align-items: center;
    align-content: center;
    margin: 50px;
    margin-top: 50px;
`;

var moods = [
  {
    name: 'good vibes',
    key: 1,
    label: 'good vibes',
  },      
  {
    name: 'chill',
    key: 2,
    label: 'chill',
  },   
  {
    name: 'sad',
    key: 3,
    label: 'bag',
  },   
  {
    name: 'hype',
    key: 4,
    label: 'hype',
  },   
]

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
      playlists: [],
      selectedPlaylistSongs: [],
      moods: new Map(), 
      chosenPlaylist: {},
      numCreated: 0,
      isMobile: false
    }

    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
    this.getSavedSongs = this.getSavedSongs.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.getPlaylists(50, 0);
    this.getSavedSongs(50, 0);

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    if(window.innerWidth < 725) this.setState({ isMobile: true });
    else this.setState({ isMobile: false });
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
        this.setState({
          userID: response.id
        })
      })
  }

  getPlaylists(limit, offset) {
    spotifyWebAPI.getUserPlaylists({ limit: limit , offset: offset })
      .then((response) => {
        console.log(response.total);
        var playlist;
        for(playlist of response.items) {
            this.setState(state => {
              const playlists = state.playlists.concat({ 
                name: playlist.name, 
                id: playlist.id,
                length: playlist.tracks.total
            });
            return {
              playlists
            }
          })
        }
        if(this.state.playlists.length < response.total) this.getPlaylists(limit, offset + limit); 
      })
  }

  getSavedSongs(limit, offset) {
    spotifyWebAPI.getMySavedTracks({limit: limit, offset: offset})
      .then((response) =>{
        var song;
        for(song of response.items) {
          this.setState(state => {
            const selectedPlaylistSongs = state.selectedPlaylistSongs.concat({ 
              name: song.track.name, 
              uri: song.track.uri,
              id: song.track.id,
            });

            return {
              selectedPlaylistSongs
            }
          })
        }

        if(this.state.selectedPlaylistSongs.length < response.total) this.getSavedSongs(limit, offset + limit); 
      })
  }

    getPlaylistSongs(playlistID) {
    var result = this.state.playlists.find(obj => {
      return obj.id === playlistID;
    })
    var numCalls = Math.ceil(result.length / 100);
    var idCalls = [];

    for(var i = 0; i < numCalls; i++) {
      idCalls.push(playlistID);
    }
    
    Promise.all(idCalls.map((playlistID, index) =>
    spotifyWebAPI.getPlaylistTracks('', playlistID, {offset: index * 100})))
      .then((response) =>{
        var song;
        var arr;
        for(arr of response) {
        for(song of arr.items) {
          this.setState(state => {
            const selectedPlaylistSongs = state.selectedPlaylistSongs.concat({ 
              name: song.track.name, 
              uri: song.track.uri,
              id: song.track.id,
            });

            return {
              selectedPlaylistSongs
            }
          })
        }
      }
        this.sortSongs();
      })
  }

  sortSongs() { 
    var songIDs = [[]];
    var song;
    var hundred = 0;

    for(song of this.state.selectedPlaylistSongs) {
      if(songIDs[hundred].length === 100) {
        hundred += 1;
        songIDs.push([]);
      }
      songIDs[hundred].push(song.id);
    }

      Promise.all(songIDs.map(songID =>
        spotifyWebAPI.getAudioFeaturesForTracks(songID)))
        .then((response) => {
          console.log(response);
          var song;
          var arr;
          var mood;

          var chillURIs = [[]];
          var hypeURIs = [[]];
          var goodVibesURIs = [[]];
          var bagURIs = [[]];

          for(arr of response) {
            for(song of arr.audio_features) {
            //console.log(song.name, " Tempo ", response.tempo, " Energy ", response.energy, " Dancability ", response.danceability, " Valence ", response.valence);
            if(song.energy > .80 || song.danceability > .80) mood = "hype";
            else if((song.energy > .65 && song.danceability > .50) && song.valence > .40) mood = "good vibes";
            else if(song.valence < .50 && song.energy < .50 ) mood = "bag"
            else mood = "chill";

            if(mood === 'chill') {
              if(chillURIs[chillURIs.length - 1].length === 100) {
                chillURIs.push([]);
              }
              chillURIs[chillURIs.length - 1].push(song.uri);
            } else if(mood === 'good vibes') {
              if(goodVibesURIs[goodVibesURIs.length - 1].length === 100) {
                goodVibesURIs.push([]);
              }
              goodVibesURIs[goodVibesURIs.length - 1].push(song.uri);
            } else if(mood === 'bag') {
                if(bagURIs[bagURIs.length - 1].length === 100) {
                  bagURIs.push([]);
                }
                bagURIs[bagURIs.length - 1].push(song.uri);
            } else if(mood === 'hype') {
              if(hypeURIs[hypeURIs.length - 1].length === 100) {
                hypeURIs.push([]);
              }
              hypeURIs[hypeURIs.length - 1].push(song.uri);
            }
          }
        }

          var moodNames = [];

          for(mood of this.state.moods) {
            if(mood[1]) {
              moodNames.push(mood[0]);
            }
          }

          moodNames.map(mood => {
          spotifyWebAPI.createPlaylist(this.state.userID, {name: mood + " songs of " + this.state.chosenPlaylist.name, description: "Created by mood-sort from " + this.state.chosenPlaylist.name + " playlist"})
            .then((response) =>{
              if(mood === 'sad' && bagURIs[0].length !== 0) {
                bagURIs.map(bagURI => {
                spotifyWebAPI.addTracksToPlaylist('', response.id, bagURI)});
              } else if(mood === 'hype' && hypeURIs[0].length !== 0) {
                hypeURIs.map(hypeURI => {
                spotifyWebAPI.addTracksToPlaylist('', response.id, hypeURI)});
              } else if(mood === 'good vibes' && goodVibesURIs[0].length !== 0) {
                goodVibesURIs.map(goodVibesURI => {
                spotifyWebAPI.addTracksToPlaylist('', response.id, goodVibesURI)});
              } else if(mood === 'chill' && chillURIs[0].length !== 0) {
                chillURIs.map(chillURI => {
                spotifyWebAPI.addTracksToPlaylist('', response.id, chillURI)});
              }
            })
        })
      })
  }

  handleMoodChange(e) {
      const item = e.target.name;
      const isChecked = e.target.checked;
      this.setState(prevState => ({ moods: prevState.moods.set(item, isChecked) }));
  }

  handlePlaylistChange(e) {
    const {options, selectedIndex} = e.target;
    this.setState( { chosenPlaylist: {name: options[selectedIndex].innerHTML, id: e.target.value }} );
  }

  goButtonClicked() {
      if(this.state.chosenPlaylist.id === 'liked') {
        this.sortSongs();
      } else {
        this.setState({selectedPlaylistSongs: []});
        this.getPlaylistSongs(this.state.chosenPlaylist.id);
      }
  }

  render() {
    if(this.state.loggedIn) {
      return (
        <div className="App">
          <Wrapper>
            <Header loggedIn = {true} isMobile = {this.state.isMobile} />
            <FormWrapper isMobile = {this.state.isMobile}>
              <PlaylistForm 
                titles = {this.state.playlists} 
                handlePlaylistChange = {this.handlePlaylistChange} 
                value = {this.state.chosenPlaylist.id} />
              <MoodForm 
                moods = {moods} 
                handleMoodChange = {this.handleMoodChange} 
                checkedItems = {this.state.moods} /> 
            </FormWrapper>
            <GoButton onClick = {() => this.goButtonClicked()} />
          </Wrapper>
        </div>
      );
    } else {
        return (
          <Wrapper className="App">
            <Header loggedIn = {false} isMobile = {this.state.isMobile} />
            <LogInButton />
          </Wrapper>
        );
    }
  }
}

export default App;