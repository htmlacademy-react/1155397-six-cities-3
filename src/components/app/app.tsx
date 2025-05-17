import MainPage from '../../pages/main-page/main-page';

type AppProps = {
    foundPlacesCount: number;
};

function App({foundPlacesCount}: AppProps) {
  return (
    <MainPage foundPlacesCount={foundPlacesCount} />
  );
}

export default App;
