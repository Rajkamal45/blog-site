const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configure AWS
AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Sample data
const samplePosts = [
  {
    postId: uuidv4(),
    title: "Getting Started with Next.js and AWS",
    content: `# Getting Started with Next.js and AWS

Next.js is a powerful React framework that makes building modern web applications simple and efficient. When combined with AWS services, you can create scalable, serverless applications that handle millions of users.

## Why Next.js?

Next.js provides several key advantages:

- **Server-Side Rendering (SSR)**: Improves SEO and initial page load times
- **Static Site Generation (SSG)**: Pre-renders pages at build time for optimal performance
- **API Routes**: Built-in API functionality without needing a separate backend
- **Image Optimization**: Automatic image optimization and lazy loading

## AWS Integration

AWS services complement Next.js perfectly:

- **Amplify**: Simplifies deployment and backend setup
- **Lambda**: Serverless functions for API endpoints
- **DynamoDB**: Scalable NoSQL database
- **S3**: Static asset storage
- **CloudFront**: Global content delivery

## Getting Started

1. Create a new Next.js project
2. Set up AWS Amplify
3. Configure authentication with Cognito
4. Add a DynamoDB database
5. Deploy to production

This combination provides a robust, scalable foundation for modern web applications.`,
    excerpt: "Learn how to build scalable web applications using Next.js and AWS services.",
    authorId: "admin",
    authorName: "Admin User",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "PUBLISHED",
    tags: ["Next.js", "AWS", "Tutorial", "Web Development"],
    featuredImage: "",
    slug: "getting-started-nextjs-aws",
    metaDescription: "Learn how to build scalable web applications using Next.js and AWS services.",
    readingTime: 5,
    viewCount: 0
  },
  {
    postId: uuidv4(),
    title: "Building Serverless APIs with AWS Lambda",
    content: `# Building Serverless APIs with AWS Lambda

AWS Lambda is a serverless computing service that lets you run code without provisioning or managing servers. It's perfect for building APIs that scale automatically.

## Benefits of Serverless APIs

- **No Server Management**: AWS handles all infrastructure
- **Automatic Scaling**: Scales from zero to thousands of requests
- **Pay-per-Use**: Only pay for actual compute time
- **High Availability**: Built-in fault tolerance

## Best Practices

1. Keep functions small and focused
2. Use environment variables for configuration
3. Implement proper error handling
4. Monitor with CloudWatch
5. Use layers for shared code

## Example Lambda Function

\`\`\`javascript
exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    
    // Process the request
    const result = await processData(data);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
\`\`\`

This approach provides excellent performance and cost efficiency for modern applications.`,
    excerpt: "Discover how to create scalable, cost-effective APIs using AWS Lambda functions.",
    authorId: "admin",
    authorName: "Admin User",
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "PUBLISHED", 
    tags: ["AWS Lambda", "Serverless", "API", "Backend"],
    featuredImage: "",
    slug: "building-serverless-apis-aws-lambda",
    metaDescription: "Discover how to create scalable, cost-effective APIs using AWS Lambda functions.",
    readingTime: 4,
    viewCount: 15
  },
  {
    postId: uuidv4(),
    title: "DynamoDB Best Practices for Web Applications",
    content: `# DynamoDB Best Practices for Web Applications

Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.

## Key Concepts

- **Tables**: Collections of items
- **Items**: Individual records in a table
- **Attributes**: Fields within items
- **Primary Keys**: Unique identifiers for items

## Design Patterns

### Single Table Design
Use one table for multiple entity types to minimize costs and improve performance.

### Global Secondary Indexes (GSI)
Create alternative access patterns for your data.

### Partition Key Design
Choose partition keys that distribute data evenly across partitions.

## Performance Optimization

1. **Use Batch Operations**: Reduce API calls with batch reads/writes
2. **Implement Caching**: Use ElastiCache or application-level caching
3. **Monitor Metrics**: Track consumed capacity and throttling
4. **Design for Access Patterns**: Structure data based on how you'll query it

## Example Schema

\`\`\`json
{
  "TableName": "BlogPosts",
  "KeySchema": [
    {
      "AttributeName": "postId",
      "KeyType": "HASH"
    }
  ],
  "AttributeDefinitions": [
    {
      "AttributeName": "postId",
      "AttributeType": "S"
    }
  ],
  "BillingMode": "PAY_PER_REQUEST"
}
\`\`\`

Following these practices ensures optimal performance and cost efficiency.`,
    excerpt: "Master DynamoDB design patterns and optimization techniques for better performance.",
    authorId: "admin",
    authorName: "Admin User",
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    status: "PUBLISHED",
    tags: ["DynamoDB", "Database", "AWS", "Performance"],
    featuredImage: "",
    slug: "dynamodb-best-practices-web-applications",
    metaDescription: "Master DynamoDB design patterns and optimization techniques for better performance.",
    readingTime: 6,
    viewCount: 23
  }
];

const sampleSubscribers = [
  {
    email: "demo@example.com",
    subscribedAt: new Date().toISOString(),
    status: "ACTIVE",
    confirmationToken: uuidv4(),
    unsubscribeToken: uuidv4(),
    source: "website"
  }
];

async function initializeDatabase() {
  try {
    console.log('Initializing database with sample data...');

    // Insert sample posts
    for (const post of samplePosts) {
      const params = {
        TableName: 'BlogPosts-dev', // Adjust table name for your environment
        Item: post
      };

      await dynamodb.put(params).promise();
      console.log(`Created post: ${post.title}`);
    }

    // Insert sample subscribers
    for (const subscriber of sampleSubscribers) {
      const params = {
        TableName: 'NewsletterSubscribers-dev', // Adjust table name for your environment
        Item: subscriber
      };

      await dynamodb.put(params).promise();
      console.log(`Created subscriber: ${subscriber.email}`);
    }

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run the initialization
initializeDatabase();

module.exports = { initializeDatabase };