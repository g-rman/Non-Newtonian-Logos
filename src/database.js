import { SETTINGS_KEY, getDataURL } from "./settings.js";

const isString = str =>
{
    return typeof str === 'string' || str instanceof String;
}

export const getImageFromHash = async hash =>
{
    hash = `i-${hash}`;
    const urlObject = await browser.storage.local.get(hash);
    return urlObject[hash];
}

export const hashData = async data =>
{
    const buffer = await window.crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

export const clearImageDB = async () =>
{
    try
    {
        const nonImageKeys = [SETTINGS_KEY];
        const nonImages = await browser.storage.local.get(nonImageKeys);
        await browser.storage.local.clear();
        await browser.storage.local.set(nonImages);
    }
    catch (ex)
    {
        console.error('Non-Newtonian Logos: Clearing image database failed');
        console.error(ex);
    }
}

export const updateImageDB = async () =>
{
    const response = await fetch(await getDataURL());
    if (!response.ok)
    {
        const error = 'Could not get data file';
        console.error(`Non-Newtonian Logos: ${error}`);
        return error;
    }
    let data = await response.json();
    if (!Array.isArray(data))
    {
        const error = 'Invalid image hash list';
        console.error(`Non-Newtonian Logos: ${error}`);
        return error;
    }
    await clearImageDB();
    data = Object.fromEntries(
        data.filter(el =>
            Array.isArray(el) && el.length >= 2 &&
            isString(el[0]) && isString(el[1])
        )
        .map(el => [ `i-${el[0]}`, el[1] ])
    );
    await browser.storage.local.set(data);
}
