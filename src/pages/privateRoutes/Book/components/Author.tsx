export default function Author({ author }: { author: string }) {
  return (
    <h6 className="text-ocean-blue font-roboto mt-2 font-semibold">
      <span className="text-snow-white font-thin">Escrito por</span> {author}
    </h6>
  );
}
