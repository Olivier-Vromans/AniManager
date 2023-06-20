export default function Order({ activeFilter, setActiveFilter, isOrderTypeAvailable }) {
  return (
    <div id="filters" className="flex flex-col ">
      <p className="hidden sm:block text-lg font-gilroy text-subtext font-bold">Order</p>
      <div className="flex flex-row items-center justify-around w-full mb-4 flex-shrink-0">
        <button
          className={`btn w-full flex-1 mx-2 ${activeFilter === 'Release' ? '' : 'btn-inactive'} ${!isOrderTypeAvailable('Release') ? "hidden" : ""}`}
          onClick={() => setActiveFilter('Release')}
          disabled={!isOrderTypeAvailable('Release')}
        >
          Release
        </button>
        <button
          className={`btn w-full flex-1 mx-2 ${activeFilter === 'Chronological' ? '' : 'btn-inactive'} ${!isOrderTypeAvailable('Chronological') ? "hidden" : ""}`}
          onClick={() => setActiveFilter('Chronological')}
          disabled={!isOrderTypeAvailable('Chronological')}
        >
          Chronicle
        </button>
        <button
          className={`btn w-full flex-1 mx-2 ${activeFilter === 'Community' ? '' : 'btn-inactive'} ${!isOrderTypeAvailable('Community') ? "hidden" : ""}`}
          onClick={() => setActiveFilter('Community')}
        >
          Community
        </button>
      </div>
    </div>
  );
}
