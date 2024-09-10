# Amplify AI Starter

Please refer to the [Request For Comments (RFC)](https://github.com/aws-amplify/amplify-ui/issues/5773) for more information and feedback.

This project uses Amplify Gen2 and the new AI functionality along with Vite + React for the frontend.

## Setup

First, make sure your AWS account has access to the model you wish to use. You can do that by going in to the [Bedrock console and requesting access](https://console.aws.amazon.com/bedrock/home#/modelaccess).

Also, make sure your account is set up for Amplify: https://docs.amplify.aws/react/start/account-setup/

## Installation

To get started, install the dependencies:

```bash
npm i
```

## Running the app

Start up the Amplify cloud sandbox:

```bash
npx ampx sandbox
```

This will create a cloud sandbox in your AWS account to provision resources while you are developing. The first run will take a bit of time to get everything set up, but after that making changes only takes a few seconds.

The sandbox command will watch for file changes in the amplify/ directory so when you make changes to your backend configuration they will deploy automatically to your cloud sandbox.

There should be an **amplify_outputs.json** file in the root of your project now. This has the information your frontend code needs to talk to your backend. **Don't check in this file!**

In a separate terminal window, run the Vite dev server:

```
npm run dev
```

You should see a log in/sign up screen. Create an account that you can use to log into your application.

Note: because this is running in a cloud sandbox, the accounts created here are specific to the sandbox.

## Deploying the app

1. Go to the Amplify console and create a new app.
2. Select Github (or your preferred git provider) and click next.
3. Select your git repository and click next
4. All the settings should be filled out for you already, then click next.
5. Finally, review the app information and click 'save and deploy'.
6. Once the deploy is finished you should have a URL you can go to view your app. _Note: the AWS resources used for app are different than the sandbox resources. If you create a user in one, it won't show up in the other._

## Cleaning up resources

If you just use the sandbox, when you quit the sandbox process the CLI will ask if you want to destroy the cloud resources. Type `y` to clean up the cloud resources.

If you deployed the app to Amplify, you can delete the app in the Amplify console.
