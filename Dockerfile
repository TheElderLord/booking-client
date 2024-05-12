FROM node:21.7.3-bullseye-slim
WORKDIR /app

# Copy the built Vue.js files into the container
COPY dist /app/vue

# Install http-server globally
RUN npm install -g http-server

# Set http-server as the entrypoint
ENTRYPOINT [ "http-server", "/app/vue" ]
