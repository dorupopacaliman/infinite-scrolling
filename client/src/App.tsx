import { useInfinitePhotos } from './hooks/useInfinitePhotos';
import './styles.css';

const App = () => {
  const { photos, isLoading, imageRef, limit } = useInfinitePhotos();

  return (
    <div className="grid">
      {photos.map((photo, index) => (
        <img key={photo.id} src={photo.url} alt={photo.title} ref={index === photos.length - 1 ? imageRef : null} />
      ))}
      {isLoading &&
        Array.from({ length: limit }, (_, index) => index).map(number => (
          <div key={number} className="skeleton">
            Loading...
          </div>
        ))}
    </div>
  );
};

export default App;
