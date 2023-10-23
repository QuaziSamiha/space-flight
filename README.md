<!-- Vite React TypeScript Project -->

1. I've created a Vite project by running the following command in the terminal:
   npm create vite@latest
2. Select React as framework
3. Select TypeScript as variant
4. Run command:
   npm install

<!-- React Router installation -->

1. Run Command:
   npm install react-router-dom localforage match-sorter sort-by

<!-- Tailwind CSS Installation -->

1. Install tailwindcss and its peer dependencies, then generate tailwind.config.js and postcss.config.js files by running command :
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
2. Add the paths to all of the template files in tailwind.config.js file.
3. Add the @tailwind directives for each of Tailwind’s layers to ./src/index.css file.

<!-- Heroicons Addition for Icons -->

1. Install @heroicons/react from npm:
   npm install @heroicons/react

<!-- pagination -->

1. total number of items
2. decides the number of items per page
3. calculate the total number of pages
4. create button dynamically for the pagination using total pages
5. determine the current page
6. load the appropriate data
