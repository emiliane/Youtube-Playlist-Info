var url1 = 'https://www.youtube.com/playlist?list=PLycloV5Iov5EKRJhDaMmDTA-uMaasis-S'
var url2 = 'https://www.youtube.com/playlist?list=PLkbJV1pMY4B7i_qQgJWFu4nP9KgI-Cs6w'

var url3 = 'https://www.youtube.com/watch?v=9Xe6C4iURwo&list=PLycloV5Iov5EKRJhDaMmDTA-uMaasis-S'

var list = 'PLycloV5Iov5EKRJhDaMmDTA-uMaasis-S'

var array = await myFetchAsync(list)
console.log(array)

for (let index = 0; index < array.length; index++) {
    const element = array[index];
    console.log(index + 1, element)
}

function yooo(url) {
    var request = new XMLHttpRequest();
    var params = "action=something";
    request.open('POST', url, true);
    request.onreadystatechange = function () { if (request.readyState == 4) alert("It worked!"); };
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.send(params);
}

async function myFetchAsync(list) {
    var results = [];

    var url = 'https://www.youtube.com/playlist?list=' + list
    //console.log(url)

    var response = await fetch(url)
    var data = await response.text()

    var info = titluriSiId(data)
    var results = concatNew(results, info)

    var lastid = info[info.length - 1][0]

    var url = 'https://www.youtube.com/watch?v=' + lastid + '&list=' + list
    //console.log(url)

    response = await fetch(url)
    data = await response.text()

    info = t222222222(data)
    results = concatNew(results, info)

    lastid = info[info.length - 1][0]

    url = 'https://www.youtube.com/watch?v=' + lastid + '&list=' + list
    //console.log(url)

    response = await fetch(url)
    data = await response.text()

    info = t222222222(data)
    results = concatNew(results, info)

    //console.log(results)
    return results
}

function concatNew(a, b) {
    var c = a.concat(b.filter((item) => a.indexOf(item) < 0))
    return c
}

function split_at_index(value, index) {
    return value.substring(0, index) + "," + value.substring(index);
}

function split_from_index_to_index(value, index1, index2) {
    return value.substring(index1, index2)
}

function find(sourceStr, searchStr) {
    const indexes = [...sourceStr.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
    return indexes
}

function titluriSiId(data) {
    var info = []
    var indexes = find(data, 'playlistVideoRenderer');

    var playlistVideoRenderer = []
    for (var i = 0; i < indexes.length - 1; i++) {
        var a = data.substring(indexes[i], indexes[i + 1])
        playlistVideoRenderer.push(a)
    }
    a = data.substring(indexes[indexes.length - 1])
    playlistVideoRenderer.push(a)

    for (var i = 0; i < playlistVideoRenderer.length; i++) {
        let render = playlistVideoRenderer[i]
        var title = render.substring(render.indexOf('title'))
        title = title.substring(title.indexOf('text'))
        title = title.substring(title.indexOf(':') + 2, title.indexOf('"}]'))
        var videoId = render.substring(render.indexOf('videoId'))
        videoId = videoId.substring(videoId.indexOf(':') + 2, videoId.indexOf('",'))
        //console.log(i + 1, videoId, title)
        var video = [videoId, title]
        info.push(video)
    }
    return info
}

function t222222222(data) {
    var info = []
    var indexes = find(data, 'playlistPanelVideoRenderer');

    var playlistVideoRenderer = []
    for (var i = 0; i < indexes.length - 1; i++) {
        playlistVideoRenderer.push(data.substring(indexes[i], indexes[i + 1]))
    }
    playlistVideoRenderer.push(data.substring(indexes[indexes.length - 1]))

    for (var i = 0; i < playlistVideoRenderer.length; i++) {
        let render = playlistVideoRenderer[i]

        var title = render.substring(render.indexOf('simpleText'))
        title = title.substring(title.indexOf(':') + 2, title.indexOf('"},"'))
        var videoId = render.substring(render.indexOf('videoId'))
        videoId = videoId.substring(videoId.indexOf(':') + 2, videoId.indexOf('",'))
        //console.log(i + 1, videoId, title)
        var video = [videoId, title]
        info.push(video)
    }
    return info
}