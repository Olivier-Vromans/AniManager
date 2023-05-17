
export default function AnimeDetail({params}) {
    console.log(params);
    return (
      <main>
        <div className="flex flex-col items-center justify-between p-24">
          <h1 className='text-center text-4xl'>This is the anime detail page of {params.id}</h1>
        </div>
      </main>
    );
  }
  