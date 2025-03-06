async function fetchAsync(url) {
    let response = await fetch(url)
    let data = await response.text()

    info = ids_and_titles(data)
    return info
}

function find(sourceStr, searchStr) {
    const indexes = [...sourceStr.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
    return indexes
}

function ids_and_titles(data) {
    info = []

    playlistVideoRenderer = []
    indexes = [...data.matchAll(new RegExp('playlistVideoRenderer', 'gi'))].map(a => a.index)
    for (var i = 0; i < indexes.length - 1; i++) {
        playlistVideoRenderer.push(data.substring(indexes[i], indexes[i + 1]))
    }
    playlistVideoRenderer.push(data.substring(indexes[indexes.length - 1]))

    for (var i = 0; i < playlistVideoRenderer.length; i++) {
        let render = playlistVideoRenderer[i]

        position = render.indexOf('title');
        title = render.substring(position)

        position = title.indexOf('text');
        title = title.substring(position)

        position1 = title.indexOf(':') + 2
        position2 = title.indexOf('"}]');
        title = title.substring(position1, position2)

        position = render.indexOf('videoId');
        videoId = render.substring(position, position + 44)

        position1 = videoId.indexOf(':') + 2
        position2 = videoId.indexOf('",');
        videoId = videoId.substring(position1, position2)

        console.log(i + 1, videoId, title)
        video = [videoId, title]
        info.push(video)
    }
    return info
}