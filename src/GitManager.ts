import { Octokit } from "@octokit/rest";
import { PrModeFileChange, Repository } from "./types/index.js";
import dotenv from 'dotenv';

dotenv.config();

export class GitManager {
    private octokit: Octokit;

    // Need to add private accessToken?: string - for None Public Repos
    //{ auth: accessToken }
    constructor(public repository: Repository) {
        if (!process.env.GITHUB_ACCESS_TOKEN) {
            throw new Error('GITHUB_ACCESS_TOKEN is not set');
        }
        this.octokit = new Octokit({
            auth: process.env.GITHUB_ACCESS_TOKEN,
        });
    }

    public commit(files: string[], message: string): void {
        // Commit the specified files with the given commit message
    }

    public async getFilesInPullRequest(pullNumber: number): Promise<PrModeFileChange[]> {
        const { data } = await this.octokit.pulls.listFiles({
            owner: this.repository.owner,
            repo: this.repository.name,
            pull_number: pullNumber,
        });

        return data.map((file: any) => ({
            filename: file.filename,
            status: file.status,
            additions: file.additions,
            deletions: file.deletions,
            changes: file.changes,
            contents_url: file.contents_url,
        }));
    }

    public async createBranch(branchName: string, baseBranch: string): Promise<void> {
        await this.octokit.git.createRef({
            owner: this.repository.owner,
            repo: this.repository.name,
            ref: `refs/heads/${branchName}`,
            sha: (await this.octokit.git.getRef({
                owner: this.repository.owner,
                repo: this.repository.name,
                ref: `heads/${baseBranch}`,
            })).data.object.sha,
        });
    }

    public async commitFile(branchName: string, filePath: string, content: string, message: string): Promise<void> {
        try {
            const { data } = await this.octokit.repos.getContent({
                owner: this.repository.owner,
                repo: this.repository.name,
                path: filePath,
                ref: branchName,
            });

            await this.octokit.repos.createOrUpdateFileContents({
                owner: this.repository.owner,
                repo: this.repository.name,
                path: filePath,
                message: message,
                content: Buffer.from(content).toString('base64'),
                sha: (data as any).sha,
                branch: branchName,
            });
        } catch (error: any) {
            if (error.status === 404) {
                // File doesn't exist in the target branch, create a new file
                await this.octokit.repos.createOrUpdateFileContents({
                    owner: this.repository.owner,
                    repo: this.repository.name,
                    path: filePath,
                    message: message,
                    content: Buffer.from(content).toString('base64'),
                    branch: branchName,
                });
            } else {
                throw error;
            }
        }
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