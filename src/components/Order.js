export default function Order({ activeFilter, setActiveFilter, isOrderTypeAvailable }) {
    return (
      <div id="filters" className="flex flex-col">
        <p className="hidden sm:block text-lg font-gilroy text-subtext">Order</p>
        <div className="flex flex-row items-center justify-around w-full mb-4">
          <button
            className={`${activeFilter === 'Release' ? '' : 'btn-inactive'} ${!isOrderTypeAvailable('Release') ? "hidden" : ""} btn`}
            onClick={() => setActiveFilter('Release')}
            disabled={!isOrderTypeAvailable('Release')}
          >
            Release
          </button>
          <button
            className={`${activeFilter === 'Chronological' ? '' : 'btn-inactive'} ${!isOrderTypeAvailable('Chronological') ? "hidden" : ""} btn mx-2`}
            onClick={() => setActiveFilter('Chronological')}
            disabled={!isOrderTypeAvailable('Chronological')}
          >
            Chronicle
          </button>
          <button
            className={`${activeFilter === 'Community' ? '' : 'btn-inactive'} ${!isOrderTypeAvailable('Community') ? "hidden" : ""} btn`}
            onClick={() => setActiveFilter('Community')}
          >
            Community
          </button>
        </div>
      </div>
    );
  }
  