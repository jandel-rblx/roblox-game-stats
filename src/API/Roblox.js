let Roblox = {};

Roblox.PROXY_URL = "https://jandel-backend.onrender.com/"
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
    // Since Roblox added a data limit to their API without saying a thing, we have to split the requests into 25 games each.

    let combined_info = {
        info: {
            data: []
        },
        thumbnails: {
            data: []
        }
    };

    for (let i = 0; i < placeIds.length; i += 25) {
        let info = await this.proxyFetch("jandelgames", `&games=${placeIds.slice(i, i + 25).join(",")}`);

        if (!info) {
            return false;
        }

        info = await info.json();

        for (let key in info.info.data) {
            combined_info.info.data.push(info.info.data[key]);
        }

        for (let key in info.thumbnails.data) {
            combined_info.thumbnails.data.push(info.thumbnails.data[key]);
        }
    }

    let data = {};
    let totalPlaying = 0;
    let totalVisits = 0;

    combined_info.info.data.forEach((gameInfo) => {
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

    combined_info.thumbnails.data.forEach((thumb) => {
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