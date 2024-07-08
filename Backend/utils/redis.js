import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.error(err);
    });

    this.client.connect()
        .then(() => {
            console.log('redis client is connected');
        }).catch((err) => {
            console.error(err);
        });
  }

  async get(key) {
    try {
      const value = await this.client.get(key);

      return value;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async set(key, value) {
    try {
      await this.client.set(key, value);
    } catch (err) {
      console.error(err);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;