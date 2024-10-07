import ScrollVideoWithGSAP from "../components/VideoPlayer";

const ServicePage = () => {
  return (
    <main>
      <section className="hidden lg:block">
        <ScrollVideoWithGSAP
          source={
            "https://bartergram-static-bucket.s3.ap-south-1.amazonaws.com/videos/service.mp4"
          }
        />
      </section>
      <section className="relative lg:hidden h-screen grid place-items-center">
        <figure className="absolute grid place-items-center inset-0 w-full h-full lg:bg-transparent">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-contain max-lg:aspect-video h-full lg:object-cover z-0"
          >
            <source
              src="https://bartergram-static-bucket.s3.ap-south-1.amazonaws.com/videos/service.mp4"
              type="video/mp4"
            />
          </video>
        </figure>

        <div className="max-w-3xl lg:max-w-4xl 2xl:max-w-6xl mx-auto space-y-20">
          <header className="relative z-10 max-lg:h-[75svh] lg:h-screen grid grid-cols-1 place-items-center lg:place-items-end lg:-translate-y-1/4 lg:grid-cols-2">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:mr-auto lg:text-left mb-10 md:mb-28 text-purple-500">
              Services
            </h1>
            <p className="text-base lg:text-md xl:text-lg text-center lg:text-justify lg:mr-auto mt-10 md:mt-28 text-white font-semibold">
              Our comprehensive range of features and tasks makes us unbeatable
              and ready for any challenge.
            </p>
          </header>
        </div>
      </section>
    </main>
  );
};

export default ServicePage;
