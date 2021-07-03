export const handleLyric = (rawLyric) => {
    const rawLyricArray = rawLyric.split("\n");
    let obj = {};
    rawLyricArray.forEach((item) => {
        const times = item.match(/\[\d+:\d+.\d+\]/g);
        if (times) {
            times.forEach((time) => {
                const timeArr = time.replace(/\[|\]/g, "").split(":");
                const s = item.replace(times.join(""), "").replace(/\/\//, "");
                if (!s) {s;
                    return;
                }
                const timeKey = Number(timeArr[0] * 60000) + Number(timeArr[1]) * 1000;
                obj[timeKey] = s;
            });
        }
    });
    return obj;
}

export const getCurrentLyricKey = (currentTime = 0, lyricObject) => {
    const time = currentTime * 1000;
    let currentKey = 0;
    for (let key in lyricObject) {        
        if (key >= time) return currentKey;
        currentKey = key || 0;
    }
    return 0;
}

export const getCurrentLyric = (currentTime = 0, lyricObject) => {
    const key = getCurrentLyricKey(currentTime, lyricObject);
    return key ? lyricObject[key] : '';
}