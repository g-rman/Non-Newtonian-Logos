import { updateImageDB } from './database.js';
import { checkImage } from './intercept.js';
import { setDefaults, getUpdateInterval } from './settings.js';

const setUpdateAlarm = async () =>
{
    const updateAlarmName = 'updateImageDBAlarm';
    const updateInterval = await getUpdateInterval();
    browser.alarms.create(updateAlarmName, { periodInMinutes: updateInterval });
    browser.alarms.onAlarm.addListener(updateImageDB);
}

browser.runtime.onInstalled.addListener(setDefaults);
browser.runtime.onInstalled.addListener(updateImageDB);
browser.runtime.onInstalled.addListener(setUpdateAlarm);

browser.runtime.onStartup.addListener(updateImageDB);
browser.runtime.onStartup.addListener(setUpdateAlarm);

browser.webRequest.onBeforeRequest.addListener(
    checkImage,
    {
        urls: ['<all_urls>'],
        types: ['image', 'imageset']
    },
    ['blocking']
);
