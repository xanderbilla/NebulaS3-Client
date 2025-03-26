import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CONFIG_STEPS = [
  {
    title: "Create an IAM User in AWS Console",
    steps: [
      "Navigate to IAM → Users → Create user",
      "Set username and enable programmatic access",
      "Save the Access Key ID and Secret Access Key securely",
    ],
  },
  {
    title: 'Create the "test-role" role',
    steps: [
      "Go to IAM → Roles → Create role",
      'Select "AWS service" as the trusted entity',
      "Attach S3 permissions policy with required actions:",
      ["s3:GetObject", "s3:PutObject", "s3:ListBucket"],
    ],
  },
  {
    title: "Configure STS Assume Role",
    steps: [
      "Create a policy allowing sts:AssumeRole action",
      "Attach this policy to your IAM user",
      'Update trust relationship on "test-role"',
    ],
  },
  {
    title: "Set up AWS credentials locally",
    steps: [
      "Configure AWS CLI with user credentials",
      "Verify configuration using 'aws configure list'",
    ],
  },
];

export function LoginInfo() {
  return (
    <Alert className="mt-8" variant="info">
      <Terminal className="h-4 w-4" />
      <AlertTitle>AWS S3 Access Configuration Guide</AlertTitle>
      <AlertDescription>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="config-steps">
            <AccordionTrigger className="text-gray-600 dark:text-yellow-300">
              Configuration Steps
            </AccordionTrigger>
            <AccordionContent>
              <p>Follow these detailed steps to configure AWS S3 access:</p>
              <ol className="list-decimal pl-4 mt-2 space-y-4">
                {CONFIG_STEPS.map((step, index) => (
                  <li key={index}>
                    {step.title}:
                    <ul className="list-disc ml-4 mt-1">
                      {step.steps.map((subStep, subIndex) =>
                        Array.isArray(subStep) ? (
                          <li key={subIndex}>
                            {subStep.map((action, actionIndex) => (
                              <span key={actionIndex} className="block ml-4">
                                • {action}
                              </span>
                            ))}
                          </li>
                        ) : (
                          <li key={subIndex}>{subStep}</li>
                        )
                      )}
                    </ul>
                  </li>
                ))}
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
