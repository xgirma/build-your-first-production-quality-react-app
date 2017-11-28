# Bootstrap a React Application through the CLI with Create React App

          create-react-app .
        
Since I'm already in that directory, I'll just use a dot. After a couple of minutes, we have an application that we can start building on top of. You'll see that create-react-app comes preinstalled with a few npm commands.

          yarn start
            Starts the development server.
        
          yarn build
            Bundles the app into static files for production.
        
          yarn test
            Starts the test runner.
        
          yarn eject
            Removes this tool and copies build dependencies, configuration files
            and scripts into the app directory. If you do this, you can’t go back!

The first one is start, which will start the development server. Then, we have build so that we can build so that we can build this for production. We have test to start the test-runner.

That's all preconfigured within create-react-app. Then, we have an inject option that will basically break us out of the create-react-app tooling setup and give us flexibility, but for now, we're going to leave it as is and we're going to use everything that comes pre-bundled with create-react-app.

With a single command in the terminal, we've set up an entire react application with all the tooling we need to reload the browser as we make changes, to run unit tests, and to build for production deployment.