import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api';
import axios from 'axios';
import styles from './YoutubePlaylist.module.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import IconCourse from '../../../utils/assets/course.svg';
import ButtonMaterial from '../ButtonMaterial/ButtonMaterial';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const YoutubePlaylist = ({ titlePlaylist, playlistId, isCursoDetails, onVideoCount, onAllCheckboxesChecked }) => {
  const { idModule } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkboxes, setCheckboxes] = useState([]);
  const API_YOUTUBE_KEY = 'AIzaSyBWPdWoACygsmbt5jhGJ1ff-DWBV_8ojUY';

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let fetchedVideos = [];
        if (playlistId) {
          const res = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems`,
            {
              params: {
                part: 'snippet',
                playlistId: playlistId,
                maxResults: 50,
                key: API_YOUTUBE_KEY,
              },
            }
          );
          if (res.data.items) {
            fetchedVideos = res.data.items.map((item) => ({
              id: item.snippet.resourceId.videoId,  // Garantido que 'id' seja corretamente extraído
              titulo: item.snippet.title,
              youtubeUrl: item.snippet.resourceId.videoId,
              thumbnail: item.snippet.thumbnails?.medium?.url,
            }));
            setVideos(fetchedVideos);
            setSelectedVideo(fetchedVideos[0]);
            setCheckboxes(new Array(fetchedVideos.length).fill(false));
          }
        } else {
          const res = await api.get(`/videos/modulo/${idModule}`);
          if (res.data) {
            fetchedVideos = res.data;
            setVideos(fetchedVideos);
            setSelectedVideo(fetchedVideos[0]);
            setCheckboxes(new Array(fetchedVideos.length).fill(false));
          }
        }

        if (onVideoCount) {
          onVideoCount(fetchedVideos.length);  // Correção para usar 'fetchedVideos' corretamente
        }

      } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [playlistId, idModule, onVideoCount]);


  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheckboxes(updatedCheckboxes);

    // Verifica se todas as checkboxes estão marcadas
    if (updatedCheckboxes.every(checked => checked)) {
      if (onAllCheckboxesChecked) {
        onAllCheckboxesChecked(); // Dispara o alerta no componente pai
      }
    }
  };

  if (loading) {
    return (
      <Stack spacing={2} sx={{ padding: '1rem' }}>
        <Skeleton variant="text" width="20%" height={20} />
        <Skeleton variant="rectangular" width="100%" height={500} />
        <Skeleton variant="text" width="20%" height={20} />
        <Stack direction="column" spacing={2}>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" width="100%" height={100} />
          ))}
        </Stack>
      </Stack>
    );
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
          {isCursoDetails && <ButtonMaterial />}
        </div>
      )}

      <div className={styles['playlist-container__videos']}>
        <h2 className={styles['videos__title']}>{titlePlaylist}</h2>
        <div className={styles['videos__container']}>
          {videos.map((video, index) => {
            const thumbnailUrl = video.thumbnail;  // Garantido que 'thumbnail' está corretamente extraído
            return (
              <div key={video.id} className={styles['videos__container__item']}>
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

                {isCursoDetails ? (
                  <input
                    type="checkbox"
                    className={styles['checkbox']}
                    checked={checkboxes[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                ) : (
                  <PlayCircleOutlineIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVideo(video);
                    }}
                    className={styles['icon__player']}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YoutubePlaylist;
