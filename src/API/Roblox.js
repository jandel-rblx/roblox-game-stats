let Roblox = {};

Roblox.PROXY_URL = "https://typical-backend-n0kt.onrender.com/"
Roblox.SECRET = "jandelgames" // Not really that "secret", just how the backend works.

Roblox.proxyFetch = async function(sub_url, data) {
    let result = await fetch(this.PROXY_URL + sub_url + "?secret=jandelgames" + data).catch((err) => {
        console.log(err);

        return null;
    })

    if (!result) {
        return null;
    }

    if (result.status !== 200) {
        console.log(result.status, await result.text());

        return null;
    }

    return result;
}

Roblox.getGameInfo = async function (placeIds) {
    let info = await this.proxyFetch("jandelgames", `&games=${placeIds.join(",")}`);
    
    if (!info) {
        return false;
    }

    info = await info.json();

    let data = {};
    let totalPlaying = 0;
    let totalVisits = 0;

    info.info.data.forEach((gameInfo) => {
        data[gameInfo.id] = {
            name: gameInfo.name,
            playing: gameInfo.playing,
            visits: gameInfo.visits,
            favorites: gameInfo.favoritedCount,
            gameId: gameInfo.rootPlaceId
        };

        totalPlaying += gameInfo.playing;
        totalVisits += gameInfo.visits;
    });

    info.thumbnails.data.forEach((thumb) => {
        if (!data[thumb.universeId]) {
            return;
        }

        data[thumb.universeId].thumbnail = thumb.thumbnails[0]?.imageUrl;
    });

    return {
        mainData: data,
        totalAnalytics: {
            playing: totalPlaying,
            visits: totalVisits
        }
    };
}

export default Roblox