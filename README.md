# two-man
Prototype of the two-man project
# AWS S3 Deployment Guide - Two-Man Prototype

## Prerequisites
- AWS Account (Free Tier eligible)
- Your completed website files

## Step 1: Create S3 Bucket

1. Log in to [AWS Console](https://console.aws.amazon.com/)
2. Navigate to **S3** service
3. Click **Create bucket**
4. Configure:
   - **Bucket name**: `two-man-prototype` (must be globally unique)
   - **Region**: Choose closest to your location (e.g., `eu-west-1` for Ireland)
   - **Uncheck** "Block all public access"
   - Acknowledge the warning
5. Click **Create bucket**

## Step 2: Upload Website Files

1. Open your newly created bucket
2. Click **Upload**
3. Add all files:
   - `index.html`
   - `styles.css`
   - `scripts.js`
   - `assets/` folder with all images
4. Click **Upload**

## Step 3: Enable Static Website Hosting

1. Go to bucket **Properties** tab
2. Scroll to **Static website hosting**
3. Click **Edit**
4. Select **Enable**
5. Configure:
   - **Index document**: `index.html`
   - **Error document**: `index.html` (optional)
6. Click **Save changes**
7. **Note the endpoint URL** (e.g., `http://two-man-prototype.s3-website-eu-west-1.amazonaws.com`)

## Step 4: Set Bucket Policy (Make Public)

1. Go to bucket **Permissions** tab
2. Scroll to **Bucket policy**
3. Click **Edit**
4. Paste this policy (replace `YOUR-BUCKET-NAME`):
{
"Version": "2012-10-17",
"Statement": [
{
"Sid": "PublicReadGetObject",
"Effect": "Allow",
"Principal": "",
"Action": "s3:GetObject",
"Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/"
}
]
}


5. Click **Save changes**

## Step 5: Test Your Website

1. Copy the **S3 website endpoint URL** from Step 3
2. Paste it in your browser
3. Your Two-Man prototype should now be live!

## Step 6: (Optional) Custom Domain with CloudFront

For better performance and custom domain:

1. Navigate to **CloudFront** service
2. Click **Create Distribution**
3. Configure:
   - **Origin domain**: Select your S3 bucket
   - **Viewer protocol policy**: Redirect HTTP to HTTPS
4. Click **Create distribution**
5. Wait 5-10 minutes for deployment
6. Use the CloudFront URL for faster global access

## Free Tier Limits

- **S3 Storage**: 5 GB free for 12 months
- **S3 Requests**: 20,000 GET requests/month free
- **CloudFront**: 1 TB data transfer out free for 12 months

## Updating Your Website

To update content:
1. Go to S3 bucket
2. Select file to update
3. Click **Upload** and replace
4. If using CloudFront, create invalidation:
   - CloudFront > Distributions > Select yours > Invalidations
   - Add path: `/*`

## Cost Monitoring

- Set up billing alerts in AWS Console
- Monitor usage in **Billing Dashboard**
- Free tier should cover prototype hosting

## Important Notes

- Keep your AWS credentials secure
- Never commit AWS keys to GitHub
- Delete bucket when project complete to avoid charges
- S3 URL is temporary - use CloudFront for production

## Troubleshooting

**403 Forbidden Error:**
- Check bucket policy is applied correctly
- Verify "Block public access" is OFF

**404 Not Found:**
- Ensure `index.html` is in root of bucket
- Check static website hosting is enabled

**Images not loading:**
- Verify `assets/` folder uploaded correctly
- Check file paths in HTML match S3 structure

