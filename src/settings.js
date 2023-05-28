export const SETTINGS_KEY = 'settings';
const DEFAULT_SETTINGS = {
    dataURL: 'https://raw.githubusercontent.com/g-rman/Newtonian-Images/master/map.json',
    updateInterval: 8 * 60
};

const getSettings = async () =>
{
    try
    {
        const result = await browser.storage.local.get(SETTINGS_KEY);
        return result ? result[SETTINGS_KEY] : DEFAULT_SETTINGS;
    }
    catch (ex)
    {
        console.error('Non-Newtonian Logos: Failed to get settings');
        console.error(ex);
    }
    return DEFAULT_SETTINGS;
}

export const setDefaults = async () =>
{
    await browser.storage.local.set({[SETTINGS_KEY]: DEFAULT_SETTINGS});
}

export const setDataURL = async dataURL =>
{
    const settings = await getSettings();
    settings.dataURL = dataURL;
    await browser.storage.local.set({[SETTINGS_KEY]: settings});
}

export const getDataURL = async () =>
{
    try
    {
        const settings = await getSettings();
        return settings.dataURL ?? DEFAULT_SETTINGS.dataURL;
    }
    catch (ex)
    {
        console.error('Non-Newtonian Logos: Failed to get data URL');
        console.error(ex);
    }
    return DEFAULT_SETTINGS.dataURL;
}

export const getUpdateInterval = async () =>
{
    try
    {
        const settings = await getSettings();
        return settings.updateInterval ?? DEFAULT_SETTINGS.updateInterval;
    }
    catch (ex)
    {
        console.error('Non-Newtonian Logos: Failed to get update interval');
        console.error(ex);
    }
    return DEFAULT_SETTINGS.updateInterval;
}
