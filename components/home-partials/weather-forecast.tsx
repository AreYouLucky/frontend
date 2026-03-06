

export default function WeatherForecast() {
  return (
    <section className=" overflow-hidden p-8 h-full flex justify-center items-center w-full">

      <div className="text-center border bg-secondary rounded aspect-video border-white/40 h-full bg-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://src.meteopilipinas.gov.ph/repo/mtsat-colored/24hour/latest-him-colored.gif"
          alt="Weather satellite"
          className="h-full w-full rounded-lg "
        />
      </div>
    </section>
  );
}