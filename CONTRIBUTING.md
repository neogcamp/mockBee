# Contributing to **mockBee**

This documentation contains a set of guidelines that would help you during the contribution process. We are happy to welcome all the contributions from anyone willing to improve/add new scripts to this project. Thank you for helping us out and remember, no contribution is too small.

## Issues and PRs

If you have suggestions as to how this project could be improved, or you want to report a bug, open an issue! We'd love all and any contributions. If you have questions, too, we'd love to hear them.

We'd also love PRs. If you're thinking of a large PR, we advise opening up an issue first to talk about it, though! Look at the links below if you're not sure how to open a PR.

## How to contribute

**Step 1**: Fork the Project

- Fork this Repository. By doing so, you would create a local copy of this repository on your Github Profile. Keep a reference to the original project in the upstream remote.

```
git clone https://github.com/<your-username>/mockBee
cd mockBee
git remote add upstream https://github.com/<upstream-owner>/mockBee
```

**Step 2**: Keep yourself updated

```
git remote update
git checkout <branch-name>
git rebase upstream/<branch-name>
```

**Step 3**: Create a feature branch and work remotely

```
git checkout -b branch_name
```

**Step 4**: Work on the assigned issue

- Work on the issue(s) assigned to you.
- Add all the files/folders needed.
- After you've made the necessary changes or made your contribution to the project, add the changes to the respective branch that you've just created.

```
# To add all new files to branch Branch_Name
git add .

# To add only a few files to Branch_Name
git add <some files>
```

**Step 5**: Commit

This message gets associated with all files you have changed

```
git commit -m "message"
```

**Step 6**: Work Remotely

- Now, you are ready to your work to the remote repository.
- When your work is ready and complies with the project conventions, upload your changes to your fork:

```
# To push your work to your remote repository
git push -u origin Branch_Name
```

**Step 7**: Create a PR

- Go to your repository in the browser and click on compare and pull requests.
- Add a title and description to your pull request that explains your contribution.

- Voila! Your Pull Request has been submitted and will be reviewed by the moderators and merged.🥳 Make sure you make a PR to `master` branch as the base.

## Run Tests

Before Raising a PR, make sure you run `yarn lint:fix` and `yarn format` to avoid any linting or formatting inconsistencies.

Additionaly, check for respective tests if any.

## Code of Conduct

We have adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project contributors to adhere to it. Please read the full text so that you can understand what actions will and will not be tolerated.

Read about the neoG camp community guide [here](https://neog.camp/legal/communityguide) and make sure you follow it while contributing to this project.
