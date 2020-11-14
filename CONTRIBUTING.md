# Contributing

We're so excited you're interested in helping with SuperTokens! We are happy to help you get started, even if you don't have any previous open-source experience :blush:

## New to Open Source?
1. Take a look at [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)
2. Go through the [SuperTokens Code of Conduct](https://github.com/supertokens/supertokens-auth-react/blob/master/CODE_OF_CONDUCT.md)

## Where to ask Questions?
1. Check our [Github Issues](https://github.com/supertokens/supertokens-auth-react/issues) to see if someone has already answered your question.  
2. Join our community on [Discord](https://supertokens.io/discord) and feel free to ask us your questions  


## Development Setup  

### Prerequisites
- OS: Linux or macOS
- Nodejs & npm
- IDE: [VSCode](https://code.visualstudio.com/download)(recommended) or equivalent IDE  

### Project Setup
1. Please setup supertokens-core by following this guide. If you are not contributing to supertokens-core, please skip steps 1 & 4 under "Project Setup" section.
2. `git clone https://github.com/supertokens/supertokens-auth-react.git`, `supertokens-auth-react` and `supertokens-root` should exist side by side within the same parent directory.
3. `cd supertokens-auth-react`
4. Install the project dependencies
   ```
   npm i -d
   cd ./test/react-test-app && npm i -d
   ```
5. Add git pre-commit hooks
   ```
   npm run set-up-hooks
   ```

## Modifying Code  
1. Open the `supertokens-auth-react` project in your IDE.
2. You can start modifying the code.
3. After modification, you need to build the project:
   ```
   npm run build-pretty
   ```
4. Make sure the linter passes:
   ```
   npm run lint
   ```

## Testing

1. Navigate to the supertokens-root repository
2. Start the testing environment
   ```
   ./startTestingEnv --wait
   ```

3. In a new terminal, navigate to the `supertokens-auth-react` repository.


4. Setup node server for testing.

   ```
   cd ./test/server/
   npm i -d
   npm i git+https://github.com:supertokens/supertokens-node.git
   ```

5. Open a new terminal in `supertokens-auth-react` and run all tests

   ```
   npm run test
   ```

## Run the test application.

1. `npm run start`
2. `npm run server` // if server interactions required.


## Pull Request
1. Before submitting a pull request make sure all tests have passed
2. Reference the relevant issue or pull request and give a clear description of changes/features added when submitting a pull request

## SuperTokens Community
SuperTokens is made possible by a passionate team and a strong community of developers. If you have any questions or would like to get more involved in the SuperTokens community you can check out:
  - [Github Issues](https://github.com/supertokens/supertokens-auth-react/issues)
  - [Discord](https://supertokens.io/discord)
  - [Twitter](https://twitter.com/supertokensio)
  - or [email us](mailto:team@supertokens.io)
  
Additional resources you might find useful:
  - [SuperTokens Docs](https://supertokens.io/docs/community/getting-started/installation)
  - [Blog Posts](https://supertokens.io/blog/)