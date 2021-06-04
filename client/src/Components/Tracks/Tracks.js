import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Jumbotron from "../../Components/Jumbotron";
import { Col, Container } from "../../Components/Grid";
import { List, ListItem } from "../../Components/List";
import SearchForm from "../../Components/SearchForm";
import './style.css'

// const Tracks = () => {

	function Tracks() {

	// Set up states for retrieving access token and top tracks
	const [token, setToken] = useState('');
	// const [tracks, setTracks] = useState([]);
    const [playlists, setPlaylists] = useState([]);
	const [categoryid , setCategoryid] = useState("");

	// // Artist ID from Spotify
	// const id = '06HL4z0CvFAxyc27GXpf02';
	// const category_id = 'rock';

	useEffect(()=>{
		if (!categoryid) {
			return;
		  }
		// Api call for retrieving token
		axios('https://accounts.spotify.com/api/token', {
			'method': 'POST',
			'headers': {
				 'Content-Type':'application/x-www-form-urlencoded',
				 'Authorization': 'Basic ' + (new Buffer('29e5fbf208bb4c15bc1b9876c64a99b8:5c35ea8f839c4a1fa6d6a80830252035').toString('base64')),
			},
			data: 'grant_type=client_credentials'
		}).then(tokenresponse => {
			console.log(tokenresponse.data.access_token);
			setToken(tokenresponse.data.access_token);

            	// Api call for retrieving tracks data by cata
			axios(`https://api.spotify.com/v1/browse/categories/${categoryid}/playlists?country=US&limit=10&offset=5`,{
				'method': 'GET',
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + tokenresponse.data.access_token
				}
				
			}).then(res=> {
				console.log(res.data.playlists.items);
				// console.log(res.data.tracks[0].artists[0]);
                //console singer information
				setPlaylists(res.data.playlists.items);
				// res.data.playlists.items.map(playlist=>{
                //     return {
                //         title: playlist.name
                //     }
	
                // })
			

			}).catch(error=> console.log(error))
		
		}).catch(error => console.log(error));

        
	},[categoryid]);

	const handleInputChange = event => {
		setCategoryid(event.target.value);
		console.log(event.target.value);
	  };

	return(
		<Container fluid>
	
			<Jumbotron> 
	
        <h1 className="text-center">Search For Playlists from Spotify</h1>
		</Jumbotron>
        <SearchForm
          handleInputChange={handleInputChange}
          results={categoryid}
        />
   
	  <div>
    <div className="text-center mt-3">
  
    </div>
    </div>

	  <Container fluid>
			 <Col size="md-12 sm-12">
              <h1>Playlists</h1>
            {playlists.length ? (
              <List>
                {playlists.map(playlist => (
                  <ListItem >
                       <strong>
                        <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">{playlist.name} </a>
                      </strong>
                   
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results Currently</h3>
            )}
          </Col>
		  </Container>
		</Container>

	)
}


export default Tracks;