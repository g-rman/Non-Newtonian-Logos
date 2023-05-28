import { getImageFromHash, hashData } from './database.js';

export const checkImage = async imageDetails =>
{
    try
    {
        const response = await fetch(imageDetails.url);
        const hash = await hashData(await response.arrayBuffer());
        const redirectUrl = await getImageFromHash(hash);
        if (redirectUrl)
        {
            return {
                redirectUrl: redirectUrl
            };
        }
    }
    catch (ex)
    {
        console.error('Non-Newtonian Logos: Failed to query image');
        console.error(ex);
    }
    return;
}
