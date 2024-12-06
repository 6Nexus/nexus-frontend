import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api'
import styles from './YoutubePlaylist.module.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import IconCourse from '../../../utils/assets/course.svg';
import ButtonMaterial from '../ButtonMaterial/ButtonMaterial';

const YoutubePlaylist = ({ titlePlaylist, playlistId, isCursoDetails }) => {
  const { idModule } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get(`/videos/modulo/${idModule}`);
        if (res.data) {
          setVideos(res.data);
          setSelectedVideo(res.data[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

  }, []);

  if (loading) {
    return <p>Carregando aulas...</p>;
  }

  return (
    <div className={styles['playlist-container']}>
      {selectedVideo && (
        <div className={styles['playlist-container__selectedVideo']}>
          <h2 className={styles['selectedVideo__title']}>{selectedVideo.titulo}</h2>
          <iframe
            width="100%"
            height="800"
            src={`https://www.youtube.com/embed/${selectedVideo.youtubeUrl}`}
            frameBorder="0"
            allowFullScreen
            title={selectedVideo.titulo}
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
            const thumbnailUrl = null;
            return (
              <div
                key={video.id}
                className={styles['videos__container__item']}
              >
                <div className={styles['item__thumbnail']}>
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={video.titulo}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVideo(video);
                      }}
                    />
                  ) : (
                    <div className={styles['item__thumbnail__secondary']}>
                      <img
                        src={IconCourse}
                        alt={video.titulo}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVideo(video);
                        }}

                      />
                    </div>
                  )}
                  <p className={styles['item__thumbnail__title']}>{video.titulo}</p>
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
