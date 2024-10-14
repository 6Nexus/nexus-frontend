import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YoutubePlaylist = ({ playlistId }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const API_KEY = 'AIzaSyBWPdWoACygsmbt5jhGJ1ff-DWBV_8ojUY';

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`, 
          {
            params: {
              part: 'snippet',
              playlistId: 'PLK3f8RSHTlntYR_EmxFqxY_nz9mn8erSc', 
              maxResults: 5,
              key: API_KEY,
            }
          }
        );
        if (res.data.items) {
          setVideos(res.data.items); 
          setSelectedVideo(res.data.items[0]); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [playlistId]);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'pink', width: '80%'}}>
      {selectedVideo && (
        <div style={{ marginBottom: '20px', height: 'auto' }}>
          <h2>{selectedVideo.snippet.title}</h2>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}`}
            frameBorder="0"
            allowFullScreen
            title={selectedVideo.snippet.title}
          ></iframe>
        </div>
      )}

      <h3>Outras instruções</h3>
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'blue' }}>
        {videos.map((video) => {
          const thumbnailUrl = video.snippet.thumbnails?.medium?.url; // Usando encadeamento opcional
          return (
            <div 
              key={video.snippet.resourceId.videoId} 
              onClick={() => setSelectedVideo(video)} 
              style={{ cursor: 'pointer', marginRight: '10px' }}
            >
              {thumbnailUrl ? ( 
                <img 
                  src={thumbnailUrl} 
                  alt={video.snippet.title} 
                  width="200"
                  height="120"
                />
              ) : (
                <div style={{ width: '200px', height: '120px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Sem miniatura
                </div>
              )}
              <p>{video.snippet.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YoutubePlaylist;
