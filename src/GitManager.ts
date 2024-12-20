import { Octokit } from "@octokit/rest";
import { Repository } from "./types/index.js";


export class GitManager {
    private octokit: Octokit;

    // Need to add private accessToken?: string - for None Public Repos
    //{ auth: accessToken }
    constructor(public repository: Repository) {
        this.octokit = new Octokit();
    }

    public createBranch(): void {
        // Create a new branch for documentation updates
    }

    public commit(files: string[], message: string): void {
        // Commit the specified files with the given commit message
    }

    public async getFilesInPullRequest(pullNumber: number): Promise<string[]> {
        const { data } = await this.octokit.pulls.listFiles({
            owner: this.repository.owner,
            repo: this.repository.name,
            pull_number: pullNumber,
        });
        console.log('GITHUB data', data);

        return data.map((file: any) => file.filename);
    }

    public createPullRequest(
        title: string,
        description: string,
        labels: string[],
        reviewers: string[]
    ): void {
        // Create a pull request with the specified details
    }
}