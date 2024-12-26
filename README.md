# Chrome Extension Manhour

This is an extension feature that assists with input in Jobcan's Man Hour Management.

By pressing the `Fill` button, unentered hours are evenly distributed and entered for projects with no input or where work hours are set to 0:00.

## Development

### Requirements

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker](https://docs.docker.com/get-started/)
- [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)

### Build

1. Open this project with Devcontainer.
2. Input the build command.
    ```
    npm run build
    ```
3. It will be output to the `dist` folder.
4. You can use it by loading the `dist` folder as an extension in Chrome.
