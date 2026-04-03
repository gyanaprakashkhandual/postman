# Contributing

Thank you for your interest in contributing to this project. Contributions that improve the documentation, scripts, collection structure, or test coverage are welcome and appreciated.

Please take a moment to read this guide before opening an issue or submitting a pull request.

---

## What You Can Contribute

- Improvements to existing documentation
- New or improved Newman shell scripts
- Additional Postman assertion examples
- Bug fixes in collection or environment files
- Better CI/CD pipeline examples
- Typo and grammar corrections
- Structural improvements to the repository

---

## What Falls Outside the Scope of Contributions

- Changes that require access to the live API at `https://toodoo-2o5c.onrender.com`
- Pull requests that add credentials, tokens, or API keys of any kind
- Modifications intended to test, probe, or interact with the live API infrastructure

---

## How to Contribute

### Step 1 - Fork the Repository

Click the Fork button at the top of the repository page to create your own copy.

### Step 2 - Clone Your Fork

```bash
git clone https://github.com/your-username/postman.git
cd postman
```

### Step 3 - Create a Branch

Use a descriptive branch name that reflects the change you are making.

```bash
git checkout -b fix/assertion-typo
git checkout -b docs/add-filter-examples
git checkout -b feature/add-github-actions-workflow
```

### Step 4 - Make Your Changes

Edit the relevant files. Keep changes focused. One branch should address one topic.

### Step 5 - Commit Your Changes

Write a clear, concise commit message.

```bash
git add .
git commit -m "docs: add missing filter parameter examples to testing guide"
```

### Step 6 - Push and Open a Pull Request

```bash
git push origin your-branch-name
```

Then go to the original repository on GitHub and open a pull request from your fork. Fill in the PR description with what you changed and why.

---

## Commit Message Format

Use the following prefixes for clarity:

| Prefix   | Use for                                      |
| -------- | -------------------------------------------- |
| docs     | Documentation changes                        |
| fix      | Corrections to scripts, collections, or docs |
| feature  | New content or capabilities                  |
| refactor | Restructuring without changing behavior      |
| chore    | Maintenance tasks, formatting, cleanup       |

---

## Pull Request Guidelines

- Keep pull requests small and focused
- Reference any related issue in the PR description using `Closes #issue-number`
- Do not include generated files, node_modules, or system files
- Make sure your branch is up to date with main before opening the PR

---

## Reporting Issues

If you find a bug, a broken link, an incorrect assertion, or missing documentation, open an issue with the following information:

- A clear title describing the problem
- The file or section where the issue occurs
- What you expected vs what you found
- Any relevant context or screenshots

---

## Code of Conduct

By participating in this project, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful in all interactions.

---

## Questions

If you have a question before contributing, open an issue with the label `question` and it will be addressed as soon as possible.
