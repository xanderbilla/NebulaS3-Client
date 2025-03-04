import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function LoginInfo() {
  return (
    <Alert className="mt-8" variant="info">
      <Terminal className="h-4 w-4" />
      <AlertTitle>AWS S3 Access Configuration Guide</AlertTitle>
      <AlertDescription>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="config-steps">
            <AccordionTrigger className="text-yellow-200 dark:text-yellow-300">
              Configuration Steps
            </AccordionTrigger>
            <AccordionContent>
              <p>Follow these detailed steps to configure AWS S3 access:</p>
              <ol className="list-decimal ml-4 space-y-2">
                <li>
                  Create an IAM User in AWS Console:
                  <ul className="list-disc ml-4 mt-1">
                    <li>Navigate to IAM → Users → Create user</li>
                    <li>Set username and enable programmatic access</li>
                    <li>
                      Save the Access Key ID and Secret Access Key securely
                    </li>
                  </ul>
                </li>
                <li>
                  Create the &quot;test-role&quot; role:
                  <ul className="list-disc ml-4 mt-1">
                    <li>Go to IAM → Roles → Create role</li>
                    <li>
                      Select &quot;AWS service&quot; as the trusted entity
                    </li>
                    <li>
                      Attach S3 permissions policy with required actions:
                      <ul className="list-circle ml-4">
                        <li>s3:GetObject</li>
                        <li>s3:PutObject</li>
                        <li>s3:ListBucket</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  Configure STS Assume Role:
                  <ul className="list-disc ml-4 mt-1">
                    <li>Create a policy allowing sts:AssumeRole action</li>
                    <li>Attach this policy to your IAM user</li>
                    <li>Update trust relationship on &quot;test-role&quot;</li>
                  </ul>
                </li>
                <li>
                  Set up AWS credentials locally:
                  <ul className="list-disc ml-4 mt-1">
                    <li>Configure AWS CLI with user credentials</li>
                    <li>
                      Verify configuration using &apos;aws configure list&apos;
                    </li>
                  </ul>
                </li>
              </ol>
              <p className="text-sm mt-2 text-muted-foreground">
                Important: Always follow AWS security best practices and the
                principle of least privilege when assigning permissions.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </AlertDescription>
    </Alert>
  );
}
