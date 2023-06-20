-- Active: 1686139147299@@aws.connect.psdb.cloud@3306@animanager
-- Use the database
USE animanager;

-- Insert test data
INSERT INTO Series (serie_name, is_featured, poster) VALUES
  ('Naruto', true, 'poster.webp'),
  ('Demon Slayer', true, 'poster.webp'),
  ('Code Geass', true, 'poster.webp');

INSERT INTO Anime (serie_id, title, description, release_date, is_dubbed, optional, poster, banner, type) VALUES
  ((SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), 'Naruto', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), 'Find the Four-Leaf Red Clover! OVA', NULL, NULL, false, true, NULL, NULL, 'OVA'),

  ((SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), 'Demon Slayer Kimetsu no Yaiba', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), 'Demon Slayer Kimetsu no Yaiba Mugen Train Arc', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), 'Demon Slayer Kimetsu no Yaiba Entertainment District Arc', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), 'Demon Slayer Kimetsu no Yaiba Swordsmith Village Arc', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),

  ((SELECT serie_id FROM Series WHERE serie_name = 'Code Geass'), 'Lelouch of the Rebellion', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Code Geass'), 'Lelouch of the Rebellion R2', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV');

INSERT INTO Genre (genre_name, url, count) VALUES
  ('Action', 'action', 0),
  ('Supernatural', 'supernatural', 0),
  ('Mecha', 'mecha', 0);

INSERT INTO AnimeGenre (anime_id, genre_id) VALUES
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), (SELECT genre_id FROM Genre WHERE genre_name = 'Supernatural')),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), (SELECT genre_id FROM Genre WHERE genre_name = 'Mecha'));

INSERT INTO SerieOrder (order_id, serie_id, order_type) VALUES
  (1, (SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), 'Chronological'),
  (2, (SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), 'Release'),
  (3, (SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), 'Release'),
  (4, (SELECT serie_id FROM Series WHERE serie_name = 'Code Geass'), 'Release');


INSERT INTO Episode (anime_id, episode_number, is_filler) VALUES
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 2, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 3, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 4, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 5, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 6, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 7, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 8, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 9, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 10, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 11, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 12, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 13, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 14, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 15, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 16, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 17, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 18, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 19, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Find the Four-Leaf Red Clover! OVA'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Mugen Train Arc'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Entertainment District Arc'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Swordsmith Village Arc'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion R2'), 1, false);



INSERT INTO SeriesOrderItem (order_id, serie_id, anime_id, `order`, from_episode, to_episode)
VALUES
  (1, (SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), (SELECT anime_id FROM Anime WHERE title = 'Naruto'), 1, 1, 5),
  (1, (SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), (SELECT anime_id FROM Anime WHERE title = 'Find the Four-Leaf Red Clover! OVA'), 2, 1, 1),
  (1, (SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), (SELECT anime_id FROM Anime WHERE title = 'Naruto'), 3, 6, 19),

  (2, (SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), (SELECT anime_id FROM Anime WHERE title = 'Naruto'), 1, 1, 220),
  (2, (SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), (SELECT anime_id FROM Anime WHERE title = 'Find the Four-Leaf Red Clover! OVA'), 2, 1, 1),

  (3, (SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), (SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba'), 1, 1, 1),
  (3, (SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), (SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Mugen Train Arc'), 2, 1, 1),
  (3, (SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), (SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Entertainment District Arc'), 3, 1, 1),
  (3, (SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), (SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Swordsmith Village Arc'), 4, 1, 1),


  (4, (SELECT serie_id FROM Series WHERE serie_name = 'Code Geass'), (SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion'), 1, 1, 1),
  (4, (SELECT serie_id FROM Series WHERE serie_name = 'Code Geass'), (SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion R2'), 2, 1, 1);




-- Delete test data
DELETE FROM AnimeGenre;
DELETE FROM SeriesOrderItem;
DELETE FROM Episode;
DELETE FROM Anime;
DELETE FROM Genre;
DELETE FROM SerieOrder;
DELETE FROM Series;

