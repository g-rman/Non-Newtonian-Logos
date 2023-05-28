import { setDefaults, setDataURL, getDataURL } from '../src/settings.js';
import { updateImageDB } from '../src/database.js';

const getDataURLInput = () => document.querySelector('#input-data-url');

const getDefaultButton = () => document.querySelector('#btn-default');

const getApplyButton = () => document.querySelector('#btn-apply');

const getErrorMessage = () => document.querySelector('#error-message');

const windowLoad = async e =>
{
    try
    {
        const urlInput = getDataURLInput();
        urlInput.value = await getDataURL();
    }
    catch (ex)
    {
        console.error(ex);
    }
}

const applyClick = async () =>
{
    try
    {
        const urlInput = getDataURLInput();
        await setDataURL(urlInput.value);
        const error = await updateImageDB();
        getErrorMessage().innerText = error ?? null;
    }
    catch (ex)
    {
        getErrorMessage().innerText = ex;
        console.error(ex);
    }
}

const defaultClick = async () =>
{
    try
    {
        const urlInput = getDataURLInput();
        await setDefaults();
        urlInput.value = await getDataURL();
        const error = await updateImageDB();
        getErrorMessage().innerText = error ?? null;
    }
    catch (ex)
    {
        getErrorMessage().innerText = ex;
        console.error(ex);
    }
}

window.addEventListener('load', windowLoad)
getApplyButton().addEventListener('click', applyClick);
getDefaultButton().addEventListener('click', defaultClick);
