import axios from 'axios';
import logger from '../logger';

interface Callback {
  url: string;
}

const responseCallback = async (callback: Callback, result: any) => {
  const url = callback.url;

  logger.debug({ label: 'callback url', message: url });
  logger.debug({ label: 'callback payload', message: JSON.stringify(result, null, 2) });

  try {
    const response = await axios.post(url, result, {
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.debug({ label: 'callback response', message: response.data });
  } catch (e) {
    logger.error(e);
  }
};

export default responseCallback;
