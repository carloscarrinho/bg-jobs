import Queue from "bull";
import redisConfig from "../../config/redis";

// import RegistrationMail from "../jobs/registration-mail";

// const mailQueue = new Queue(RegistrationMail.key, redisConfig);
// mailQueue.on('failed', async (job, err) => {
//   console.log('Job Failed', job.data);
//   console.log(err);
// });

// export default mailQueue;

import * as jobs from "../jobs";

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find((q) => q.name === name);
    return queue.bull.add(data);
  },
  process() {
    return this.queues.forEach((q) => {
      q.bull.process(q.handle);
      q.bull.on('failed', async (job, err) => {
        console.log('Job Failed', q.key, job.data);
        console.log(err);
      });
    });
  },
};
