import { DirectoryTraversal } from './DirectoryTraversal.js';
import { TypeScriptParser } from './TypeScriptParser.js';
import { JsDocAnalyzer } from './JsDocAnalyzer.js';
import { JsDocGenerator } from './JsDocGenerator.js';
import { DocumentationGenerator } from './DocumentationGenerator.js';
import { Configuration } from './Configuration.js';
import { AIService } from './AIService.js';
import { GitManager } from './GitManager.js';

async function main() {
    try {
        const configuration = new Configuration();
        configuration.load();

        const gitManager = new GitManager({
            owner: configuration.repository.owner,
            name: configuration.repository.name
        });

        let prFiles: string[] = [];
        if (typeof configuration.repository.pullNumber === 'number') {
            console.log('Pull Request Number: ', configuration.repository.pullNumber);
            const files = await gitManager.getFilesInPullRequest(configuration.repository.pullNumber);
            prFiles = files.map((file) => file.filename);
        }

        const directoryTraversal = new DirectoryTraversal(
            configuration.rootDirectory,
            configuration.excludedDirectories,
            configuration.excludedFiles,
            prFiles
        );
        const typeScriptParser = new TypeScriptParser();
        const jsDocAnalyzer = new JsDocAnalyzer(typeScriptParser);
        const aiService = new AIService();
        const jsDocGenerator = new JsDocGenerator(aiService);

        const documentationGenerator = new DocumentationGenerator(
            directoryTraversal,
            typeScriptParser,
            jsDocAnalyzer,
            jsDocGenerator,
            gitManager,
            configuration,
            aiService
        );

        // Generate documentation
        await documentationGenerator.generate(configuration.repository.pullNumber);

    } catch (error) {
        console.error('An error occurred during the documentation generation process:', error);
        process.exit(1);
    }
}

main();