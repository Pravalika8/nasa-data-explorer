import MediaCard from './MediaCard';

export default function MediaResults({ mediaData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">

      {mediaData.map((item, index) => {
        const data = item.data[0];
        const img = item.links?.[0]?.href;
        const collectionUrl = item.href;

        return (
          <MediaCard
            key={index}
            data={data}
            img={img}
            collectionUrl={collectionUrl}
          />
        );
      })}
    </div>
  );
}
