const HomePage = () => {
  return (
    <video
      src={"/videos/home.mp4"}
      playsInline
      muted
      autoPlay
      loop
      preload="auto"
      className="min-w-full min-h-full h-screen object-contain md:object-cover"
    />
  );
};

export default HomePage;
