import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "app",
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
   register: true
  // sw: "service-worker.js",
  //...
});

// Your Next config is automatically typed!
export default withPWA({
  // Your Next.js config
  reactStrictMode: true,
  output: 'export',

});
