## Notes

- commit messages are validated by [conventional commits](https://www.conventionalcommits.org) convention.
- Code depends on `.env` files and will require them to run properly.
- To reflect changes in `.env` files, a restart will be required.

## Requirements

    - yarn
    - Node LTS (version: 14.17.6)

## Quick start

    yarn install
    yarn start

## Setup Project

    - Create an environment file ex: `.env.local` by copying the `.env.example` file.
    - Add respective values to the newly created env file.

## Git Workflow

We will be having multiple environments on server:

1. Production - _Production Live server_
2. Staging - _Testing server with stable code_
3. Develop - _Testing server with all the code to be tested_

#### make use of git feature branch with following steps:

1. Create a branch from develop branch for your ticket/feature.
2. Add all the related commits to that branch.
3. Raise a pull request against develop branch and get it reviewed and merged.
4. If any issue or bug arises in Production/Staging, we can create hot-fix branch and merge it directly in staging and production branches, but also to be merged in develop branch.

#### Commit convention:

1. Follow conventional commits. [More info](https://commitlint.js.org/#/).
2. Optionally add a scope to commit message.

##### Commit message examples:

1. feat: added admin layout
2. fix: keys error for whole application
3. chore: lint fixes
4. feat(admin): added authentication and authorization

#### Deployment instructions:

1. Connect the bappenas server using the details provided by server admin.
2. run `update.sh` script using `sh update.sh` command and provide git credentials to update from git.
3. The script will handle the process of updating the server code.
