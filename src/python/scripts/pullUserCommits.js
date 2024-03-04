import simpleGit from "simple-git";
import fs from "fs";

const repoPath = '../sampleRepo/redux'; // Replace with your repository's path
const outputFile = './gitFinds/commit_data.json'; // Change the file extension to '.json'

const git = simpleGit(repoPath);

async function getCommitData() {
  try {
    // Get the commit log.
    const log = await git.log();

    // Initialize an object to store commit data.
    const commitData = {
      users: {},
      totalCommits: 0,
    };

    // Iterate through the commit log and collect commit details by author.
    log.all.forEach((commit) => {
      const author = commit.author_name;
      const message = commit.message;
      const timestamp = commit.date;

      if (!commitData.users[author]) {
        commitData.users[author] = {
          commits: [],
          totalCommits: 0,
        };
      }

      commitData.users[author].commits.push({
        message,
        timestamp,
      });

      commitData.users[author].totalCommits += 1; // Increment the total commits for the user.
      commitData.totalCommits += 1; // Increment the total commits.
    });

    // Write the JSON object to a JSON file.
    fs.writeFileSync(outputFile, JSON.stringify(commitData, null, 2), 'utf-8');

    console.log(`Results written to ${outputFile}`);
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

// Call the function to get commit data and write to a JSON file.
getCommitData();
