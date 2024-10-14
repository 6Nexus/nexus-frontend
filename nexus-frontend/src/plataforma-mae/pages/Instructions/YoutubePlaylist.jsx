import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

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
              maxResults: 50,
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
    <div style={{ display: 'flex', flexDirection: 'column', width: '80%', gap: '40px' }}>
      {selectedVideo && (
        <div style={{ marginBottom: '20px', height: 'auto' }}>
          <h2 style={{borderLeft: '5px solid #3B9D3B', fontFamily:'Inter-Regular', padding:'0px 8px', fontSize: '24px', color: '#245024'}}>{selectedVideo.snippet.title}</h2>
          <iframe
            width="100%"
            height="600"  // Aumenta a altura do vídeo
            src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}`}
            frameBorder="0"
            allowFullScreen
            title={selectedVideo.snippet.title}
            style={{ objectFit: 'cover' }}  // Ajusta o vídeo para cobrir a área
          ></iframe>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{borderLeft: '5px solid #3B9D3B', fontFamily:'Inter-Regular', padding:'0px 8px', fontSize: '24px', color: '#245024'}}>Outras instruções</h2>
        <div style={{
          maxHeight: '400px',  // Altura máxima com scroll
          overflowY: 'auto',    // Scroll vertical
          paddingRight: '10px', // Para que o scroll não sobreponha o conteúdo
          padding: '10px',      // Espaçamento interno
          gap: '20px',          // Espaçamento entre os vídeos
          display: 'flex',
          flexDirection: 'column'
        }}>
        {videos.map((video) => {
          const thumbnailUrl = video.snippet.thumbnails?.medium?.url;
          return (
            <div 
              key={video.snippet.resourceId.videoId} 
              onClick={() => setSelectedVideo(video)} 
              style={{ 
                cursor: 'pointer', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', 
                backgroundColor: '#fff',
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '20px',
                color: '#000',
                padding: '20px',  // Aumenta o espaçamento interno dos vídeos
                gap: '24px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Adiciona um efeito de sombra
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {thumbnailUrl ? ( 
                  <img 
                    src={thumbnailUrl} 
                    alt={video.snippet.title} 
                    width="260" 
                    height="180"
                    style={{ objectFit: 'cover' }}  // Ajusta a imagem para cobrir a área
                  />
                ) : (
                  <div style={{ 
                    width: '160px', 
                    height: '120px', 
                    background: '#ccc', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    Sem miniatura
                  </div>
                )}
                <p style={{ color: '#524e4ea8', fontFamily: 'Inter-Light', fontSize: '20px' }}>{video.snippet.title}</p>
              </div>

              {/* Ícone de play à direita */}
              <PlayCircleOutlineIcon 
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que o clique no ícone dispare o clique no contêiner do vídeo
                  setSelectedVideo(video);
                }} 
                style={{ cursor: 'pointer', color: '#3B9D3B', fontSize: '40px' }} 
              />
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default YoutubePlaylist;
