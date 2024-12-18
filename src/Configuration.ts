class Configuration {
    public aiPromptTemplates: string[] = [];
    public includedFiles: string[] = [];
    public excludedFiles: string[] = [];
    public commitMessageTemplate: string = '';
    public pullRequestTemplate: string = '';

    public load(): void {
        // Load the configuration from a file or environment variables
    }

    public save(): void {
        // Save the configuration to a file
    }
}