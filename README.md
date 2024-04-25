# Innoscripta-news-app


For estimating stories and tasks in your Agile team, give Estimace a try! It's a fast, real-time, and open-source tool that hones in on the essentials, creating a collaborative space known as a "room." Team members can easily join the room using a shared URL. Right now, Estimace offers support for two popular estimation techniques: Fibonacci and T-Shirt sizing. You can either use it for free by visiting [estimace.com](https://www.estimace.com/) or self-host it. Happy estimating! 😊

## Development
clone Innoscripta-news-app to your local machine. Then
to install its dependencies run

```sh
yarn install or npm install
```

Create a copy of .env.example file and call it .env; the default backend API key is provided in the .env.example.

```sh
cp .env.example .env
```


## Deployment
Application can be deployed using Docker. clone the repo and run the docker build command inside the project's directory.

```sh
docker build -t Innoscripta-news-app:latest .
```

then create a container from the created image.

## Technologies
 - **React**: Utilized for the frontend development of user interfaces.
 - **Vite**: used as the bundler for the React app; It's a fast build tool for modern web development, and supports typescript out of the box.
 - **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability in the React app
 - **Prettifier**: Code formatting is maintained with Prettier, ensuring a consistent and clean codebase.
 - **ESLint**: The project utilizes ESLint for static code analysis, helping catch potential issues and enforcing coding standards.
 - **Docker**: The React app is containerized using Docker, providing consistency in deployment across various environments.
 - **Nginx**: A high-performance web server used to serve the React app, ensuring efficient handling of HTTP requests

## Configuration
The `.env.example` file gives you the default port for the frontend and the `API-Keys`. Just copy it, rename the copy to `.env`, and you're good to go. If you've tweaked the backend app's config, remember to update the environmental config in the frontend's `.env` file.


## License:

Estimace front-end is distributed under the MIT License. See the `LICENSE` file for more details. Feel free to use, modify, and distribute the software in accordance with the terms of the MIT License.
