# Background Information

AniManager is a school project for my third year at Rotterdam University of Applied Sciences. For this project they want us to think of something I and the target audience is struggling with. In this project I need to create and develop a solution for this problem. I need to create a MVP (Minimum Viable Product).

# AniManager

AniManager is an application designed to help anime enthusiasts find the correct order in which to watch anime series with complex storylines. It addresses the problem of confusion caused by various side stories and non-linear release schedules, making it challenging to determine the optimal viewing sequence.

## Problem Statement

Anime viewers often struggle to determine the correct order in which to watch a series due to multiple spin-offs, side stories, and varying release dates. This confusion can hinder their ability to follow the storylines effectively and enjoy the intended experience.

## Target Audience

AniManager is tailored for anime viewers who are looking to start watching a new anime series but are uncertain about where to begin due to the complex viewing order.

## Goal

The goal of AniManager is to provide an application where users can easily discover the recommended viewing order for anime series. It offers different viewing options, including chronological order, release order, and later community-driven order if those exist. Users can also filter episodes based on Arc or include filler episodes.

## Features

- Viewing Order Options: Users can select their preferred viewing order, such as chronological order or release order.
Community-Driven Order: AniManager allows users to access community-driven recommendations for watching an anime series.

- Filter Fillers: Users have the option to filter out episodes that are not relevant to the main storyline, such as fillers.

## Features for Future Releases

- Watchlist Integration: AniManager plans to incorporate integration with popular anime tracking platforms like MyAnimeList or Anilist, enabling users to keep track of their progress.
Language Preference: Users can choose between subtitles or dubbed versions of anime series.

- Availability Information: Users can find information on where to legally stream or purchase the anime series they want to watch.

- Recommendation Engine: AniManager will recommend new anime series based on the user's preferences and genres of interest.

- Offline Mode: AniManager aims to provide an offline mode for users to access their anime watchlist even without an internet connection.

- Notification System: AniManager intends to send notifications when new episodes are available within a series the user is following.

## Unique Selling Points

- Filler Filtering: AniManager offers the ability to filter out filler episodes, allowing users to focus solely on the main storyline.

- Watchlist Integration: Integration with popular anime tracking platforms enables users to seamlessly manage their anime progress within AniManager.

- Genre-Based Recommendations: AniManager will provide personalized recommendations based on the user's preferred genres, helping them discover new anime series tailored to their interests.

## Technologies Used

AniManager is developed using the following technologies:

- **Front-end**: Next.js, React.js, Tailwind CSS,  axios (HTTP requests)

- **Back-end**: Prisma, next-auth (authentication),

- **Database**: development: MySQL, production: PlanetScale (MySQL)

- **API**: Jikan API (anime data), MyAnimeList API (user data)


## Contribution Guidelines

Contributions to AniManager are welcome! If you have any ideas, bug reports, or feature requests, please submit them as GitHub issues in this repository. If you would like to contribute code to the project, please follow the standard GitHub workflow for forking the repository, creating a new branch, making your changes, and submitting a pull request.

## Product Status

## Design

- [x] Wireframe Hero Page
- [x] Wireframe Serie Page
- [x] Wireframe All Anime Page
- [x] Wireframe Login Page
- [x] Wireframe Register Page
- [ ] Wireframe Admin Page
- [ ] Wireframe Profile Page
- [ ] Edit wireframe Serie Page for where to watch, sub or dub, watchlist
- [ ] Edit Hero Page for recommendations
- [ ] Edit Navigation for Profile Page, Admin Page, Recommendations, search bar


### Development

- [x] Next.js setup
- [x] Tailwind CSS setup
- [x] Prisma setup
- [x] MySQL setup with docker container locally and PlanetScale for production
- [x] Hero page
- [x] Navigation
- [x] Footer
- [x] Database model
- [x] API route for serie with the serie orders, anime, episodes, genres
- [x] API route Featured serie for in the hero
- [x] API route for genre for on the home page
- [x] Serie page with the serie orders
- [x] Community driven order possible
- [x] Change the order of watching in the serie page
- [x] Filler episodes filter that hide/shows the episodes that are fillers 
- [x] Banner for serie page and anime page
- [x] API routes for all anime with filter based on genre
- [x] All Anime availible page
- [x] filter anime based on genre
- [x] API routes for login and register with next-auth
- [x] Login page
- [x] Signup page
- [ ] Faster loading for images (lazy loading) and data
- [ ] Search bar for anime/serie
- [ ] Where to watch
- [ ] Admin page
- [ ] Add anime to database
- [ ] Jikan API for admin page to search for anime to add to the serie order
- [ ] Profile Page
- [ ] MyAnimeList Integration 
- [ ] Show what you already watched and what you still need to watch in the serie page based on your MyAnimeList
- [ ] Add to your MyAnimeList watchlist
- [ ] Sub or Dub (if possible)
- [ ] Recommendations algorithm based on your watchlist from MyAnimeList

