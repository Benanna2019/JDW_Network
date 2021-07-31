require('dotenv').config();

module.exports = {
  server: {
    prefix: '',
  },
  build: {},
  locations: {
    // assets: './public/dist/static/',
    assets: './public/',
    public: './public/',
    svelte: {
      ssrComponents: './___ELDER___/compiled/',
      clientComponents: './public/dist/svelte/',
    },
    systemJs: '/dist/static/s.min.js',
    intersectionObserverPoly: '/dist/static/intersection-observer.js',
  },
  debug: {
    stacks: false,
    hooks: false,
    performance: true,
    build: true,
    automagic: false,
  },
  shortcodes: {
    // https://elderguide.com/tech/elderjs/#specifications-and-config
    openPattern: "{{", // Opening pattern for identifying shortcodes in html output.
    closePattern: "}}", // closing pattern for identifying shortcodes in html output.
  },
  hooks: {
    // disable: ['elderWriteHtmlFileToPublic'], // this is used to disable internal hooks. Uncomment this hook to disabled writing your files during build.
  },
  plugins: {
    '@elderjs/plugin-markdown': {
      routes: ['assessment', 'helps', 'grant', 'prplan', 'board', 'starting'],
    },
    '@elderjs/plugin-browser-reload': {
      // this reloads your browser when nodemon restarts your server.
      port: 8080,
      reload: false, // if you are having issues with reloading not working, change to true.
    },
    '@elderjs/plugin-seo-check': {
      display: ['errors', 'warnings'], // If the errors are too verbose remove 'warnings'
      //writeLocation: './report.json', // if you want to write a report of errors
    },
  //   '@elderjs/plugin-images': {
  //     folders: [
  //         {
  //             src: '/images/*', // glob of where your original images are. Relative to rootDir/process.cwd() defined in your elder.config.js. Careful with **.
  //             output: '/images/', // where files should be put within the distDir defined in your elder.config.js.
  //         },
  //     ],
  // }, 
  },
  shortcodes: { closePattern: '}}', openPattern: '{{' },
};
