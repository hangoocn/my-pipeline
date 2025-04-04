import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubTrigger } from 'aws-cdk-lib/aws-codepipeline-actions';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('hangoocn/my-pipeline', 'main', {
          authentication: cdk.SecretValue.secretsManager('github-token'),
          trigger: GitHubTrigger.WEBHOOK,
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
  }
}