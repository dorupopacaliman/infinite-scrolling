import { useCallback, useEffect, useRef, useState } from 'react';
import { baseApi } from '../api/base';
import { parseLinkHeader } from '../helpers/parseLinkHeader';
import { Photo } from '../types';

const LIMIT = 10;

export const useInfinitePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const nextPhotoUrlRef = useRef(1);

  const fetchPhotos = async ({
    page,
    limit,
    overwrite = false,
  }: {
    page: number;
    limit: number;
    overwrite?: boolean;
  }) => {
    try {
      setIsLoading(true);

      const response = await baseApi.get('/photos-short-list', {
        params: {
          _page: page,
          _limit: limit,
        },
      });

      const parsedLinkHeader = parseLinkHeader(response.headers.link);
      if (parsedLinkHeader.next) {
        const nextPage = new URL(parsedLinkHeader.next).searchParams.get('_page');

        setPhotos(prevPhotos => (overwrite ? response.data : [...prevPhotos, ...response.data]));
        nextPhotoUrlRef.current = Number(nextPage);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const imageRef = useCallback((image: HTMLImageElement) => {
    if (image == null || nextPhotoUrlRef.current === null) return;

    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        fetchPhotos({ page: nextPhotoUrlRef.current, limit: LIMIT });
        observer.unobserve(image);
      }
    });

    observer.observe(image);
  }, []);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    fetchPhotos({ page: nextPhotoUrlRef.current, limit: LIMIT, overwrite: true });
  }, []);

  return { photos, isLoading, imageRef, limit: LIMIT };
};
