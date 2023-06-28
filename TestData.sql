-- Active: 1686139147299@@aws.connect.psdb.cloud@3306@animanager
-- Use the database

USE animanager;

SELECT * from `Series`;

SELECT * from `Anime`;

SELECT * from `Episode`;

-- Insert test data
INSERT INTO Series (serie_name, is_featured, poster) VALUES
  ('Naruto', true, 'poster.webp'),
  ('Demon Slayer', true, 'poster.webp'),
  ('Code Geass', false, 'poster.webp'),
  ('Fate', true, 'poster.webp');

INSERT INTO Anime (serie_id, title, description, release_date, is_dubbed, optional, poster, banner, type) VALUES
  ((SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), 'Naruto', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), 'Find the Four-Leaf Red Clover! OVA', NULL, NULL, false, true, NULL, NULL, 'OVA'),

  ((SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), 'Demon Slayer Kimetsu no Yaiba', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), 'Demon Slayer Kimetsu no Yaiba Mugen Train Arc', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), 'Demon Slayer Kimetsu no Yaiba Entertainment District Arc', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), 'Demon Slayer Kimetsu no Yaiba Swordsmith Village Arc', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),

  ((SELECT serie_id FROM Series WHERE serie_name = 'Code Geass'), 'Lelouch of the Rebellion', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Code Geass'), 'Lelouch of the Rebellion R2', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Fate'), 'Fate/stay night', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Fate'), 'Fate/Zero', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Fate'), 'Fate/stay night: Unlimited Blade Works', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Fate'), 'Fate/stay night: Heaven\'s Feel', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'Movie'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Fate'), 'Fate/Grand Order: Babylonia', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'TV'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Fate'), 'Fate/Grand Order: Camelot', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'Movie'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Fate'), 'Fate/Grand Order: Solomon', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'Movie'),
  ((SELECT serie_id FROM Series WHERE serie_name = 'Fate'), 'Fate/kaleid Liner Prisma Illya: Licht Nameless Girl', 'No description available yet. Check back later!', NULL, false, false, 'poster.webp', 'banner.webp', 'Movie');

INSERT INTO Genre (genre_name) VALUES
  ('Supernatural'),
  ('Isekai'),
  ('Drama'),
  ('Action'),
  ('Romance'),
  ('Horror'),
  ('Adventure'),
  ('Fantasy'),
  ('Comedy'),
  ('Sci-Fi');


INSERT INTO AnimeGenre (anime_id, genre_id) VALUES
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), (SELECT genre_id FROM Genre WHERE genre_name = 'Adventure')),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), (SELECT genre_id FROM Genre WHERE genre_name = 'Fantasy')),
  ((SELECT anime_id FROM Anime WHERE title = 'Find the Four-Leaf Red Clover! OVA'), (SELECT genre_id FROM Genre WHERE genre_name = 'Adventure')),
  ((SELECT anime_id FROM Anime WHERE title = 'Find the Four-Leaf Red Clover! OVA'), (SELECT genre_id FROM Genre WHERE genre_name = 'Comedy')),

  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba'), (SELECT genre_id FROM Genre WHERE genre_name = 'Fantasy')),

  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Mugen Train Arc'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Mugen Train Arc'), (SELECT genre_id FROM Genre WHERE genre_name = 'Fantasy')),

  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Entertainment District Arc'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Entertainment District Arc'), (SELECT genre_id FROM Genre WHERE genre_name = 'Fantasy')),

  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Swordsmith Village Arc'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Swordsmith Village Arc'), (SELECT genre_id FROM Genre WHERE genre_name = 'Fantasy')),

  ((SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion'), (SELECT genre_id FROM Genre WHERE genre_name = 'Drama')),
  ((SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion'), (SELECT genre_id FROM Genre WHERE genre_name = 'Sci-Fi')),

  ((SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion R2'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion R2'), (SELECT genre_id FROM Genre WHERE genre_name = 'Drama')),
  ((SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion R2'), (SELECT genre_id FROM Genre WHERE genre_name = 'Sci-Fi')),

    ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night'), (SELECT genre_id FROM Genre WHERE genre_name = 'Supernatural')),

  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Zero'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Zero'), (SELECT genre_id FROM Genre WHERE genre_name = 'Supernatural')),

  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Unlimited Blade Works'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Unlimited Blade Works'), (SELECT genre_id FROM Genre WHERE genre_name = 'Supernatural')),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Heaven\'s Feel'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),

  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Heaven\'s Feel'), (SELECT genre_id FROM Genre WHERE genre_name = 'Supernatural')),

  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Babylonia'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Babylonia'), (SELECT genre_id FROM Genre WHERE genre_name = 'Supernatural')),

  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Camelot'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Camelot'), (SELECT genre_id FROM Genre WHERE genre_name = 'Supernatural')),

  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Solomon'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Solomon'), (SELECT genre_id FROM Genre WHERE genre_name = 'Supernatural')),

  ((SELECT anime_id FROM Anime WHERE title = 'Fate/kaleid Liner Prisma Illya: Licht Nameless Girl'), (SELECT genre_id FROM Genre WHERE genre_name = 'Action')),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/kaleid Liner Prisma Illya: Licht Nameless Girl'), (SELECT genre_id FROM Genre WHERE genre_name = 'Supernatural'));


INSERT INTO SerieOrder (order_id, serie_id, order_type) VALUES
  (1, (SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), 'Chronological'),
  (2, (SELECT serie_id FROM Series WHERE serie_name = 'Naruto'), 'Release'),
  (3, (SELECT serie_id FROM Series WHERE serie_name = 'Demon Slayer'), 'Release'),
  (4, (SELECT serie_id FROM Series WHERE serie_name = 'Code Geass'), 'Release'),
  (5, (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), 'Chronological'),
  (6, (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), 'Release');


