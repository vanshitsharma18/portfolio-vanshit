// ═══════════════════════════════════════════════════════
//  Projects Data — linked to roadmap levels
//  Add GitHub / demo URLs when ready
// ═══════════════════════════════════════════════════════

export const PROJECTS = [
  {
    id: 'p1',
    title: 'Cloud Incident Management Platform',
    subtitle: 'GCP · Cloud Run · Firestore · Terraform',
    description:
      'Enterprise-grade incident management system with React frontend, backend API, Firestore database, and Cloud Run deployment. Built with Terraform and Terragrunt for multi-environment infrastructure across dev, staging, and production.',
    tech: ['React', 'Cloud Run', 'Firestore', 'Terraform', 'Terragrunt', 'WIF', 'IAP', 'Docker'],
    level: 3,
    github: 'https://github.com/vanshitsharma18/infra-repo',
    demo: null,
    icon: '🚨',
    accent: '#7B8EFF',
  },
  {
    id: 'p2',
    title: 'Terraform & Terragrunt Infrastructure',
    subtitle: 'IaC · Multi-environment · GCP',
    description:
      'Reusable Terraform modules for VPC, IAM, Artifact Registry, and Cloud Run. Terragrunt manages DRY multi-environment configuration (dev / staging / prod) with remote state in Cloud Storage and Workload Identity Federation for keyless auth.',
    tech: ['Terraform', 'Terragrunt', 'GCP', 'Cloud Storage', 'IAM', 'WIF', 'Artifact Registry'],
    level: 2,
    github: 'https://github.com/vanshitsharma18/infra-repo',
    demo: null,
    icon: '🏗️',
    accent: '#4ADE80',
  },
  {
    id: 'p3',
    title: 'Automated Cloud Deployment Pipeline',
    subtitle: 'GitHub Actions · WIF · Cloud Run · Trivy',
    description:
      'End-to-end GitHub Actions CI/CD pipeline with keyless GCP authentication via Workload Identity Federation. Builds Docker images, scans with Trivy, publishes to Artifact Registry, and deploys to Cloud Run with automated deployment verification.',
    tech: ['GitHub Actions', 'Docker', 'Trivy', 'Artifact Registry', 'Cloud Run', 'WIF', 'OIDC'],
    level: 2,
    github: 'https://github.com/vanshitsharma18/todo-app-deployment',
    demo: null,
    icon: '⚡',
    accent: '#C8FF00',
  },
  {
    id: 'p4',
    title: 'AWS Serverless Notification Platform',
    subtitle: 'Lambda · SNS · DynamoDB · API Gateway',
    description:
      'Event-driven notification platform on AWS supporting 10K+ concurrent requests at 70% lower cost. Uses Lambda + SNS fan-out, DynamoDB for persistence, API Gateway for REST endpoints, and S3 for the frontend. Presented at Com-IT CON 2025.',
    tech: ['AWS Lambda', 'SNS', 'DynamoDB', 'API Gateway', 'S3', 'IAM', 'CloudWatch'],
    level: 3,
    github: 'https://github.com/vanshitsharma18/serverless-notification-system',
    demo: null,
    icon: '🔔',
    accent: '#FF6B35',
  },
]
