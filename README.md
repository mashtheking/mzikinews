# React Typescript Innoscripta News Application

A single-page application was built using React, Typescript, and TawilwindCss. It is the user interface for a news aggregator website that pulls articles from various sources and displays them in a clean,
easy-to-read format. 
The application generates Breaking news from 3 sources that are NewsAPI.org, the New York Times and The Guardian, and users can search for articles by keyword and filter the results by date and category.
Also, users can personalized news feed that able to customize their news feed by selecting their preferred source and categories.

## Demo
https://innoscripta-news-app.vercel.app

## Features

- The application generates Breaking news from 3 sources that are NewsAPI.org, the New York Times and The Guardian.
- The user can search for articles by keyword.
- The user can filter the results by date and category.
- The user can personalized news feed that able to customize their news feed by selecting their preferred source and categories.
- Responsive Design
- A decent UI/UX
- Error Handling

## Development
clone Innoscripta-news-app to your local machine. Then
to install its dependencies run

```sh
npm install
```

Create a copy of .env.example file and call it .env; the default backend API key is provided in the .env.example.

```sh
cp .env.example .env
```


## Deployment
The application can be deployed using Docker. clone the repo and run the docker build command inside the project's directory.

```sh
docker build -t news-app:latest .
```

then create a container from the created image.

## Technologies
 - **React**: Utilized for the frontend development of user interfaces.
 - **Vite**: used as the bundler for the React app; It's a fast build tool for modern web development, and supports typescript out of the box.
 - **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability in the React app.
 - - Tailwind CSS - A utility-first CSS framework.
 - **Prettifier**: Code formatting is maintained with Prettier, ensuring a consistent and clean codebase.
 - **Docker**: The React app is containerized using Docker, providing consistency in deployment across various environments.
 - **Nginx**: A high-performance web server used to serve the React app, ensuring efficient handling of HTTP requests

## Configuration
The `.env.example` file gives you the default port for the front end and the `API keys`. Just copy it, rename the copy to `.env`, and you're good to go. If you've tweaked the backend app's config, remember to update the environmental config in the frontend's `.env` file.


