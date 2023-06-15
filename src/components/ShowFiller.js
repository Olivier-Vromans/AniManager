import React from "react";

function ShowFiller({ anime, isFillersVisible }) {
  const { fromEpisode, toEpisode } = anime;
  const episodes = anime.anime.episodes;

  const filterEpisodes = () => {
    const filteredEpisodes = episodes.filter(
      (episode) =>
        episode.episode_number >= fromEpisode &&
        episode.episode_number <= toEpisode
    );

    let episodeRanges = [];
    let startRange = null;

    for (let i = 0; i < filteredEpisodes.length; i++) {
      const episode = filteredEpisodes[i];
      const nextEpisode = filteredEpisodes[i + 1];

      if (isFillersVisible && episode.is_filler) {
        continue; // Skip filler episodes
      }

      if (startRange === null) {
        startRange = episode.episode_number;
      }

      if (
        nextEpisode &&
        (nextEpisode.episode_number - episode.episode_number !== 1 ||
          (isFillersVisible && nextEpisode.is_filler !== episode.is_filler))
      ) {
        const endRange = episode.episode_number;
        episodeRanges.push(
          startRange === endRange ? startRange.toString() : `${startRange} - ${endRange}`
        );
        startRange = null;
      } else if (!nextEpisode || i === filteredEpisodes.length - 1) {
        const endRange = episode.episode_number;
        episodeRanges.push(
          startRange === endRange ? startRange.toString() : `${startRange} - ${endRange}`
        );
        startRange = null;
      }
    }

    return episodeRanges.join(", ");
  };

  return (
    <p className="text-center md:text-start md:text-xl text-subtext font-extrabold">
      Episode {filterEpisodes()}
    </p>
  );
}

export default ShowFiller;
