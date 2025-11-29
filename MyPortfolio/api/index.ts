import { app, setupPromise } from '../server/index';

export default async function handler(req, res) {
  // بنستنى لحد ما الراوتس والداتابيز يجهزوا
  await setupPromise;
  // بنشغل الطلب
  app(req, res);
}