import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "app",
disable: process.env.NODE_ENV === "development",
   register: true,
   scope: "/app",
  // sw: "service-worker.js",
  //...
});

// Your Next config is automatically typed!
export default withPWA({
  // Your Next.js config
  output: 'export',

});