INSERT INTO Episode (anime_id, episode_number, is_filler) VALUES
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 2, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 3, true),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 4, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 5, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 6, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 7, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 8, true),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 9, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 10, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 11, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 12, true),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 13, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 14, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 15, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 16, true),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 17, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 18, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Naruto'), 19, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Find the Four-Leaf Red Clover! OVA'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Mugen Train Arc'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Entertainment District Arc'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Demon Slayer Kimetsu no Yaiba Swordsmith Village Arc'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion R2'), 1, false),
    ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night'), 2, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night'), 3, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night'), 4, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night'), 5, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Zero'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Zero'), 2, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Zero'), 3, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Zero'), 4, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Zero'), 5, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Unlimited Blade Works'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Unlimited Blade Works'), 2, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Unlimited Blade Works'), 3, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Unlimited Blade Works'), 4, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Unlimited Blade Works'), 5, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Heaven\'s Feel'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Heaven\'s Feel'), 2, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Heaven\'s Feel'), 3, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Heaven\'s Feel'), 4, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Heaven\'s Feel'), 5, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Babylonia'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Babylonia'), 2, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Babylonia'), 3, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Babylonia'), 4, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Babylonia'), 5, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Camelot'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Camelot'), 2, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Camelot'), 3, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Camelot'), 4, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Camelot'), 5, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Solomon'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Solomon'), 2, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Solomon'), 3, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Solomon'), 4, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Solomon'), 5, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/kaleid Liner Prisma Illya: Licht Nameless Girl'), 1, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/kaleid Liner Prisma Illya: Licht Nameless Girl'), 2, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/kaleid Liner Prisma Illya: Licht Nameless Girl'), 3, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/kaleid Liner Prisma Illya: Licht Nameless Girl'), 4, false),
  ((SELECT anime_id FROM Anime WHERE title = 'Fate/kaleid Liner Prisma Illya: Licht Nameless Girl'), 5, false);



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
  (4, (SELECT serie_id FROM Series WHERE serie_name = 'Code Geass'), (SELECT anime_id FROM Anime WHERE title = 'Lelouch of the Rebellion R2'), 2, 1, 1),

  ((SELECT order_id FROM SerieOrder WHERE order_type = 'Chronological' AND serie_id = (SELECT serie_id FROM Series WHERE serie_name = 'Fate')), (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), (SELECT anime_id FROM Anime WHERE title = 'Fate/stay night'), 1, 1, 24),
  ((SELECT order_id FROM SerieOrder WHERE order_type = 'Chronological' AND serie_id = (SELECT serie_id FROM Series WHERE serie_name = 'Fate')), (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), (SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Unlimited Blade Works'), 2, 1, 12),
  ((SELECT order_id FROM SerieOrder WHERE order_type = 'Chronological' AND serie_id = (SELECT serie_id FROM Series WHERE serie_name = 'Fate')), (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), (SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Heaven\'s Feel'), 3, 1, 3),
  ((SELECT order_id FROM SerieOrder WHERE order_type = 'Release' AND serie_id = (SELECT serie_id FROM Series WHERE serie_name = 'Fate')), (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), (SELECT anime_id FROM Anime WHERE title = 'Fate/stay night'), 1, 1, 24),
   ((SELECT order_id FROM SerieOrder WHERE order_type = 'Release' AND serie_id = (SELECT serie_id FROM Series WHERE serie_name = 'Fate')), (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), (SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Unlimited Blade Works'), 2, 1, 13),
  ((SELECT order_id FROM SerieOrder WHERE order_type = 'Release' AND serie_id = (SELECT serie_id FROM Series WHERE serie_name = 'Fate')), (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), (SELECT anime_id FROM Anime WHERE title = 'Fate/stay night: Heaven\'s Feel'), 3, 1, 3),
  ((SELECT order_id FROM SerieOrder WHERE order_type = 'Release' AND serie_id = (SELECT serie_id FROM Series WHERE serie_name = 'Fate')), (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), (SELECT anime_id FROM Anime WHERE title = 'Fate/Zero'), 1, 1, 13),
  ((SELECT order_id FROM SerieOrder WHERE order_type = 'Release' AND serie_id = (SELECT serie_id FROM Series WHERE serie_name = 'Fate')), (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), (SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Babylonia'), 1, 1, 21),
  ((SELECT order_id FROM SerieOrder WHERE order_type = 'Release' AND serie_id = (SELECT serie_id FROM Series WHERE serie_name = 'Fate')), (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), (SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Camelot'), 2, 1, 11),
  ((SELECT order_id FROM SerieOrder WHERE order_type = 'Release' AND serie_id = (SELECT serie_id FROM Series WHERE serie_name = 'Fate')), (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), (SELECT anime_id FROM Anime WHERE title = 'Fate/Grand Order: Solomon'), 3, 1, 5),
  ((SELECT order_id FROM SerieOrder WHERE order_type = 'Release' AND serie_id = (SELECT serie_id FROM Series WHERE serie_name = 'Fate')), (SELECT serie_id FROM Series WHERE serie_name = 'Fate'), (SELECT anime_id FROM Anime WHERE title = 'Fate/kaleid Liner Prisma Illya: Licht Nameless Girl'), 1, 1, 5);






-- Delete test data
DELETE FROM AnimeGenre;
DELETE FROM SeriesOrderItem;
DELETE FROM Episode;
DELETE FROM Anime;
DELETE FROM Genre;
DELETE FROM SerieOrder;
DELETE FROM Series;

