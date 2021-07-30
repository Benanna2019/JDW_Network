require('dotenv').config();

module.exports = {
  origin: '', // TODO: update this.
  lang: 'en',
  srcDir: 'src',
  distDir: 'public',
  rootDir: process.cwd(),
  build: {},
  prefix: '', // If you want your site to be built within a sub folder within your `distDir` you can use this.
  server: {},
  props: {
    compress: true,
  },
  debug: {
    stacks: false, // output details of the stack consolidation process.
    hooks: false, // outputs the details of each hook as they are run.
    performance: false, // outputs a full performance report of how long it took to run each page.
    build: false, // gives additional details about the build process.
    automagic: false,
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
