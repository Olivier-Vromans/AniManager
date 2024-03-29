import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "./isMobile.js";
import formatStringToURL from "./FormatStringToURL.js";

export default function Banner({ series, margin }) {
    const isMobile = useIsMobile();
    const [y, setY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const randomBanner = useMemo(() => {
        let formattedSeriesName = "";
        let formattedAnimeTitle = "";

        if (Array.isArray(series)) {
            const availableSeries = series.filter((s) => s.banner !== null && s.banner !== "");
            const randomBannerIndex = Math.floor(Math.random() * availableSeries.length);

            if (availableSeries[randomBannerIndex]?.series) {
                formattedSeriesName = formatStringToURL(availableSeries[randomBannerIndex]?.series.serie_name);
                formattedAnimeTitle = formatStringToURL(availableSeries[randomBannerIndex].title);
            } else {
                return null
            }

        } else if (typeof series === "object") {
            const seriesOrderItems = series.seriesOrder[0]?.seriesOrderItems;
            const availableSeries = seriesOrderItems.filter((s) => s.anime.banner !== null && s.anime.banner !== "");

            if (seriesOrderItems && seriesOrderItems.length > 0) {
                const randomAnimeIndex = Math.floor(Math.random() * availableSeries.length);
                const anime = availableSeries[randomAnimeIndex].anime;

                formattedSeriesName = formatStringToURL(series.serie_name);
                formattedAnimeTitle = formatStringToURL(anime.title);
            }
        }

        return formattedSeriesName && formattedAnimeTitle
            ? `/img/anime/${formattedSeriesName}/${formattedAnimeTitle}/banner.webp`
            : "";
    }, [series]);

    return (
        <div
            className={`flex flex-col items-center justify-between w-full h-36 bg-cover bg-no-repeat ${margin}`}
            style={{
                backgroundImage: randomBanner !== "" ? `url(${randomBanner})` : "none",
                backgroundPositionY: `${isMobile ? null : `calc(40% + -${y / 2}px)`}`,
            }}
        />
    );
}
