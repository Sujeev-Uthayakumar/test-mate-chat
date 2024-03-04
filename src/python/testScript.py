import subprocess

def get_recent_commits(num_commits=5):
    repo_path = '../../open-liberty'
    try:
        # Run git log command to get recent commits
        result = subprocess.run(['git', 'log', '--pretty=format:%h - %an, %ar : %s', '-n', str(num_commits)], 
                                cwd=repo_path, 
                                stdout=subprocess.PIPE, 
                                stderr=subprocess.PIPE,
                                text=True)
        if result.returncode == 0:
            # Split the output by newlines to get individual commits
            commits = result.stdout.strip().split('\n')
            return commits
        else:
            print("Error:", result.stderr)
    except Exception as e:
        print("Exception occurred:", e)
    return []

# Provide the path to your Git repository


# Get recent commits
recent_commits = get_recent_commits()

# Print recent commits
if recent_commits:
    print("Recent Commits:")
    for commit in recent_commits:
        print(commit)
else:
    print("No recent commits found or error occurred.")
