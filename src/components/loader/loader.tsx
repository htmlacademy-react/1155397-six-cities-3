import '../loader/loader.css';

function Loader() {
  return (
    <div className="lds-roller" role="status">
      <div className="spinner" data-testid="spinner"></div>
    </div>
  );
}

export default Loader;
