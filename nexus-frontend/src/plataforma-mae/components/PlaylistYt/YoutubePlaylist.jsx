import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './YoutubePlaylist.module.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import IconCourse from '../../../utils/assets/course.svg';
import ButtonMaterial from '../ButtonMaterial/ButtonMaterial';

const YoutubePlaylist = ({ titlePlaylist, playlistId, isCursoDetails }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = 'AIzaSyBWPdWoACygsmbt5jhGJ1ff-DWBV_8ojUY';

  useEffect(() => {
    const fetchVideos = async () => {
      console.log(playlistId)
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            params: {
              part: 'snippet',
              playlistId: playlistId,
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
        console.error('Erro ao buscar videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

  }, [playlistId]);

  if (loading) {
    return <p>Carregando aulas...</p>;
  }

  return (
    <div className={styles['playlist-container']}>
      {selectedVideo && (
        <div className={styles['playlist-container__selectedVideo']}>
          <h2 className={styles['selectedVideo__title']}>{selectedVideo.snippet.title}</h2>
          <iframe
            width="100%"
            height="600"
            src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}`}
            frameBorder="0"
            allowFullScreen
            title={selectedVideo.snippet.title}
            style={{ objectFit: 'cover' }}
          ></iframe>
          {
            isCursoDetails &&
            <ButtonMaterial />
          }
        </div>
      )}



      <div className={styles['playlist-container__videos']}>
        <h2 className={styles['videos__title']}>{titlePlaylist}</h2>
        <div className={styles['videos__container']}>
          {videos.map((video) => {
            const thumbnailUrl = video.snippet.thumbnails?.medium?.url;
            return (
              <div
                key={video.snippet.resourceId.videoId}
                className={styles['videos__container__item']}
              >
                <div className={styles['item__thumbnail']}>
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={video.snippet.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVideo(video);
                      }}
                    />
                  ) : (
                    <div className={styles['item__thumbnail__secondary']}>
                      <img src={IconCourse} alt="" />
                    </div>
                  )}
                  <p className={styles['item__thumbnail__title']}>{video.snippet.title}</p>
                </div>

                {
                  isCursoDetails ?
                    <input
                      type="checkbox"
                      className={styles['checkbox']}
                    />
                    :

                    <PlayCircleOutlineIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVideo(video);
                      }}
                      className={styles['icon__player']}
                    />
                }

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YoutubePlaylist;
