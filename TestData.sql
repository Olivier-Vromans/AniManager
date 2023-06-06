-- Use the database
USE animanager;

-- Insert test data
INSERT INTO Series (serie_name, featured) VALUES
  ('Naruto', true),
  ('Demon Slayer', false),
  ('Code Geass', false);

INSERT INTO Animes (serie_id, title, description, release_date, is_dubbed, optional, poster, banner, type) VALUES
  ((SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), 'Naruto', 'No description available yet. Check back later!', NULL, false, false, 'naruto_poster.jpg', 'naruto_banner.jpg', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), 'Demon Slayer', 'No description available yet. Check back later!', NULL, false, false, 'demon_slayer_poster.jpg', 'demon_slayer_banner.jpg', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Code Geass'), 'Code Geass', 'No description available yet. Check back later!', NULL, false, false, 'code_geass_poster.jpg', 'code_geass_banner.jpg', 'TV');


INSERT INTO Genre ( genre_name, url, count) VALUES
  ( 'Action', 'action', 0),
  ( 'Supernatural', 'supernatural', 0),
  ( 'Mecha', 'mecha', 0);

INSERT INTO AnimeGenre (anime_id, genre_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3);

INSERT INTO SerieOrders (serie_id, order_type) VALUES
  (1, 'Chronological'),
  (2, 'Release'),
  (3, 'Chronological');

INSERT INTO AnimeOrder (animeOrderId, anime_id, order_index, serie_id) VALUES
  (1, 1, 1, 1),
  (2, 2, 1, 2),
  (3, 3, 1, 3);

INSERT INTO Episode (episode_id, anime_id, episode_number, is_filler) VALUES
  (1, 1, 1, false),
  (2, 1, 2, false),
  (3, 2, 1, false),
  (4, 2, 2, false),
  (5, 3, 1, false),
  (6, 3, 2, false);



-- Insert test da

DELETE FROM Anime;
DELETE FROM AnimeGenre;
DELETE FROM AnimeOrder;
DELETE FROM Episode;
DELETE FROM Genre;
DELETE FROM Series;
DELETE FROM SeriesOrder;