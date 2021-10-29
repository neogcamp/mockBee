const chalk = require("chalk");
const degit = require("degit");
const fs = require("fs-extra");
const execa = require("execa");
const path = require("path");
const Log = require("./log");
const { prompt, selectAsync } = require("./prompts");

const FEATURED_TEMPLATES = [
  {
    name: "e-commerce",
    path: "mockBee/apps/e-commerce",
    description:
      "E-Commerce Backend. This is the default starter template (recommended)",
  },
  {
    name: "video-library",
    path: "mockBee/apps/video-library",
    description: "Video Library Backend.",
  },
  {
    name: "social-media",
    path: "mockBee/apps/social-media",
    description: "Social Media Backend.",
  },
];

function validateName(name) {
  if (typeof name !== "string" || name === "") {
    return "The project name can not be empty.";
  }
  if (!/^[a-z0-9@.\-_]+$/i.test(name)) {
    return "The project name can only contain URL-friendly characters (alphanumeric and @ . -  _)";
  }
  return true;
}

const isGitExecutableAvailable = async () => {
  try {
    await execa("git", ["--version"]);
    return true;
  } catch (e) {
    if (e.errno === "ENOENT") {
      Log.warn("Unable to find `git` command. `git` not in PATH.");
      return false;
    }
  }
};

const initGitRepoAsync = async (
  root,
  flags = { silent: false, commit: true }
) => {
  // let's see if we're in a git tree
  try {
    await execa("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: root,
    });
    !flags.silent &&
      Log.info(
        "New project is already inside of a git repo, skipping git init."
      );
  } catch (e) {
    if (e.errno === "ENOENT") {
      !flags.silent &&
        Log.warn("Unable to initialize git repo. `git` not in PATH.");
      return false;
    }
  }

  // not in git tree, so let's init
  try {
    await execa("git", ["init"], { cwd: root });
    !flags.silent && Log.info("Initialized a git repository.");

    if (flags.commit) {
      await execa("git", ["add", "--all"], { cwd: root, stdio: "ignore" });
      await execa("git", ["commit", "-m", "Create a new Remotion video"], {
        cwd: root,
        stdio: "ignore",
      });
      await execa("git", ["branch", "-M", "main"], {
        cwd: root,
        stdio: "ignore",
      });
    }
    return true;
  } catch (e) {
    Log.verbose("git error:", e);
    // no-op -- this is just a convenience and we don't care if it fails
    return false;
  }
};

function assertValidName(folderName) {
  const validation = validateName(folderName);
  if (typeof validation === "string") {
    throw new Error(
      `Cannot create an app named ${chalk.red(
        `"${folderName}"`
      )}. ${validation}`
    );
  }
}

async function assertFolderEmptyAsync(projectRoot, folderName) {
  const conflicts = fs
    .readdirSync(projectRoot)
    .filter((file) => !/\.iml$/.test(file));

  if (conflicts.length) {
    const message = "Try using a new directory name, or moving these files.";
    Log.newLine();
    Log.error(message);
    Log.newLine();
    process.exit(1);
  }
}

function padEnd(str, width) {
  const len = Math.max(0, width - str.length);
  return str + Array(len + 1).join(" ");
}

const resolveProjectRootAsync = async () => {
  let projectName = "";
  try {
    const { answer } = await prompt({
      type: "text",
      name: "answer",
      message: "What would you like to name your project?",
      initial: "my-app",
      validate: (name) => {
        const validation = validateName(path.basename(path.resolve(name)));
        if (typeof validation === "string") {
          return "Invalid project name: " + validation;
        }
        return true;
      },
    });

    if (typeof answer === "string") {
      projectName = answer.trim();
    }
  } catch (error) {
    // Handle the aborted message in a custom way.
    console.log(error);
  }

  const projectRoot = path.resolve(projectName);
  const folderName = path.basename(projectRoot);

  assertValidName(folderName);

  await fs.ensureDir(projectRoot);

  await assertFolderEmptyAsync(projectRoot, folderName);

  return [projectRoot, folderName];
};

const init = async () => {
  const [projectRoot, folderName] = await resolveProjectRootAsync();
  await isGitExecutableAvailable();
  const descriptionColumn = Math.max(
    ...FEATURED_TEMPLATES.map((t) =>
      typeof t === "object" ? t.name.length : 0
    )
  );
  const template = await selectAsync(
    {
      message: "Choose a template:",
      optionsPerPage: 20,
      choices: FEATURED_TEMPLATES.map((template) => {
        if (typeof template === "string") {
          return prompts.separator(template);
        } else {
          return {
            value: template.name,
            title: chalk.bold(padEnd(template.name, descriptionColumn)),
            path: template.path,
          };
        }
      }),
    },
    {}
  );
  try {
    const emitter = degit(
      `https://github.com/neogcamp/mockBee/apps/${template}`
    );
    await emitter.clone(projectRoot);

    Log.info(`Cloned template into ${projectRoot}`);
  } catch (e) {
    console.log(e);
    Log.error("Error with template cloning. Aborting");
    process.exit(1);
  }
  Log.info(
    `Created project at ${chalk.blue(folderName)}. Installing dependencies...`
  );
  Log.info("> yarn");
  const promise = execa("yarn", [], {
    cwd: projectRoot,
  });
  promise.stderr?.pipe(process.stderr);
  promise.stdout?.pipe(process.stdout);
  await promise;

  await initGitRepoAsync(projectRoot, {
    silent: false,
    commit: true,
  });

  Log.info(`Welcome to ${chalk.blue("mockBee Mock Backend")}!`);
  Log.info(
    `✨ Your mock backend template has been created at ${chalk.blue(
      folderName
    )}.\n`
  );

  Log.info("Get started by running");
  Log.info(chalk.blue(`cd ${folderName}`));
  Log.info(chalk.blue("yarn start"));
  Log.info("");
  Log.info("To build the app, run");
  Log.info(chalk.blue("yarn build"));
  Log.info("");
  Log.info("Read the documentation at", chalk.underline("https://neog.camp"));
  Log.info(chalk.green("Enjoy building beautiful Frontend!"));
};

module.exports = init;
